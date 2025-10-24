from pydantic import BaseModel

class ConteResume(BaseModel):
    titre: str
    illustration: str
    extrait: str
    texte: str

    class Config:
        orm_mode = True

class CategorieResponse(BaseModel):
    idCategorie : int
    nom: str

    class Config:
        orm_mode = True

class ConteBase(BaseModel):
    titre: str
    texte: str
    illustration: str
    auteur: str
    categorie: CategorieResponse

    class Config:
        orm_mode = True