import json

import unittest
from tests.test_base import BaseTestCase


class TestAuth(BaseTestCase):
    # Register a new user
    def test_registration(self):

        self.user = {
                "username": "jane",
                "email": "jane@example.com",
                "password": "password",
                "verify_password": "password"
        }
        response = self.client.post('/auth/register', data=json.dumps(self.user), headers={'Content-Type': 'application/json'})
        output = json.loads(response.data)

        self.assertEqual(response.status_code, 201)
        self.assertTrue("User successfully created" in output["message"])

    # Register an existing user
    def test_registration_user_exists(self):
        self.user = {
                "username": "judy",
                "email": "judy@example.com",
                "password": "password",
                "verify_password": "password"
        }
        response = self.client.post('/auth/register', data=json.dumps(self.user), headers={'Content-Type': 'application/json'})
        output = json.loads(response.data)

        self.assertEqual(response.status_code, 400)
        self.assertTrue("Cannot create a new user. Please enter a valid email address" in output["message"])

    # Check that passwords match before they are saved in the database
    def test_registration_passwords_dont_match(self):
        self.user = {
                "username": "judy",
                "email": "judy@example.com",
                "password": "password",
                "verify_password": "passwordmismatch"
        }
        response = self.client.post('/auth/register', data=json.dumps(self.user), headers={'Content-Type': 'application/json'})
        output = json.loads(response.data)

        self.assertEqual(response.status_code, 400)
        self.assertTrue("Sorry! Passwords do not match" in output["message"])

    # Login a user
    def test_login(self):
        self.user = {
                "username": "judy",
                "password": "password"
        }

        response = self.client.post('/auth/login', data=json.dumps(self.user), headers={'Content-Type': 'application/json'})
        output = json.loads(response.data)
        # import pdb; pdb.set_trace()

        self.assertTrue("Successfully logged in. This is your  token" in output["message"])
        self.assertIn("token", output)
        self.assertEqual(response.status_code, 200)

    # Check that a user provides a password and a username
    def test_login_without_password(self):
        self.user = {
                "username": "judy",
                "password": ""
        }
        response = self.client.post('/auth/login', data=json.dumps(self.user), headers={'Content-Type': 'application/json'})
        output = json.loads(response.data)

        self.assertTrue("A username and password must be provided" in output["message"])
        self.assertEqual(response.status_code, 200)

    # Check that the username and password match
    def test_login_with_wrong_password(self):
        self.user = {
                "username": "judy",
                "password": "wrongpassword"
        }
        response = self.client.post('/auth/login', data=json.dumps(self.user), headers={'Content-Type': 'application/json'})
        output = json.loads(response.data)

        self.assertTrue("Incorrect username or password" in output["message"])
        self.assertEqual(response.status_code, 401)


if __name__ == '__main__':
    unittest.main()
