from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from dependecies import get_db
from models.Soatoavina import Soatoavina
from schemas.soatoavinaSchema import SoatoavinaBase

router = APIRouter(
    prefix="/soatoavina",
    tags=["Soatoavina"]
)

@router.get("/")
def lire_soatoavina(db: Session = Depends(get_db)):
    return db.query(Soatoavina).all()

@router.get("/recherche")
def chercher_soatoavina(nom: str, db: Session = Depends(get_db)):
    soatoavina = db.query(Soatoavina).filter(Soatoavina.nomSoatoavina.ilike(f"%{nom}%")).first()
    if not soatoavina:
        raise HTTPException(status_code=404, detail="Soatoavina tsy hita")
    return soatoavina

@router.get("/titres",response_model=list[str])
def lire_soatoavina_nom(db: Session = Depends(get_db)):
    noms = db.query(Soatoavina.nomSoatoavina).all() # -> liste de tuples: [("Titre1",), ("Titre2",)]
    return [n[0] for n in noms]
