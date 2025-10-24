from database.db import SessionLocal
from sqlalchemy.orm import Session

async def get_db():
    db = SessionLocal() # Ouvre une session de base de données
    try:
        yield db    # Donne cette session aux routes FastAPI
    finally:
        db.close() # Ferme proprement la session (même en cas d’erreur)