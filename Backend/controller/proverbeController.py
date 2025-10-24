from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from dependecies import get_db
from models.Proverbe import Proverbe
from schemas.proverbeSchema import ProverbeBase, ProverbeCourt
from sqlalchemy import func

router = APIRouter(
    prefix="/proverbes",
    tags=["Ohabolana"]
)

@router.get("/", response_model=list[ProverbeBase])
def lire_proverbes(db: Session = Depends(get_db)):
    proverbes = db.query(Proverbe).all()
    return proverbes

@router.get("/courts", response_model=list[ProverbeCourt])
def get_proverbes_simplifies(db: Session = Depends(get_db)):
    proverbes = db.query(Proverbe).all()
    return proverbes

@router.get("/journalier", response_model=ProverbeCourt)
def get_proverbes_journalier(db: Session = Depends(get_db)):
    proverbes = db.query(Proverbe).order_by(func.random()).first()
    return proverbes