# osa3a-backend-puhelinluettelo

BackEnd of fullstack phonebook app, made with Node.js.
Web server via [express](http://expressjs.com/).
Logging through [morgan](https://github.com/expressjs/morgan).
Cors allowed with [cors](https://github.com/expressjs/cors) middleware.

Requirements:
cors v ^2.8.5
express ^4.17.1
morgan ^1.10.0

Uses Nodemon for listening for changes in dev code.
Requirement: nodemon version ^2.0.4

The app in [heroku](https://phonebook-node-js.herokuapp.com/).

Remember to install ignored node_modules
`npm install`

For running in development with nodemon listening
`node_modules/.bin/nodemon index.js`

## Available Scripts
In the project directory, you can run:

`npm start`
Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.