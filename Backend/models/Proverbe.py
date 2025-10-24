from sqlalchemy import Column, Integer, String, Text, ForeignKey
from database.db import Base #import de la classe de Base de toutes les modèles

class Proverbe(Base):
    __tablename__='proverbes'

    idProverbe = Column(Integer, primary_key=True, index=True, autoincrement=True)
    categorie = Column(String(100), nullable = False)
    explication = Column(Text, nullable = False)
    commentaire = Column(Text, nullable = True)
    contenu = Column(Text, nullable = False)
    