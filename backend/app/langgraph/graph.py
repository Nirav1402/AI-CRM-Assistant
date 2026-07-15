from typing import TypedDict
import json
from datetime import date

from langgraph.graph import StateGraph, END

from app.llm import llm
from app.langgraph.tools import (
    log_interaction as log_interaction_tool,
    edit_interaction as edit_interaction_tool,
    generate_summary as generate_summary_tool,
    recommend_followup as recommend_followup_tool,
    validate_interaction as validate_interaction_tool,
)

from app.prompts import (
    SYSTEM_PROMPT,
    INTENT_PROMPT,
    LOG_PROMPT,
    EDIT_PROMPT,
    SUMMARY_PROMPT,
    FOLLOWUP_PROMPT,
    VALIDATION_PROMPT,
)


# ==========================================================
# STATE
# ==========================================================

class CRMState(TypedDict):
    message: str
    intent: str
    result: dict
    current_interaction: dict
    history: list[dict]


def normalize_choice_values(data: dict) -> dict:
    sentiment = data.get("sentiment")
    if isinstance(sentiment, str) and sentiment:
        data["sentiment"] = sentiment.strip().title()

    interaction_type = data.get("interaction_type")
    if isinstance(interaction_type, str) and interaction_type:
        normalized = interaction_type.strip().lower().replace("_", "-")
        type_aliases = {
            "meeting": "Meeting",
            "face-to-face": "Face-to-Face",
            "face to face": "Face-to-Face",
            "virtual": "Virtual Meeting",
            "virtual meeting": "Virtual Meeting",
            "phone": "Phone Call",
            "phone call": "Phone Call",
            "email": "Email",
        }
        data["interaction_type"] = type_aliases.get(normalized, interaction_type)

    return data


# ==========================================================
# INTENT DETECTION
# ==========================================================

def detect_intent(state: CRMState):

    message = state["message"].strip().lower()
    correction_phrases = (
        "sorry",
        "i mean",
        "change",
        "correct",
        "update",
        "actually",
        "yesterday",
        "tomorrow",
    )
    if state.get("current_interaction") and any(
        phrase in message for phrase in correction_phrases
    ):
        return {"intent": "edit_interaction"}

    recent_history = state.get("history", [])[-6:]
    transcript = "\n".join(
        f"{item.get('sender', 'user')}: {item.get('text', '')}"
        for item in recent_history
    )

    response = llm.invoke([
        ("system", INTENT_PROMPT),
        ("human", transcript or state["message"])
    ])

    intent = response.content.strip().lower()

    print("Detected Intent:", intent)

    return {
        "intent": intent
    }


# ==========================================================
# NORMAL CHAT
# ==========================================================

def conversation(state: CRMState):

    response = llm.invoke([
        (
            "system",
            """
You are PharmaCRM AI.

Behave exactly like ChatGPT.

You can:

- greet users
- answer questions
- explain CRM
- explain medicines
- answer casual conversation

Never return JSON.
"""
        ),
        ("human", state["message"])
    ])

    return {
        "result": {
            "tool": "conversation",
            "summary": response.content
        }
    }


# ==========================================================
# TOOL 1
# LOG INTERACTION
# ==========================================================

def log_interaction(state: CRMState):

    response = llm.invoke([
        ("system", LOG_PROMPT),
        (
            "human",
            f"Current date is {date.today().isoformat()}. "
            "Resolve relative dates such as today using this date.\n\n"
            + state["message"],
        )
    ])

    text = (
        response.content
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    try:
        data = json.loads(text)
    except Exception:
        data = {
            "summary": text
        }

    data = normalize_choice_values(data)
    return {
        "result": log_interaction_tool.invoke({"data": data})
    }


# ==========================================================
# TOOL 2
# EDIT INTERACTION
# ==========================================================

def edit_interaction(state: CRMState):

    response = llm.invoke([
        ("system", EDIT_PROMPT),
        (
            "human",
            "Current interaction:\n"
            + json.dumps(state.get("current_interaction", {}))
            + f"\nCurrent date: {date.today().isoformat()}"
            + "\nRecent conversation:\n"
            + "\n".join(
                f"{item.get('sender', 'user')}: {item.get('text', '')}"
                for item in state.get("history", [])[-6:]
            )
            + "\n\nRequested change:\n"
            + state["message"],
        )
    ])

    text = (
        response.content
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    try:
        data = json.loads(text)
    except Exception:
        data = {
            "summary": text
        }

    aliases = {
        "HCP_name": "hcp_name",
        "hcpName": "hcp_name",
        "hcp": "hcp_name",
        "interactionType": "interaction_type",
        "Interaction_type": "interaction_type",
        "interaction type": "interaction_type",
        "productsDiscussed": "products_discussed",
        "materialsShared": "materials_shared",
        "samplesDistributed": "samples_distributed",
        "followUp": "follow_up",
        "observed_sentiment": "sentiment",
        "hcp_sentiment": "sentiment",
        "observed/inferred_sentiment": "sentiment",
    }
    data = {aliases.get(key, key): value for key, value in data.items()}
    data = normalize_choice_values(data)
    data.setdefault("summary", "Interaction updated successfully.")

    return {
        "result": edit_interaction_tool.invoke({"changes": data})
    }


# ==========================================================
# TOOL 3
# SUMMARY
# ==========================================================

def generate_summary(state: CRMState):

    response = llm.invoke([
        ("system", SUMMARY_PROMPT),
        ("human", state["message"])
    ])

    return {
        "result": generate_summary_tool.invoke({"summary": response.content})
    }


# ==========================================================
# TOOL 4
# FOLLOW UP
# ==========================================================

def recommend_followup(state: CRMState):

    response = llm.invoke([
        ("system", FOLLOWUP_PROMPT),
        ("human", state["message"])
    ])

    return {
        "result": recommend_followup_tool.invoke(
            {"recommendations": response.content}
        )
    }


# ==========================================================
# TOOL 5
# VALIDATION
# ==========================================================

def validate_interaction(state: CRMState):

    response = llm.invoke([
        ("system", VALIDATION_PROMPT),
        ("human", state["message"])
    ])

    return {
        "result": validate_interaction_tool.invoke(
            {"validation": response.content}
        )
    }


# ==========================================================
# ROUTER
# ==========================================================

def router(state: CRMState):

    intent = state["intent"]

    if intent == "conversation":
        return "conversation"

    if intent == "log_interaction":
        return "log"

    if intent == "edit_interaction":
        return "edit"

    if intent == "generate_summary":
        return "summary"

    if intent == "recommend_followup":
        return "followup"

    if intent == "validate_interaction":
        return "validate"

    return "conversation"


# ==========================================================
# GRAPH
# ==========================================================

builder = StateGraph(CRMState)

builder.add_node("intent", detect_intent)

builder.add_node("conversation", conversation)

builder.add_node("log", log_interaction)

builder.add_node("edit", edit_interaction)

builder.add_node("summary", generate_summary)

builder.add_node("followup", recommend_followup)

builder.add_node("validate", validate_interaction)

builder.set_entry_point("intent")

builder.add_conditional_edges(
    "intent",
    router,
    {
        "conversation": "conversation",
        "log": "log",
        "edit": "edit",
        "summary": "summary",
        "followup": "followup",
        "validate": "validate",
    },
)

builder.add_edge("conversation", END)
builder.add_edge("log", END)
builder.add_edge("edit", END)
builder.add_edge("summary", END)
builder.add_edge("followup", END)
builder.add_edge("validate", END)

graph = builder.compile()
