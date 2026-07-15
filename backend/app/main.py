from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field

from app.langgraph.graph import graph
from app.db import Base, engine, get_db, ensure_interaction_columns
from app.models import Interaction
from app.schemas import InteractionCreate
from app.crud import create_interaction

# Create database tables
Base.metadata.create_all(bind=engine)
ensure_interaction_columns()

app = FastAPI(title="AI CRM Backend")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    current_interaction: dict = Field(default_factory=dict)
    history: list[dict] = Field(default_factory=list)


@app.get("/")
async def home():
    return {
        "message": "AI CRM Backend Running 🚀"
    }


@app.post("/chat")
async def chat(request: ChatRequest):

    result = graph.invoke({
        "message": request.message,
        "current_interaction": request.current_interaction,
        "history": request.history,
    })

    crm = result["result"]

    return {
        "tool": crm.get("tool", "conversation"),
        "structured_data": crm,
        "ai_summary": crm.get("summary", "")
    }

@app.post("/api/interactions", status_code=201)
async def save_interaction(
    interaction: InteractionCreate,
    db: Session = Depends(get_db),
):
    return create_interaction(db, interaction.model_dump())


@app.get("/api/interactions")
async def get_interactions(
    db: Session = Depends(get_db),
):

    interactions = (
        db.query(Interaction)
        .order_by(Interaction.created_at.desc())
        .all()
    )

    return interactions
