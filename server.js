//https://medium.com/@rahulguptalive/how-to-build-simple-restful-crud-api-with-nodejs-expressjs-and-mongodb-2d25a0e27937
// npm install mongodb
// connect to mongoDB
//mongoose.connect('mongodb://localhost:27017/tutorials_db');
/* For windows - just go to Mongodb folder (ex : C:\ProgramFiles\MongoDB\Server\3.4\bin) and open cmd in the folder and type "mongod.exe --dbpath C:\Romesh\2020\FullStackMeanUsersCrud\NodeExpressAPI\data\db"
if c:\data\db folder doesn't exist then create it by yourself and run above command again.
All should work fine by now.)) */

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Setup server port
const port = process.env.PORT || 4444;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require('./app/config/db.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
	console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database.', err);
  process.exit();
});

// define a root/default route
app.get('/', (req, res) => {
  res.json({"message": "Welcome to Full Stack MEAN CRUD USERS application."});
});

// Require Users routes
const userRoutes = require('./app/routes/user.routes');

// using as middleware
app.use('/api/users', userRoutes);

// listen for requests
app.listen(port, () => {
  console.log(`Node server is listening on port ${port}`);
});

/* 
	open postman
	
	test all the endpoints
	
	http://localhost:4444/api/users
	
	{
		"first_name": "firstName",
		"last_name": "lastName",
		"email": "emailID",
		"phone": "phoneNo"
	}
*/

