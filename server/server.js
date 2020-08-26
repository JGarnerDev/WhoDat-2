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
	Character.findOne({ authorId: req.body._id }, (err, characterObj) => {
		if (err)
			return res.json({
				success: false,
				message: "Unfortunately, we couldn't find this character.",
			});
		res.send(characterObj);
	});
});

// Retrieve a limited amount of characters from the entire collection

app.get("/api/characters", (req, res) => {
	let skip = req.body.skip;
	let limit = req.body.limit;
	let order = req.body.order;

	Character.find()
		.skip(skip)
		.sort({ updatedAt: order })
		.limit(limit)
		.exec((err, charactersArray) => {
			if (err) return res.status(400).send(err);
			res.send(charactersArray);
		});
});

// Retrieve character author meta

app.get("/api/author_get", (req, res) => {
	User.findById(req.body._id, (err, user) => {
		console.log("AAAAAAA", user);
		if (err) {
			return res.status(400).send(err);
		} else if (user == null) {
			res.send({ success: false, username: "unknown" });
		} else {
			res.send({
				success: true,
				username: user.username,
				characterAmount: user.characters.length,
			});
		}
	});
});

// Retrieve all users (omitting sensitive data)

app.get("/api/users_get", async (req, res) => {
	const pipeline = [
		{ $skip: req.body.skip || 0 },
		{ $limit: req.body.limit || 20 },
		{ $sort: { _id: req.body.order || -1 } },
		{
			$project: {
				name: "$name",
				lastname: "$lastname",
				characterAmount: { $size: "$characters" },
			},
		},
	];
	//  aggregate(pipeline) comes back as an AggregationCursor, which requires .toArray() to translate it to a typical array of objects
	const users = await db.users.aggregate(pipeline).toArray();
	res.json(users);
});

// Retrieve a user

app.get("/api/user", (req, res) => {
	User.findById(req.body._id, (err, user) => {
		if (err || user === null)
			return res.json({
				error: true,
				message: "Unfortunately, we couldn't find this user!",
			});
		res.send({
			name: user.name,
			lastname: user.lastname,
			email: user.email,
			characters: user.characters,
			characterAmount: user.characters.length,
		});
	});
});

// Retrieve a user's characters

app.get("/api/characters_user_get", (req, res) => {
	Character.find({ authorId: req.body.authorId }).exec((err, docs) => {
		if (err)
			return res.json({
				success: false,
				message: "Unfortunately, we couldn't find this user's characters.",
			});
		res.send(docs);
	});
});

// Logging out

app.get("/api/logout", auth, (req, res) => {
	req.user.deleteToken(req.token, (err, user) => {
		if (err) {
			return res.json({
				success: false,
				message:
					"There was an error in logging you out. You might bealready logged out - you can't log out any harder.",
			});
		}
		res.json({ success: true, message: "Goodbye!" });
	});
});

// POST //

// Creating a new user

app.post("/api/register", (req, res) => {
	console.log(req.body);
	if (
		req.body.password === undefined ||
		req.body.username === undefined ||
		req.body.email === undefined
	) {
		return res.json({
			success: false,
			message: "Required account information is missing",
		});
	}
	if (req.body.password.length < 6) {
		return res.json({
			success: false,
			message: "Submitted password is too short",
		});
	}
	if (req.body.username.length > 100) {
		return res.json({
			success: false,
			message: "Submitted username is too big",
		});
	}
	const user = new User(req.body);

	user.save((err, userDoc) => {
		if (err) {
			const conflictingValue = Object.keys(err.keyPattern)[0];
			switch (conflictingValue) {
				case "email":
					return res.json({
						success: false,
						message: "An account with that email already exists! ",
					});
				case "username":
					return res.json({
						success: false,
						message: "An account with that username already exists! ",
					});

				default:
					return res.json({
						success: false,
						message: "An unknown error occurred in registering your account",
					});
			}
		}
		delete userDoc.password;
		res.status(200).json({
			success: true,
			userDoc,
		});
	});
});

// User Login

app.post("/api/login", (req, res) => {
	User.findOne({ username: req.body.username }, (err, user) => {
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
				});
			});
		});
	});
});

// Saving a character
app.post("/api/character", (req, res) => {
	const character = new Character(req.body);
	character.save((err) => {
		if (err)
			return res.json({
				success: false,
				message:
					"Unfortunately, there was an error in creating this character.",
			});
		res.status(200).json({
			success: true,
			message: "Character saved!",
		});
	});
});

// UPDATE //

app.post("/api/user_update", (req, res) => {
	User.findByIdAndUpdate(
		req.body._id,
		req.body,
		{ new: true },
		(err, userData) => {
			if (err) {
				return res.json({
					success: false,
					error: err,
					message:
						"Unfortunately, there was an error in locating your user file for update. ",
				});
			}
			res.json({
				success: true,
				userData,
			});
		}
	);
});

app.post("/api/character_update", (req, res) => {
	Character.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err) => {
		if (err)
			return res.json({
				success: false,
				message:
					"Unfortunately, there was an error in locating your character for updating. ",
			});
		res.json({
			success: true,
			message: `${req.body.name} was successfully updated!`,
		});
	});
});

// DELETE //

app.delete("/api/user_delete", (req, res) => {
	User.findByIdAndRemove(req.body._id, (err, doc) => {
		if (err || doc === null)
			return res.json({
				success: false,
				message:
					"Unfortunately, there was an error in locating your account for deletion. ",
			});
		res.json({
			success: true,
			message: `The account for ${req.body.email} was successfully deleted!`,
		});
	});
});
app.delete("/api/character_delete", (req, res) => {
	Character.findByIdAndRemove(req.body._id, (err, doc) => {
		if (err || doc === null)
			return res.json({
				success: false,
				message: `Unfortunately, there was an error in locating ${req.body.name} for deletion.`,
			});
		res.json({
			success: true,
			message: `The character ${req.body.name} was successfully deleted!`,
		});
	});
});

// // PICK ONE BELOW // //

// vvv Runs server on port vvv

// app.listen(port, () => {
// 	console.log(`Server running on port ${port}`);
// });

// vvv Makes server available for testing vvv

module.exports = app;
