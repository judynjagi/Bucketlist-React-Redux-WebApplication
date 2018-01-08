import json
import os

from flask_testing import TestCase

from base import app
from bucketlist.resources.models import db, Users, BucketList, BucketlistItem
from configsettings.config import basedir


class BaseTestCase(TestCase):
    """A base test case for tests."""

    def create_app(self):
        app.config.from_object('configsettings.config.TestingConfig')
        return app

    # @classmethod
    def setUp(self):
        self.client = app.test_client()
        db.create_all()
        user = Users(username='judy',
                     email='judy@example.com',
                     password_hash='password')
        user.hash_password('password')

        bucketlist = BucketList(list_id='1',
                                list_title='Going to the moon',
                                list_description='I wish to have gone to the moon by 2015',
                                created_by='1')

        bucketlist2 = BucketList(list_id='2',
                                 list_title='Learn 7 programming languages',
                                 list_description='Start studying ruby on the rails',
                                 created_by='1')

        bucketlistitems = BucketlistItem(item_id='1',
                                         item_title='Rocket',
                                         item_description='Request Mark Zucherberg to invest in modeling a rocket to take me to the moon',
                                         bucketlist_id='2',
                                         created_by='1')

        bucketlistitems2 = BucketlistItem(item_id='2',
                                          item_title='Travel equipment',
                                          item_description='Find the best equipment and clothes for travel',
                                          bucketlist_id='1',
                                          created_by='1')

        db.session.add(user)
        db.session.add(bucketlist)
        db.session.add(bucketlist2)
        db.session.add(bucketlistitems)
        db.session.add(bucketlistitems2)
        db.session.commit()

        self.user = {
                "username": "judy",
                "password": "password"
        }

        response = self.client.post('/auth/login',
                                    data=json.dumps(self.user),
                                    headers={'Content-Type': 'application/json'}
                                    )
        self.token = json.loads(response.get_data())['token']

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        os.remove(os.path.join(basedir, 'test.db'))
