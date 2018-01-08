[![CircleCI](https://circleci.com/gh/judynjagi/Bucket_list/tree/develop.svg?style=svg)](https://circleci.com/gh/judynjagi/Bucket_list/tree/develop)
[![Coverage Status](https://coveralls.io/repos/github/judynjagi/Bucket_list/badge.svg)](https://coveralls.io/github/judynjagi/Bucket_list)
# `BUCKETLIST`

## `1. Synopsis`
Bucket list is an  web application built with Flask for the backend and React-Redux for the front-end.

According to Merriam-Webster Dictionary, **a Bucket List is a list of things that one has not done before but wants to do before dying.**

The Bucketlist API service implements Token Based Authentication for the Bucket List API such that some methods are not accessible to unauthenticated users. Endpoints listed as `Public` do not require the Authentication token to be accessed. Below is a list of Access control mapping.


| Endpoint                            | Allowed Methods  | Functionality                                            | Public         |
|-------------------------------------|------------------|----------------------------------------------------------|----------------|
| `/auth/login`                       | POST             | Log a user in                                            | Yes            |
| `/auth/register`                    | POST             | Register a user                                          | Yes            |
| `/bucketlists`                      | POST, GET        | Create and Retrieve all bucket lists                     | No             |
| `/bucketlists/<id>`                 | GET, PUT, DELETE | Retrieve, Update and Delete a single bucket list         | No             |
| `/bucketlists/<id>/items`           | GET, POST        | Create and Retrieve a new item in bucket list            | No             |
| `/bucketlists/<id>/items/<item_id>` | GET, PUT, DELETE | Retrieve, Edit, Delete an item in a bucket list          | No             |

## `2. Prerequisites`
Bucketlist API requires `Python 3`to run

## `3. Installation`
#### Clone the github repository
        1. $ git clone https://github.com/judynjagi/Bucket_list.git

        2. Change directory into package $ cd bucketlist

        3. install virtualenvwrapper
	        	$ pip install virtualenvwrapper
				$ export WORKON_HOME=~/Envs
				$ mkdir -p $WORKON_HOME
				$ source /usr/local/bin/virtualenvwrapper.sh
				$ mkvirtualenv bucketlist

        4. Activate the virtual environment using: $ workon bucketlist

        5. Install dependencies $ pip install requirements.txt


#### For more instructions on installing virtualenvwrapper use this link: <https://virtualenvwrapper.readthedocs.io/>


#### Configurations
 Creating a `.env` file and set these environment.

```
	workon buckeklist
	export APP_SETTINGS="config.DevelopmentConfig"
	export TEST_DATABASE_URI="sqlite:///../bucketlist.db"
	export PRODUCTION_DATABASE_URI="sqlite:///models/bucketlist.db"
	export DEVELOPMENT_DATABASE_URI="sqlite:///../bucketlist.db"
	export SECRET_KEY="privatekey-cannot-be-public"
	export FLASK_APP="bucketlist"
	export FLASK_DEBUG=true
	flask run

```
#### Run Migrations
 Create a database and run migrations by running these commands.

```
        $ python manage.py db init
        $ python manage.py db migrate
        $ python manage.py db upgrade
```

#### Run Bucketlist API application
  Finally, after everything is set, run your application by:   

```
        1. Navigating to the project folder
        2. Run python base.py
        3. You can access the app at http://127.0.0.1:5000
```
#### Run React-Redux application
  Finally, after everything is set, run your application by:   

```
        1. Navigating to the `my-app` folder
        2. Run npm install or npm i to install all the dependencies
        3. Run npm start to fire up your application in the browser
```
## NB: You need to run the Bucketlist API concurrently with the React-Redux application. To do so, open two tabs in your Terminal and on each tab, run a single application.

## `5. Testing`
---

```

To run the tests;
```
       1. Navigate to the project folder and run
      			 $ python manage.py cov

```
