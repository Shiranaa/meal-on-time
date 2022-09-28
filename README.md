# Meal On Time

Food delivery or takeaway with React.

### Tech Stack
* Node.js
* Express.js
* MongoDB
* Mongoose
* nodemon
* React

> Documentation can be found in `docs` folder.

## Prepare The Environment
1. Create a new MongoDB database with a cards collection.
2. Clone project in vscode: `https://github.com/levworkshop/meal-on-time.git`

## Project Installation
1. Install nodemon globally: `npm i -g nodemon` and update `package.json` accordingly.
2. Server:
    * Add configuration file: `config/dev.js` containing the database connection details.
    * Install dependencies for the Server:  
    `cd server`  
    `npm install`
3. Install dependencies for React client:  
    `cd client`  
    `npm install`

## Run The App
> Make sure mongo server is running.

1. Run the server - `cd client`, then:
    * Windows: `set DEBUG=meal-on-time:*; & npm start`
    * MacOS/Linux: `DEBUG=meal-on-time:* npm start`
2. Run the client:  
`cd client`  
`npm start`
