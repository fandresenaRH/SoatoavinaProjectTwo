from sqlalchemy import Column, Integer, String, Text, ForeignKey
from database.db import Base #import de la classe de Base de toutes les modèles
from sqlalchemy.orm import relationship

class Conte(Base):
    __tablename__='contes'

    idConte = Column(Integer, primary_key = True, autoincrement = True)
    titre = Column(String(100), nullable = False)
    texte = Column(Text, nullable = False)
    illustration = Column(String(125), nullable = False)
    auteur = Column(String(100), nullable = False)
    idCategorie = Column(Integer, ForeignKey('categories.idCategorie'), nullable=False)

    # Relation vers la catégorie
    categorie = relationship("Categorie", back_populates="contes")

class Categorie(Base):
    __tablename__ = 'categories'

    idCategorie = Column(Integer, primary_key=True, autoincrement=True)
    nom = Column(String(100), nullable=False)

    contes = relationship("Conte", back_populates="categorie")