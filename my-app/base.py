from bucketlist import api, app, db
from bucketlist.resources.user_authentication import Register, Login
from bucketlist.resources.bucketlists import BucketListAPI, BucketListsAPI
from bucketlist.resources.bucketlistitems import BucketListItems


""" Defining the API endpoints """
api.add_resource(Register, '/auth/register', endpoint='Register')
api.add_resource(Login, '/auth/login', endpoint='Login')

api.add_resource(BucketListAPI, '/bucketlists/<int:list_id>', endpoint='Bucketlists')
api.add_resource(BucketListsAPI, '/bucketlists/', endpoint='Bucketlistsedit')

api.add_resource(BucketListItems, '/bucketlists/<int:item_id>/items/', endpoint='BucketlistItems')
api.add_resource(BucketListItems, '/bucketlists/<int:bucketlist_id>/items/<int:item_id>', endpoint='updatedeleteitems')


if __name__ == "__main__":
    app.run()
