const User = require('../models/user.model.js');

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
	User.find().then(users => {
		res.send(users);
	}).catch(err => {
		res.status(500).send({ message: err.message || "Something went wrong while getting list of users." })
	})
};

// Create and Save a new User
exports.create = (req, res) => {
	// Validate request
	if(!req.body) {
	  return res.status(400).send({ message: "Please fill all required field" });
	}
	
	// Create a new User	
	const user = new User({
	  first_name: req.body.first_name,
	  last_name: req.body.last_name,
	  email: req.body.email,
	  phone: req.body.phone
	});
	
	// Save user in the database
	user.save()
	.then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({ message: err.message || "Something went wrong while creating new user." })
	})
};

// Find a single User with a id
exports.findOne = (req, res) => {
	User.findById(req.params.id).then(user => {
		if(!user) {
			return res.status(404).send({ message: "User not found with id " + req.params.id });
		}
		res.send(user);
	}).catch(err => {
		if(err.kind === 'ObjectId') {
			return res.status(404).send({ message: "User not found with id " + req.params.id });
		}
		return res.status(500).send({ message: "Error getting user with id " + req.params.id });
	})
};

// Update a User identified by the id in the request
exports.update = (req, res) => {
	// Validate request
	if(!req.body) {
	  return res.status(400).send({ message: "Please fill all required field" });
	}
	
	// Find user and update it with the request body
	User.findByIdAndUpdate(req.params.id, {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		phone: req.body.phone
	},{new: true}).then(user => {
		if(!user) {
			return res.status(404).send({ message: "user not found with id " + req.params.id });
		}
		res.send(user);
	}).catch(err => {
		if(err.kind === 'ObjectId') {
			return res.status(404).send({ message: "User not found with id " + req.params.id });
		}
		return res.status(500).send({ message: "Error updating user with id " + req.params.id });
	})
}

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
	User.findByIdAndRemove(req.params.id).then(user => {
		if(!user) {
			return res.status(404).send({ message: "user not found with id " + req.params.id });
		}
		res.send({message: "user deleted successfully!"});
	}).catch(err => {
		if(err.kind === 'ObjectId' || err.name === 'NotFound') {
			return res.status(404).send({ message: "user not found with id " + req.params.id });
		}
		return res.status(500).send({ message: "Could not delete user with id " + req.params.id });
	});
};

/*
You can check out the documentation of all the methods that we used in the above APIs on Mongoose’s official documentation -
Mongoose find()
Mongoose save()
Mongoose findById()
Mongoose findByIdAndUpdate()
Mongoose findByIdAndRemove()
API end points
GET /api/users: will give all users stored in database
GET /api/users/<user_id>: will give a specific user with user_id.
POST /api/users : user can create a new user
PATCH /api/users/<user_id>: update a user partially
DELETE /api/users/<user_id>: delete a user
PUT /api/users/<user_id>: update a user completely

 */