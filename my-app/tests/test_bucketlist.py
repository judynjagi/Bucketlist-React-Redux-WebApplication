import json

import unittest
from tests.test_base import BaseTestCase


class TestBucketList(BaseTestCase):
    # Ensure that cannot create a bucketlist without authorization
    def test_cannot_create_bucketlist_without_token(self):
        self.bucketlist = {"title": 'Going to the moon',
                           "description": 'I wish to have gone to the moon by 2015'

                           }
        response = self.client.post('/bucketlists/',
                                    data=json.dumps(self.bucketlist),
                                    headers={'Content-Type': 'application/json'}
                                    )

        output = json.loads(response.data)
        self.assertTrue("Error: You are not authorized to access this resource." in output['message'])
        self.assertTrue(response.status_code, 401)

    # Use token authorization and create a bucketlist
    def test_post_bucketlist(self):
        self.bucketlist = {"title": 'Going to the sky',
                           "description": 'I wish to have gone to the moon by 2020',
                           }

        response = self.client.post('/bucketlists/',
                                    data=json.dumps(self.bucketlist),
                                    content_type='application/json',
                                    headers={'Authorization': self.token}
                                    )
        output = json.loads(response.data)

        self.assertTrue("You have successfully created a bucketlist" in output['message'])
        self.assertTrue(response.status_code, 201)

    # Prevent adding a bucketlist that's already existant
    def test_cant_add_existing_bucketlist(self):
        self.bucketlist = {"title": 'Going to the moon',
                           "description": 'I wish to have gone to the moon by 2015'
                           }

        response = self.client.post('/bucketlists/',
                                    data=json.dumps(self.bucketlist),
                                    content_type='application/json',
                                    headers={'Authorization': self.token}
                                    )
        output = json.loads(response.data)

        self.assertTrue("Bucketlist already exits" in output['message'])
        self.assertTrue(response.status_code, 400)

    # Update a bucketlist by specific id
    def test_update_bucketlist(self):
        self.bucketlist = {"title": 'Mountain climbing',
                           "description": 'Go climbing at Mr.Kilimanjaro'
                           }

        response = self.client.put('/bucketlists/1',
                                   data=json.dumps(self.bucketlist),
                                   content_type='application/json',
                                   headers={'Authorization': self.token}
                                   )
        output = json.loads(response.data)

        self.assertTrue("Bucketlist updated" in output['message'])
        self.assertTrue(response.status_code, 200)

    # Prevent accessing a single bucketlist that doesn't exist
    def test_get_nonexistent_bucketlist(self):
        response = self.client.get('/bucketlists/3',
                                   headers={'Authorization': self.token}
                                   )
        output = json.loads(response.data)
        self.assertTrue('Error! Could not find the Bucketlist with ID:3' in output['message'])
        self.assertTrue(response.status_code, 404)

    # Get a bucketlist by id
    def test_get_single_bucketlist(self):
        response = self.client.get('/bucketlists/1',
                                   headers={'Authorization': self.token}
                                   )
        output = json.loads(response.data)

        self.assertTrue('The bucket list requested is ID: 1' in output['message'])
        self.assertTrue(response.status_code, 200)

    # Test to get all the bucketlists
    def test_get_all_bucketlists(self):
        response = self.client.get('/bucketlists/',
                                   headers={'Authorization': self.token}
                                   )
        output = json.loads(response.data)["bucket_lists"]
        bucketlist1 = output[0]
        bucketlist = bucketlist1.get('list_title')

        self.assertEqual(bucketlist, 'Going to the moon')
        self.assertTrue(len(output) == 2)

    # Test delete single bucketlist
    def test_delete_single_bucketlists(self):
        response = self.client.delete('/bucketlists/2',
                                      headers={'Authorization': self.token}
                                      )
        output = json.loads(response.data)

        self.assertTrue('You have successfully deleted bucketlist with ID:2' in output['message'])
        self.assertTrue(response.status_code, 200)

    # Test delete single bucketlist when it doesn't exist
    def test_delete_nonexistent_bucketlist(self):
        response = self.client.delete('/bucketlists/4',
                                      headers={'Authorization': self.token}
                                      )
        output = json.loads(response.data)

        self.assertTrue('Bucketlist not found' in output['message'])
        self.assertTrue(response.status_code, 404)


if __name__ == '__main__':
    unittest.main()
