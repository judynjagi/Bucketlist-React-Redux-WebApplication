from datetime import datetime

from werkzeug.security import generate_password_hash, \
     check_password_hash
from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer, BadSignature, SignatureExpired)
from sqlalchemy.orm import validates

from bucketlist import app, db


class Users(db.Model):
    """
    Users Model
    """
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(250), nullable=False)
    password_hash = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(250), nullable=False, unique=True)

    def hash_password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def generate_auth_token(self, expiration=36000):
        """Expires in 36 minutes"""
        S = Serializer('SECRET_KEY', expires_in=expiration)
        return S.dumps({'user_id': self.user_id})

    @staticmethod
    def verify_auth_token(token):
        s = Serializer('SECRET_KEY')
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None
        except BadSignature:
            return None
        user = Users.query.get(data['user_id'])
        return user

    def __repr__(self):
        return "<Users: %r>" % self.username


class BucketList(db.Model):

    """Bucketlist model"""
    __tablename__ = 'bucketlist'

    list_id = db.Column(db.Integer, primary_key=True)
    list_title = db.Column(db.String(255))
    list_description = db.Column(db.Text)
    date_created = db.Column(db.DateTime, default=datetime.now)
    date_modified = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    # This Value is constrained to be  the one of the remote column which is user.id (PK)
    created_by = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    items = db.relationship("BucketlistItem", backref=db.backref("bucketlist"))
    users = db.relationship("Users", backref=db.backref("users", lazy="dynamic"))

    def __repr__(self):
        return "<BucketList: %r>" % self.list_title


class BucketlistItem(db.Model):
    """
    BucketlistItem model
    """
    __tablename__ = 'items'

    item_id = db.Column(db.Integer, primary_key=True)
    item_title = db.Column(db.String(255))
    item_description = db.Column(db.Text)
    done = db.Column(db.Boolean(), default=False)
    date_created = db.Column(db.DateTime, default=datetime.now)
    date_modified = db.Column(db.DateTime,  default=datetime.now, onupdate=datetime.now)
    created_by = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    user = db.relationship("Users", backref=db.backref("items", lazy="dynamic"))
    bucketlist_id = db.Column(db.Integer, db.ForeignKey("bucketlist.list_id"))

    def __repr__(self):
        return "<BucketListItem: %r>" % self.item_title
