#connexion à postgersql avec sqlAlchemy

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from core.config import settings

#informations de la base de données (efa alaina ao am /core/config)

DATABASE_URL = settings.DATABASE_URL
engine = create_engine(DATABASE_URL) #Ouvre un canal de communication entre SQLAlchemy et PostgreSQL
if(engine):
    print("Connexion à la base de données réussie")

# Création du session maker
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) #Un outil qui permet de lire et écrire dans la base

# Base pour les modèles / La classe mère de tous tes modèles
Base = declarative_base()
