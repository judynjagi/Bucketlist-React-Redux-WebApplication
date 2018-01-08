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
       1. Naviagate to the project folder and run
      			 $ python manage.py cov

```

## `5. React-Redux Front-End App`
---

```
    1. **Install [Node 6](https://nodejs.org)**. Need to run multiple versions of Node? Use [nvm](https://github.com/creationix/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows)
    2. **Clone this repository.** - `git clone https://github.com/andela-judynjagi/Bucketlist-React-Redux-WebApplication.git` or [download the zip](https://github.com/coryhouse/pluralsight-redux-starter/archive/master.zip)
    3. **Make sure you're in the directory you just created.** - `cd Bucketlist_with_React_Redux/my-app`
    4. **Install Node Packages.** - `npm install`
    5. **Run the app.** - `npm start -s`
    This will run the automated build process, start up a webserver, and open the application in your default browser. When doing development with this kit, this command will continue watching files all your files. Every time you hit save the code is rebuilt, linting runs, and tests run automatically. Note: The -s flag is optional. It enables silent mode which suppresses unnecessary messages during the build.
    6. **[Disable safe write](http://webpack.github.io/docs/webpack-dev-server.html#working-with-editors-ides-supporting-safe-write)** to assure hot reloading works properly.
    7. **Install [React developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) and [Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)** in Chrome.
    8. Having issues? See below.
```
## `Having Issues? Try these things first:`
```
    1. Run `npm install` - If you forget to do this, you'll see this: `babel-node: command not found`.
    2. Make sure the path doesn't include any spaces, or install the latest version of eslint-watch which adds support for paths containing spaces: `npm install eslint-watch@2.1.13`
    3. Make sure you're running the latest version of Node. Or, use [Node 5.12.0](https://nodejs.org/download/release/v5.12.0/) if you're having issues on Windows. Node 6 has issues on some Windows machines.
    4. Make sure files with names that begin with a dot (.babelrc, .editorconfig, .eslintrc) are copied to the project directory root. This is easy to overlook if you copy this repository manually.
    5. Don't run the project from a symbolic link. It will cause issues with file watches.
    6. Use path.resolve on all path references in both the dev and prod webpack.config.
    7. Delete any .eslintrc in your user directory and disable any ESLint plugin / custom rules within your editor since these will conflict with the ESLint rules defined in the course.
    8. On Windows? Open your console as an administrator. This will assure the console has the necessary rights to perform installs.
    9. Try using your OS's native command line instead of an editor's. For some people, an editor's command line configuration may cause issues.
    10. Ensure you do not have NODE_ENV=production in your env variables as it will not install the devDependencies. To check run this on the command line: `set NODE_ENV`. If it comes back as production, you need to clear this env variable.
    11. Make sure you're using the same imports as the course demo. I've seen some people import ES6 code from node_modules via different imports like `import Route from "react-router/es6/Route";` and `import IndexRoute from "react-router/es6/IndexRoute";`. Don't do that. :) Use the exact imports I use in the course.
    12. Nothing above work? Delete your node_modules folder and re-run npm install.
```

###`Production Dependencies`
| **Dependency** | **Use** |
|----------|-------|
|babel-polyfill | Polyfill for Babel features that cannot be transpiled |
|bootstrap|CSS Framework|
|jquery|Only used to support toastr|
|react|React library |
|react-dom|React library for DOM rendering |
|react-redux|Redux library for connecting React components to Redux |
|react-router|React library for routing |
|react-router-redux|Keep React Router in sync with Redux application state|
|redux|Library for unidirectional data flows |
|redux-thunk|Async redux library|
|toastr|Display messages to the user|

### `Development Dependencies`
| **Dependency** | **Use** |
|----------|-------|
|babel-cli|Babel Command line interface |
|babel-core|Babel Core for transpiling the new JavaScript to old |
|babel-loader|Adds Babel support to Webpack |
|babel-plugin-react-display-name| Add displayName to React.createClass calls |
|babel-preset-es2015|Babel preset for ES2015|
|babel-preset-react| Add JSX support to Babel |
|babel-preset-react-hmre|Hot reloading preset for Babel|
|babel-register|Register Babel to transpile our Mocha tests|
|cheerio|Supports querying DOM with jQuery like syntax - Useful in testing and build process for HTML manipulation|
|colors|Adds color support to terminal |
|compression|Add gzip support to Express|
|cross-env|Cross-environment friendly way to handle environment variables|
|css-loader|Add CSS support to Webpack|
|enzyme|Simplified JavaScript Testing utilities for React|
|eslint|Lints JavaScript |
|eslint-plugin-import|Advanced linting of ES6 imports|
|eslint-plugin-react|Adds additional React-related rules to ESLint|
|eslint-watch|Add watch functionality to ESLint |
|eventsource-polyfill|Polyfill to support hot reloading in IE|
|expect|Assertion library for use with Mocha|
|express|Serves development and production builds|
|extract-text-webpack-plugin| Extracts CSS into separate file for production build |
|file-loader| Adds file loading support to Webpack |
|jsdom|In-memory DOM for testing|
|mocha| JavaScript testing library |
|nock| Mock HTTP requests for testing |
|npm-run-all| Display results of multiple commands on single command line |
|open|Open app in default browser|
|react-addons-test-utils| Adds React TestUtils |
|redux-immutable-state-invariant|Warn when Redux state is mutated|
|redux-mock-store|Mock Redux store for testing|
|rimraf|Delete files |
|style-loader| Add Style support to Webpack |
|url-loader| Add url loading support to Webpack |
|webpack| Bundler with plugin system and integrated development server |
|webpack-dev-middleware| Adds middleware support to webpack |
|webpack-hot-middleware| Adds hot reloading to webpack |
