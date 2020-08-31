require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@whodat.iydrs.mongodb.net/${process.env.CHARDB}?retryWrites=true&w=majority`;

const app = express();
const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

const { User } = require("./models/user");
const { Character } = require("./models/character");

const { auth } = require("./middleware/auth");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

const connection = mongoose.connection;

connection.once("open", (err) => {
	if (err) {
		console.log("Error in connection!");
	}

	console.log("connected!");
});

let db = connection.collections;

// GET //

// Authentication

app.get("/api/auth", auth, (req, res) => {
	res.json({
		isAuth: true,
		_id: req.user._id,
	});
});

// Retrieve one character

app.get("/api/character", (req, res) => {
	Character.findOne(
		{
			_id: req.body._id,
		},
		(err, character) => {
			if (err)
				return res.json({
					success: false,
					message: "Character retrieval failed - try again soon!",
				});
			res.json({ success: true, character });
		}
	);
});

// Retrieve a limited amount of characters from the entire collection

app.get("/api/characters_get", async (req, res) => {
	const skip = req.body.skip || 0;
	const limit = req.body.limit || 10;
	const order = req.body.order || -1;

	const pipeline = [
		{
			$skip: skip,
		},
		{
			$limit: limit,
		},
		{
			$sort: {
				_id: order,
			},
		},
		{
			$project: {
				name: "$name",
				level: "$level",
				class: "$class",
				authorName: "$authorName",
			},
		},
	];
	//  aggregate(pipeline) comes back as an AggregationCursor, which requires .toArray() to translate it to a typical array of objects
	const characters = await db.characters.aggregate(pipeline).toArray();
	characters.length > 0
		? res.json({ success: true, characters })
		: res.json({
				success: false,
				message: "Retrieval of characters failed - try again soon!",
		  });
});

// Retrieve character author meta

app.get("/api/author_get", (req, res) => {
	User.findById(req.body._id, (err, user) => {
		if (err || user == null) {
			res.send({
				success: false,
				author: { username: "unknown" },
			});
		} else {
			res.send({
				success: true,
				author: {
					username: user.username,
					characterAmount: user.characters.length,
				},
			});
		}
	});
});

// Retrieve a collection from all users (omitting sensitive data)

app.get("/api/users_get", async (req, res) => {
	const skip = req.body.skip || 0;
	const limit = req.body.limit || 10;
	const order = req.body.order || -1;

	const pipeline = [
		{
			$skip: skip,
		},
		{
			$limit: limit,
		},
		{
			$sort: {
				_id: order,
			},
		},
		{
			$project: {
				username: "$username",
				characterAmount: {
					$size: "$characters",
				},
			},
		},
	];
	//  aggregate(pipeline) comes back as an AggregationCursor, which requires .toArray() to translate it to a typical array of objects
	const users = await db.users.aggregate(pipeline).toArray();
	users.length
		? res.json({ success: true, users })
		: res.json({
				success: false,
				message: "Retrieval of users failed - try again soon!",
		  });
});

// Retrieve a user

app.get("/api/user", (req, res) => {
	User.findById(req.body._id, (err, user) => {
		if (err || user === null)
			return res.json({
				success: false,
				message: "User retrieval failed - try again soon!",
			});
		res.send({
			success: true,
			user,
		});
	});
});

// Retrieve a user's characters

app.get("/api/characters_user_get", (req, res) => {
	Character.find({
		authorId: req.body._id,
	}).exec((err, characters) => {
		if (err)
			return res.json({
				success: false,
				message: "Retrieving this user's characters failed - try again soon!",
			});
		if (characters.length === 0) {
			return res.send({
				success: true,
				message: `This user doesn't have any characters yet :(`,
			});
		} else {
			return res.send({
				success: true,
				characters,
			});
		}
	});
});

// Logging out

app.get("/api/logout", auth, (req, res) => {
	req.user.deleteToken(req.token, (err, user) => {
		if (err) {
			return res.json({
				success: false,
				err: err,
				message: "Logout failed.",
			});
		}
		res.json({
			success: true,
		});
	});
});

// POST //

// Creating a new user

app.post("/api/register", (req, res) => {
	if (
		req.body.password === undefined ||
		req.body.username === undefined ||
		req.body.email === undefined
	) {
		return res.json({
			success: false,
			message: "Registration failed - required account information is missing",
		});
	}
	if (req.body.password.length < 6) {
		return res.json({
			success: false,
			message: "Registration failed - submitted password is too short",
		});
	}
	if (req.body.username.length > 100) {
		return res.json({
			success: false,
			message: "Registration failed - submitted username is too big",
		});
	}
	const user = new User(req.body);

	user.save((err, user) => {
		if (err) {
			const conflictingValue = Object.keys(err.keyPattern)[0];
			switch (conflictingValue) {
				case "email":
					return res.json({
						success: false,
						message:
							"Registration failed - an account with that email already exists! ",
					});
				case "username":
					return res.json({
						success: false,
						message:
							"Registration failed - an account with that username already exists! ",
					});

				default:
					return res.json({
						success: false,
						message: "Registration failed - an unknown error occurred",
					});
			}
		}
		delete user.password;
		res.json({
			success: true,
			message: `Registration success - Thank you for joining, ${user.username}!`,
			user,
		});
	});
});

// User Login

app.post("/api/login", (req, res) => {
	User.findOne(
		{
			username: req.body.username,
		},
		(err, user) => {
			if (!user)
				return res.json({
					isAuth: false,
					message: "Login failed - account not found",
				});

			user.comparePassword(req.body.password, (err, isMatch) => {
				if (!isMatch)
					return res.json({
						isAuth: false,
						message: "Login failed - password was incorrect",
					});

				user.generateToken((err, user) => {
					if (err) return res.status(400).send(err);
					res.cookie("auth", user.token).json({
						isAuth: true,
						_id: user._id,
						email: user.email,
						username: user.username,
						message: `Welcome back, ${user.username}!`,
					});
				});
			});
		}
	);
});

// Saving a character
app.post("/api/character", (req, res) => {
	const character = new Character(req.body);
	character.save((err) => {
		if (err)
			return res.json({
				success: false,
				message: "Character save failed - there was an unknown error",
			});
		res.status(200).json({
			success: true,
			message: "Character save successful!",
			_id: character._id,
		});
	});
});

// UPDATE //

app.post("/api/character_update", (req, res) => {
	Character.findByIdAndUpdate(
		req.body._id,
		req.body,
		{
			new: true,
		},
		(err, character) => {
			if (!character)
				return res.json({
					success: false,
					message: "Character update failed - there was an unknown error",
				});
			res.json({
				success: true,
				message: "Character update successful!",
				character: character,
			});
		}
	);
});

// DELETE //

app.delete("/api/user_delete", (req, res) => {
	User.findByIdAndRemove(req.body._id, (err, doc) => {
		if (err || !doc)
			return res.json({
				success: false,
				message: "Account deletion failed - couldn't locate account",
			});
		res.json({
			success: true,
			message: `Account for ${req.body.username} was successfully deleted!`,
		});
	});
});

app.delete("/api/character_delete", (req, res) => {
	Character.findByIdAndRemove(req.body._id, (err, doc) => {
		if (err || doc == null)
			return res.json({
				success: false,
				message: `Character deletion failed - there was an error in locating ${req.body.name}`,
			});
		res.json({
			success: true,
			message: `Character deletion successful - The character ${req.body.name} is gone!`,
		});
	});
});

// // PICK ONE BELOW // //

// vvv Runs server on port vvv

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

// vvv Makes server available for testing vvv

// module.exports = app;
