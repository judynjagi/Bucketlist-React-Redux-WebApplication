import os
import unittest
import coverage
import datetime

from flask_sqlalchemy import SQLAlchemy
from flask_script import Manager, prompt_bool
from flask_migrate import Migrate, MigrateCommand

from bucketlist import app
from bucketlist.resources.models import db

COV = coverage.coverage(
        branch=True,
        include='bucketlist/*',
        omit=['*/__init__.py',
              '*/config/*',
              'bucketlist/resources/models.py'
              ]
    )
COV.start()

manager = Manager(app)
migrate = Migrate(app, db)
manager.add_command('db', MigrateCommand)


@manager.command
def createdb(default_data=True, sample_data=False):
    db.create_all()
    print("Initialized the database")


@manager.command
def dropdb():
    if prompt_bool("Are you sure you want to loose all your data?"):
        db.drop_all()
        print("Dropped the database")


@manager.command
def test():
    """Runs the unit tests without coverage."""
    tests = unittest.TestLoader().discover('tests')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    else:
        return 1


@manager.command
def cov():
    """Runs the unit tests with coverage."""
    tests = unittest.TestLoader().discover('tests')
    unittest.TextTestRunner(verbosity=1).run(tests)
    COV.stop()
    COV.save()
    print('Coverage Summary:')
    COV.report()
    basedir = os.path.abspath(os.path.dirname(__file__))
    covdir = os.path.join(basedir, 'tmp/coverage')
    COV.html_report(directory=covdir)
    print('HTML version: file://%s/index.html' % covdir)
    COV.erase()


if __name__ == "__main__":
    manager.run()
