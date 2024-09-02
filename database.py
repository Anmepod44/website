# database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLAlchemy setup for MySQL
engine = create_engine('mysql+pymysql://root:example@localhost:3306/ZAHLENTECH_PRODUCTS')

# Creating a configured "Session" class
Session = sessionmaker(bind=engine)

# Create a base class for your models
Base = declarative_base()
