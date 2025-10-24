from pydantic import BaseModel

class SoatoavinaTitre(BaseModel):
    nom: str

class SoatoavinaBase(BaseModel):
    nom: str
    definition: str
    explication: str
    origine: str