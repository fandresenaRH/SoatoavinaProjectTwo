from pydantic import BaseModel

class ProverbeCourt(BaseModel):
    idProverbe:int
    contenu: str
    explication : str
    class Config:
        orm_mode = True


class ProverbeBase(BaseModel):
    idProverbe:int
    categorie : str
    explication : str
    commentaire : str
    contenu : str

    class Config:
        orm_mode = True