from flask_restful import reqparse, Resource, marshal
from flask import g, request

from bucketlist.resources.models import BucketList, db
from bucketlist.functionalities.serializer import bucketlist_serializer
from bucketlist.functionalities.permissions import auth


class BucketListAPI(Resource):
    decorators = [auth.login_required]

    def get(self, list_id):
        """
        Get a single bucket list selected by list_id
        """
        bucket_list = BucketList.query.filter_by(list_id=list_id,
                                                 created_by=g.user.user_id).first()
        if bucket_list:
            listrequested = marshal(bucket_list, bucketlist_serializer)
            return {"listrequested": listrequested, 'message': 'The bucket list requested is ID: %s' % list_id}, 200
        else:
            return {'message': 'Error! Could not find the Bucketlist with ID:%s' % list_id}, 404

    def delete(self, list_id):
        """
        Delete a single bucket list selected by list_id
        """
        bucket_list = BucketList.query.filter_by(list_id=list_id,
                                                 created_by=g.user.user_id).first()
        if bucket_list:
            db.session.delete(bucket_list)
            db.session.commit()
            return {"message": "You have successfully deleted bucketlist with ID:%s" % list_id}, 200
        return {'message': 'Bucketlist not found'}, 404

    def put(self, list_id):
        """
        Update a Bucketlist
        """

        bucket_list = BucketList.query.filter_by(list_id=list_id,
                                                 created_by=g.user.user_id).first()
        if bucket_list is None:
            return {'message': 'Bucketlist not found'}, 404

        parser = reqparse.RequestParser()
        parser.add_argument('title',
                            type=str,
                            required=True,
                            help='Provide a Bucketlist item')
        parser.add_argument('description', type=str)
        args = parser.parse_args(strict=True)

        title, description = args['title'], args['description']

        if bucket_list.list_title == title and bucket_list.list_description == description:
            return {"message": "Oops !!! Seems like that bucketList already exists. To update a bucketlist, enter a new title or description"}, 400

        if title:
            bucket_list.list_title = title

        if description:
            bucket_list.list_description = description

        db.session.commit()

        if bucket_list:
            response = marshal(bucket_list, bucketlist_serializer)
            return {"bucket_list": response, "message": "Bucketlist updated"}, 200


class BucketListsAPI(Resource):
    decorators = [auth.login_required]

    def get(self):
        """
        Get all the bucket lists
        """
        search_name = request.args.get("q")
        offset = int(request.args.get("offset", 1))
        limit = int(request.args.get("limit", 20))

        if search_name:
            all_bucket_lists = BucketList.query.filter_by(created_by=g.user.user_id).all()
            bucket_list = BucketList.query.filter_by(list_title=search_name,
                                                     created_by=g.user.user_id).first()
            response = marshal(all_bucket_lists, bucketlist_serializer)
            if bucket_list is not None:
                return marshal(bucket_list, bucketlist_serializer)

            return {"message": "The Bucketlist" + ", " + search_name + ", " + "was not found", "try this instead": response}

        bucket_lists = BucketList.query.filter_by(created_by=g.user.user_id)\
            .paginate(page=offset, per_page=limit, error_out=False)

        pages = bucket_lists.pages
        has_prev = bucket_lists.has_prev
        has_next = bucket_lists.has_next

        if has_next:
            next_page = request.url_root + "bucketlists?" + \
                    "limit=" + str(limit) + "&offset=" + str(offset + 1)
        else:
            next_page = 'Null'

        if has_prev:
            previous_page = request.url_root + "bucketlists?" + \
                    "limit=" + str(limit) + "&offset=" + str(offset - 1)
        else:
            previous_page = 'Null'

        bucket_lists = bucket_lists.items


        result = {"bucket_lists": marshal(bucket_lists, bucketlist_serializer),
                  "has_next": has_next,
                  "total_pages": pages,
                  "previous_page": previous_page,
                  "next_page": next_page
                  }
        if bucket_lists:
            return result
        else:
            return "Error! Couldn't find any bucketlists"

    def post(self):
        """
        Create a Bucketlist
        """
        parser = reqparse.RequestParser()
        parser.add_argument('title', type=str)
        parser.add_argument('description', type=str)
        args = parser.parse_args(strict=True)
        title, description = args['title'], args['description']

        existing_bucketlist = BucketList.query.filter_by(list_title=title,
                                                         created_by=g.user.user_id).all()
        if not title or not description:
            return {'message': 'You cannot submit blank fields'}, 400

        if existing_bucketlist:
            return {'message': 'Bucketlist already exits'}, 400
        else:
            new_bucketlist = BucketList(list_title=title,
                                        list_description=description, created_by=g.user.user_id)
            db.session.add(new_bucketlist)
            db.session.commit()
            response = marshal(new_bucketlist, bucketlist_serializer)
            return {"new_bucketlist": response, "message": "You have successfully created a bucketlist"}, 201
