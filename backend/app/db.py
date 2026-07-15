from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import declarative_base, sessionmaker

from app.config import DATABASE_URL

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

Base = declarative_base()


def ensure_interaction_columns():
    """Add newer interaction fields without deleting existing CRM records."""
    inspector = inspect(engine)
    if "interactions" not in inspector.get_table_names():
        return

    existing = {column["name"] for column in inspector.get_columns("interactions")}
    required = {
        "date": "DATE",
        "time": "TIME",
        "attendees": "TEXT",
        "materials_shared": "TEXT",
        "samples_distributed": "TEXT",
    }

    with engine.begin() as connection:
        for name, sql_type in required.items():
            if name not in existing:
                connection.execute(
                    text(f"ALTER TABLE interactions ADD COLUMN {name} {sql_type}")
                )


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
