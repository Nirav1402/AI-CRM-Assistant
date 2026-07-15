from sqlalchemy.orm import Session

from app.models import Interaction


def create_interaction(db: Session, data):

    interaction = Interaction(**data)

    db.add(interaction)

    db.commit()

    db.refresh(interaction)

    return interaction


def get_interactions(db: Session):

    return db.query(Interaction).order_by(
        Interaction.created_at.desc()
    ).all()