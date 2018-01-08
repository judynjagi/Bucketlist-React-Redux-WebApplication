import unittest

from flask_testing import TestCase

from bucketlist import app


class TestDevelopmentConfig(TestCase):

    def create_app(self):
        app.config.from_object('configsettings.config.DevelopmentConfig')
        return app

    def test_app_is_development(self):
        self.assertTrue(app.config['DEBUG'] is True)
        self.assertTrue(app.config['TESTING'] is True)


class TestTestingConfig(TestCase):

    def create_app(self):
        app.config.from_object('configsettings.config.TestingConfig')
        return app

    def test_app_is_testing(self):
        self.assertTrue(app.config['DEBUG'] is False)
        self.assertTrue(app.config['TESTING'] is True)


class TestProductionConfig(TestCase):

    def create_app(self):
        app.config.from_object('configsettings.config.ProductionConfig')
        return app

    def test_app_is_production(self):
        self.assertTrue(app.config['DEBUG'] is False)
        self.assertTrue(app.config['TESTING'] is False)


if __name__ == '__main__':
    unittest.main()
