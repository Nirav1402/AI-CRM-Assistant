from datetime import date as DateType, time as TimeType
from pydantic import BaseModel


class InteractionCreate(BaseModel):
    hcp_name: str
    speciality: str
    date: DateType | None = None
    time: TimeType | None = None
    interaction_type: str
    attendees: str = ""
    topic: str
    products_discussed: str
    materials_shared: str = ""
    samples_distributed: str = ""
    summary: str
    follow_up: str
    sentiment: str
