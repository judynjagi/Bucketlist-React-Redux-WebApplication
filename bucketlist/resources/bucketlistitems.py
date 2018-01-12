from flask_restful import reqparse, Resource, marshal
from flask import g

from bucketlist.resources.models import BucketList, BucketlistItem, db
from bucketlist.functionalities.serializer import bucketlist_item_serializer
from bucketlist.functionalities.permissions import auth


class BucketListItems(Resource):
    decorators = [auth.login_required]

    def post(self, item_id):
        """
        Endpoint to create a bucketlist item
        """

        bucket_list = BucketList.query.filter_by(list_id=item_id,
                                                 created_by=g.user.user_id).first()

        if bucket_list:
            parser = reqparse.RequestParser()
            parser.add_argument('title', type=str,
                                required=True,
                                help='Provide a bucketlist item'
                                )
            parser.add_argument('description', type=str)
            args = parser.parse_args(strict=True)
            name, description = args['title'], args['description']

            if not name and not description:
                return {'message': 'Title or description cannot be blank'}, 400
            else:
                bucketlistitems = BucketlistItem(item_title=name, item_description=description,
                                                 bucketlist_id=item_id,
                                                 created_by=g.user.user_id,
                                                 done=False)
                db.session.add(bucketlistitems)
                db.session.commit()
                items = marshal(bucketlistitems, bucketlist_item_serializer)

                return {'message': 'You have successfully created a bucketlist item', 'bucketlistitems': items}, 200
        return {'message': 'That list was not found'}, 404

    def put(self, bucketlist_id, item_id):
        """
        Endpoint to update a bucketlist item
        """

        bucketlistitem = BucketlistItem.query.filter_by(created_by=g.user.user_id, item_id=item_id, bucketlist_id=bucketlist_id).first()

        if bucketlistitem is None:
            return {'message': 'Bucketlist not found'}, 404
        else:

            parser = reqparse.RequestParser()
            parser.add_argument('title', type=str,
                                required=True,
                                help='Provide a bucketlist item'
                                )
            parser.add_argument('description', type=str, required=True)
            parser.add_argument('done', type=str, required=True,
                                help='This field takes a True of False value depending on whether you have accomplished it or not ')

            args = parser.parse_args(strict=True)
            done, name, description = args['done'], args['title'], args['description']

            if name == bucketlistitem.item_title and description == bucketlistitem.item_description:
                return{'message': 'That Item already exists'}, 400
            else:

                if name: bucketlistitem.item_title = name

                if description: bucketlistitem.description = description

                if done == 'True' or done == 'true':
                    bucketlistitem.done = True
                elif done == 'False' or done == 'false':
                    bucketlistitem.done = False

                bucketlistitem.bucketlist_id = bucketlist_id
                bucketlistitem.item_id = item_id

                db.session.commit()
                response = marshal(bucketlistitem, bucketlist_item_serializer)

                return {"bucket_list": response, "message": "Successfully updated a bucketlistitem"}, 200

    def delete(self, bucketlist_id, item_id):
        """
        Endpoint to delete a bucketlist item by its id
        """
        bucketlistitem = BucketlistItem.query.filter_by(created_by=g.user.user_id,
                                                        item_id=item_id,
                                                        bucketlist_id=bucketlist_id).first()
        if bucketlistitem:
            db.session.delete(bucketlistitem)
            db.session.commit()
            return {"message": "You have successfully deleted bucketlist with ID:%s" % item_id}, 200
        return {'message': 'Bucketlist not found'}, 404
