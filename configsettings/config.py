import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    """ Default configurations """

    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', None)
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(basedir, "bucketlist.db")


class DevelopmentConfig(Config):
    """ Development configurations """

    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(basedir, "bucketlist.db")


class TestingConfig(Config):
    """ Test configurations """

    DEBUG = False
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(basedir, "test.db")


class ProductionConfig(Config):
    """ Production configurations """

    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = "sqlite:///models/bucketlist.db"


config = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig
}
