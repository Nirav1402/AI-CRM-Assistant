from sqlalchemy import Column, Integer, String, Text, Date, Time, DateTime
from datetime import datetime

from app.db import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    hcp_name = Column(String(255))
    speciality = Column(String(255))
    date = Column(Date)
    time = Column(Time)
    interaction_type = Column(String(100))
    attendees = Column(Text)

    topic = Column(Text)

    products_discussed = Column(Text)
    materials_shared = Column(Text)
    samples_distributed = Column(Text)

    summary = Column(Text)

    follow_up = Column(Text)

    sentiment = Column(String(100))

    created_at = Column(DateTime, default=datetime.utcnow)
