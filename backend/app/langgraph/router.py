from app.config import MODEL_NAME, OPENAI_API_KEY
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    api_key=OPENAI_API_KEY,
    model=MODEL_NAME,
    temperature=0,
)


SYSTEM_PROMPT = """
You are an AI CRM Assistant.

Determine the user's intent.

Return ONLY ONE of these values.

log_interaction
edit_interaction
generate_summary
recommend_followup
validate_interaction

Rules:

If the user is describing a meeting,
return log_interaction.

If the user is correcting previous information,
return edit_interaction.

If the user asks for a summary,
return generate_summary.

If the user asks what to do next,
return recommend_followup.

If information is incomplete,
return validate_interaction.

Return ONLY the intent.
"""


def detect_intent(message: str):

    response = llm.invoke(
        [
            ("system", SYSTEM_PROMPT),
            ("human", message),
        ]
    )

    return response.content.strip()