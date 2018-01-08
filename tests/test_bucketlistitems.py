import json

import unittest
from tests.test_base import BaseTestCase


class TestBucketlistItem(BaseTestCase):
    # Ensure that cannot create a bucketlist without authorization
    def test_cannot_post_bucketlistitem_without_token(self):
        self.bucketlistitem = {"item_name": 'Play guitar',
                               "description": 'Join guitar classes'

                               }
        response = self.client.post('/bucketlists/3/items/',
                                    data=json.dumps(self.bucketlistitem),
                                    headers={'Content-Type': 'application/json'}
                                    )

        output = json.loads(response.data)

        self.assertTrue("Error: You are not authorized to access this resource" in output['message'])
        self.assertTrue(response.status_code, 400)

    # Use token authorization and create a bucketlist
    def test_create_bucketlistitem(self):
        self.bucketlistitem = {"item_name": 'Play guitar',
                               "description": 'Join guitar classes'
                               }

        response = self.client.post('/bucketlists/2/items/',
                                    data=json.dumps(self.bucketlistitem),
                                    content_type='application/json',
                                    headers={'Authorization': self.token}
                                    )
        output = json.loads(response.data)

        self.assertTrue("You have successfully created a bucketlist item" in output['message'])
        self.assertTrue(response.status_code, 200)

    # Create a bucketlistitem where a bucketlist doesn't exist
    def test_create_bucketlistitem_with_nonexistent_bucketlist(self):
        self.bucketlistitem = {"item_name": 'Play guitar',
                               "description": 'Join guitar classes'
                               }

        response = self.client.post('/bucketlists/4/items/',
                                    data=json.dumps(self.bucketlistitem),
                                    content_type='application/json',
                                    headers={'Authorization': self.token}
                                    )
        output = json.loads(response.data)

        self.assertTrue("That list was not found" in output['message'])
        self.assertTrue(response.status_code, 200)

    # Update a bucketlistitem
    def test_update_bucketlistitem(self):
        self.bucketlistitem = {"item_name": 'Swim',
                               "description": 'Join swimming classes',
                               "done": 'False'
                               }

        response = self.client.put('/bucketlists/2/items/1',
                                   data=json.dumps(self.bucketlistitem),
                                   content_type='application/json',
                                   headers={'Authorization': self.token}
                                   )

        output = json.loads(response.data)

        self.assertTrue("Successfully updated a bucketlistitem" in output['message'])
        self.assertTrue(response.status_code, 200)

    # Update a bucketlistitem that doesn't exist
    def test_update_nonexistent_bucketlistitem(self):
        self.bucketlistitem = {"item_name": 'Swim',
                               "description": 'Join swimming classes',
                               "done": 'False'
                               }

        response = self.client.put('/bucketlists/1/items/1',
                                   data=json.dumps(self.bucketlistitem),
                                   content_type='application/json',
                                   headers={'Authorization': self.token}
                                   )

        output = json.loads(response.data)

        self.assertTrue("Bucketlist not found" in output['message'])
        self.assertTrue(response.status_code, 404)

    # Test delete single bucketlistitem when it doesn't exist
    def test_delete_nonexistent_bucketlistitem(self):
        response = self.client.delete('/bucketlists/1/items/4',
                                      headers={'Authorization': self.token}
                                      )

        output = json.loads(response.data)

        self.assertTrue('Bucketlist not found' in output['message'])
        self.assertTrue(response.status_code, 404)

    # Test delete single bucketlistitem
    def test_delete_bucketlistitem(self):
        response = self.client.delete('/bucketlists/1/items/2',
                                      headers={'Authorization': self.token}
                                      )

        output = json.loads(response.data)

        self.assertTrue("You have successfully deleted bucketlist with ID:2" in output['message'])
        self.assertTrue(response.status_code, 200)


if __name__ == '__main__':
    unittest.main()
