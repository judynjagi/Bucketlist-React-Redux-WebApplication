from flask_restful import fields

bucketlist_item_serializer = {
    "item_id": fields.Integer,
    "item_title": fields.String,
    "item_description": fields.String,
    "done": fields.Boolean,
    "date_created": fields.DateTime,
    "date_modified": fields.DateTime,
    "created_by": fields.Integer,
    "bucketlist_id": fields.Integer
}

bucketlist_serializer = {
    "list_id": fields.Integer,
    "list_title": fields.String,
    "list_description": fields.String,
    "items": fields.Nested(bucketlist_item_serializer),
    "created_by": fields.Integer,
    "date_created": fields.DateTime,
    "date_modified": fields.DateTime
}

user_serializer = {
    "id": fields.Integer,
    "username": fields.String
}
