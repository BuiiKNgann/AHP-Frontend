import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://username:password@localhost/your_db_name'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
