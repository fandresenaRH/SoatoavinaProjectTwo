from dependecies import get_db
from fastapi import APIRouter, Depends
from models.Conte import Conte, Categorie
from schemas.conteSchema import ConteBase, ConteResume, CategorieResponse
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import func

router = APIRouter(
    prefix="/contes",
    tags=["Angano"]
)

@router.get("/", response_model=list[ConteBase])
def lire_contes(db: Session = Depends(get_db)):
    return db.query(Conte).all()

@router.get("/titres", response_model=list[str])
def lire_titres_contes(db: Session = Depends(get_db)):
    titres = db.query(Conte.titre).all() # -> liste de tuples: [("Titre1",), ("Titre2",)]
    return [t[0] for t in titres]

@router.get("/categorie/{idCategorie}", response_model=list[ConteResume])
def lire_contes_par_categorie(idCategorie: int, db: Session = Depends(get_db)):
    contes = db.query(Conte).filter(Conte.idCategorie == idCategorie).all()
    # transformer en liste de dicts avec extrait du texte
    contes_resume = [
        {
            "titre": c.titre,
            "illustration": c.illustration,
            "extrait": c.texte[:100] + "..." if len(c.texte) > 100 else c.texte,
            "texte": c.texte
        }
        for c in contes
    ]
    return contes_resume

@router.get("/categorie", response_model=list[CategorieResponse])
def lire_categories(db: Session = Depends(get_db)):
    # categories = db.query(Categorie).order_by(asc(Categorie.idCategorie)).all()
    return db.query(Categorie).all()

@router.get("/favories",response_model=list[ConteResume])
def lire_contes_fav(db: Session = Depends(get_db)):
    contes = db.query(Conte).order_by(func.random()).limit(4).all()
    # transformer en liste de dicts avec extrait du texte
    contes_resume = [
        {
            "titre": c.titre,
            "illustration": c.illustration,
            "extrait": c.texte[:50] + "..." if len(c.texte) > 50 else c.texte,
            "texte": c.texte
        }
        for c in contes
    ]
    return contes_resume