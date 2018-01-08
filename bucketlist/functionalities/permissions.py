from flask import g, jsonify
from flask_httpauth import HTTPTokenAuth

from bucketlist.resources.models import Users

auth = HTTPTokenAuth(scheme='Token')


@auth.error_handler
def unauthorized(message=None):
    """
    return  401 status_code
    """
    if not message:
        message = "Error: You are not authorized to access this resource."
    return jsonify({"message": message}), 401


@auth.verify_token
def verify_token(token):
    """Validates the token sent by the user """
    user = Users.verify_auth_token(token)
    if not user:
        return False
    g.user = user
    return True
