from sqlalchemy import Column, Integer, String, Text
from database.db import Base #import de la classe de Base de toutes les modèles

class Soatoavina(Base):
    __tablename__='soatoavina'

    idSoatoavina = Column(Integer, primary_key = True, autoincrement = True)
    nomSoatoavina = Column(String(100), nullable = False)
    definition = Column(Text, nullable = False)
    explication = Column(Text, nullable = False)
    origine = Column(String(100), nullable = False)