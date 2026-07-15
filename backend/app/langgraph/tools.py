from typing import Any

from langchain_core.tools import tool


@tool
def log_interaction(data: dict[str, Any]) -> dict[str, Any]:
    """Finalize CRM fields extracted from a new HCP interaction."""
    return {**data, "tool": "log_interaction"}


@tool
def edit_interaction(changes: dict[str, Any]) -> dict[str, Any]:
    """Finalize only the CRM fields explicitly corrected by the user."""
    return {**changes, "tool": "edit_interaction"}


@tool
def generate_summary(summary: str) -> dict[str, str]:
    """Return a professional summary of an HCP interaction."""
    return {"tool": "generate_summary", "summary": summary}


@tool
def recommend_followup(recommendations: str) -> dict[str, str]:
    """Return recommended next-best actions for a field representative."""
    return {"tool": "recommend_followup", "summary": recommendations}


@tool
def validate_interaction(validation: str) -> dict[str, str]:
    """Return missing or invalid information required to log an interaction."""
    return {"tool": "validate_interaction", "summary": validation}


TOOLS = [
    log_interaction,
    edit_interaction,
    generate_summary,
    recommend_followup,
    validate_interaction,
]
