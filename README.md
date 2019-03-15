# movielist-setup

### What do we need?
Our goal is to get some practice with [React](https://reactjs.org/docs/getting-started.html) _(psst... it's a great idea to start organizing your bookmarks for the TA so you can reference them as needed. I recommend setting up folders for "client", "server" and "database" and adding to these as you encounter useful links)._

Let's start by setting up the folders and files we will initially need. 

```
|- public _(sometimes called dist)_
  |- index.html
|- server
  |- index.js
|- src
  |- index.jsx
|- .gitignore
```

'public' is where our bundle will live once Webpack has cast its compiling magic, 'server' is where we will serve up our static files and 'src' is where our React components will live waiting for the magic.

Go ahead and add the line `node_modules` to the .gitignore file.

### Setting up Webpack and Babel
To compile our modules, we're going to use [Webpack](https://webpack.js.org/guides/getting-started/) _(psst... this is another great link to bookmark)_

Go ahead and create two files in your root directory: 'webpack.config.js' and 'package.json'.

This is the basic Webpack setup taken almost word for word from that website above.

```
const path = require('path');

module.exports = {
  // where is the base of our app located
  entry: path.resolve(__dirname, 'src/index.jsx'),
  output: {
    // what we want our bundle to be called
    filename: 'bundle.js',
    // where we want our bundle to live
    path: path.resolve(__dirname, 'public'),
  },
};

```

We need to add a few more rules in because we're using React. Let's head over to the [Webpack babel-loader docs](https://webpack.js.org/loaders/babel-loader/)

Inside our module.exports object, below our 'output' key, let's add:

```
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
      }
    ],
  },
```

Now, because we're including [babel-loader](https://www.npmjs.com/package/babel-loader), [@babel/core](https://www.npmjs.com/package/@babel/core), [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env) and [@babel/preset-react](https://www.npmjs.com/package/@babel/preset-react) we need to remember to install these and for that, we'll need to setup our package.json.

### Setting up our package.json

Let's look back at the [Webpack docs](https://webpack.js.org/guides/getting-started/). 

We'll modify their package.json a little bit:

```
{
    "name": "movielist-setup",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "build": "webpack --watch",
      "start": "nodemon server/index.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "webpack": "^4.20.2",
      "webpack-cli": "^3.1.2"
    },
    "dependencies": {}
  }
```

Run 'npm install' to get your webpack and webpack-cli installed. Remember to run the npm commands for [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env), [@babel/preset-react](https://www.npmjs.com/package/@babel/preset-react), [babel-loader](https://github.com/babel/babel-loader) and [@babel/core](https://www.npmjs.com/package/@babel/core).

After running 'npm install --save-dev @babel/preset-env @babel/preset-react babel-loafer @babel/core' you should see these pop up in your package.json the "devDependencies" object.

While we're here, let's think about what else we're going to need. 
- We're building a react app, so we probably need [react](https://www.npmjs.com/package/react)
- In order to get our react components to render, we'll need [react-dom](https://www.npmjs.com/package/react-dom)
- In order to serve up our components, we're going to use [express](https://www.npmjs.com/package/express)
- If you don't have [nodemon](https://www.npmjs.com/package/nodemon) globally installed, go ahead and throw that in there too

### Setting up our index.html

Back to the [Webpack docs](https://webpack.js.org/guides/getting-started/), there's a little index.html guidance. We're going to tweak this a little:

```
<!doctype html>
<html>
  <head>
    <title>Movie List Setup</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="./bundle.js"></script>
  </body>
</html>
```

Here, we add in our div to append our react component to and the script to run our bundle.js.

### Setting up our react components

In our src/index.jsx add the following:

```
import ReactDOM from 'react-dom';
import React from 'react';

ReactDOM.render(<div>'Hello World'</div>, document.getElementById('app'));

```

The import statement is from the [react api docs](https://reactjs.org/docs/react-api.html).

The `<div>'Hello World'</div>` is where we will render our App component down the line, but let's make sure we're up and running first. 

Info about `ReactDOM.render` can be found [here](https://reactjs.org/docs/add-react-to-a-website.html).

### Setting up our server

In our server/index.js we want to serve up our static files. We will be using [express](https://www.npmjs.com/package/express) for this. From those npm docs we get the following:

```
var express = require('express')
var app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000);
```

Let's tweak that a little and add in [express.static middleware](https://expressjs.com/en/api.html).

```
var express = require('express');
var app = express();
var port = 3000;

app.use(express.static('public'));

app.listen(port, () => console.log('listening on: ', port));
```


### That's (almost) it!!

Congratulations!!! The final steps are 

1. Build your bundle by running the script we popped into our package.json earlier ('npm run build'). This starts webpack and keeps it watching for any changes.
2. Run 'npm start' to have nodemon run your server/index.js
3. Navigate to localhost:3000
4. Bask in the glory of rendering 'Hello World'
