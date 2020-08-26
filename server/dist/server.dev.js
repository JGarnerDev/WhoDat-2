"use strict";

require("dotenv").config();

var express = require("express");

var bodyParser = require("body-parser");

var cookieParser = require("cookie-parser");

var cors = require("cors");

var mongoose = require("mongoose");

var uri = "mongodb+srv://".concat(process.env.DBUSER, ":").concat(process.env.DBPASS, "@whodat.iydrs.mongodb.net/").concat(process.env.CHARDB, "?retryWrites=true&w=majority");
var app = express();
var port = process.env.PORT || 5000;
mongoose.Promise = global.Promise;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

var _require = require("./models/user"),
    User = _require.User;

var _require2 = require("./models/character"),
    Character = _require2.Character;

var _require3 = require("./middleware/auth"),
    auth = _require3.auth;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
var connection = mongoose.connection;
connection.once("open", function (err) {
  if (err) {
    console.log("Error in connection!");
  }

  console.log("connected!");
});
var db = connection.collections; // GET //
// Authentication

app.get("/api/auth", auth, function (req, res) {
  res.json({
    isAuth: true,
    _id: req.user._id
  });
}); // Retrieve one character

app.get("/api/character", function (req, res) {
  Character.findOne({
    authorId: req.body._id
  }, function (err, characterObj) {
    if (err) return res.json({
      success: false,
      message: "Unfortunately, we couldn't find this character."
    });
    res.send(characterObj);
  });
}); // Retrieve a limited amount of characters from the entire collection

app.get("/api/characters", function (req, res) {
  var skip = req.body.skip;
  var limit = req.body.limit;
  var order = req.body.order;
  Character.find().skip(skip).sort({
    updatedAt: order
  }).limit(limit).exec(function (err, charactersArray) {
    if (err) return res.status(400).send(err);
    res.send(charactersArray);
  });
}); // Retrieve character author meta

app.get("/api/author_get", function (req, res) {
  User.findById(req.body._id, function (err, user) {
    if (err) {
      return res.status(400).send(err);
    } else if (user == null) {
      res.send({
        success: false,
        username: "unknown"
      });
    } else {
      res.send({
        success: true,
        username: user.username,
        characterAmount: user.characters.length
      });
    }
  });
}); // Retrieve all users (omitting sensitive data)

app.get("/api/users_get", function _callee(req, res) {
  var pipeline, users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          pipeline = [{
            $skip: req.body.skip || 0
          }, {
            $limit: req.body.limit || 20
          }, {
            $sort: {
              _id: req.body.order || -1
            }
          }, {
            $project: {
              name: "$name",
              lastname: "$lastname",
              characterAmount: {
                $size: "$characters"
              }
            }
          }]; //  aggregate(pipeline) comes back as an AggregationCursor, which requires .toArray() to translate it to a typical array of objects

          _context.next = 3;
          return regeneratorRuntime.awrap(db.users.aggregate(pipeline).toArray());

        case 3:
          users = _context.sent;
          res.json(users);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}); // Retrieve a user

app.get("/api/user", function (req, res) {
  User.findById(req.body._id, function (err, user) {
    if (err || user === null) return res.json({
      success: false,
      message: "Unfortunately, we couldn't find this user!"
    });
    res.send({
      success: true,
      user: user
    });
  });
}); // Retrieve a user's characters

app.get("/api/characters_user_get", function (req, res) {
  Character.find({
    authorId: req.body.authorId
  }).exec(function (err, characters) {
    if (err) return res.json({
      success: false,
      message: "Unfortunately, we couldn't find characters at this moment"
    });

    if (characters.length === 0) {
      return res.send({
        success: true,
        message: "No characters found by requested author"
      });
    } else {
      return res.send({
        success: true,
        characters: characters
      });
    }
  });
}); // Logging out

app.get("/api/logout", auth, function (req, res) {
  req.user.deleteToken(req.token, function (err, user) {
    if (err) {
      return res.json({
        success: false,
        err: err,
        message: "There was an error in logging you out. You might bealready logged out - you can't log out any harder."
      });
    }

    res.json({
      success: true
    });
  });
}); // POST //
// Creating a new user

app.post("/api/register", function (req, res) {
  if (req.body.password === undefined || req.body.username === undefined || req.body.email === undefined) {
    return res.json({
      success: false,
      message: "Required account information is missing"
    });
  }

  if (req.body.password.length < 6) {
    return res.json({
      success: false,
      message: "Submitted password is too short"
    });
  }

  if (req.body.username.length > 100) {
    return res.json({
      success: false,
      message: "Submitted username is too big"
    });
  }

  var user = new User(req.body);
  user.save(function (err, userDoc) {
    if (err) {
      var conflictingValue = Object.keys(err.keyPattern)[0];

      switch (conflictingValue) {
        case "email":
          return res.json({
            success: false,
            message: "An account with that email already exists! "
          });

        case "username":
          return res.json({
            success: false,
            message: "An account with that username already exists! "
          });

        default:
          return res.json({
            success: false,
            message: "An unknown error occurred in registering your account"
          });
      }
    }

    delete userDoc.password;
    res.status(200).json({
      success: true,
      userDoc: userDoc
    });
  });
}); // User Login

app.post("/api/login", function (req, res) {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (!user) return res.json({
      isAuth: false,
      message: "Login failed - account not found"
    });
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch) return res.json({
        isAuth: false,
        message: "Login failed - password was incorrect"
      });
      user.generateToken(function (err, user) {
        if (err) return res.status(400).send(err);
        res.cookie("auth", user.token).json({
          isAuth: true,
          _id: user._id,
          email: user.email,
          username: user.username
        });
      });
    });
  });
}); // Saving a character

app.post("/api/character", function (req, res) {
  var character = new Character(req.body);
  character.save(function (err) {
    if (err) return res.json({
      success: false,
      message: "Unfortunately, there was an error in creating this character."
    });
    res.status(200).json({
      success: true,
      message: "Character saved!"
    });
  });
}); // UPDATE //

app.post("/api/user_update", function (req, res) {
  User.findByIdAndUpdate(req.body._id, req.body, {
    "new": true
  }, function (err, userData) {
    if (err) {
      return res.json({
        success: false,
        error: err,
        message: "Unfortunately, there was an error in locating your user file for update. "
      });
    }

    res.json({
      success: true,
      userData: userData
    });
  });
});
app.post("/api/character_update", function (req, res) {
  Character.findByIdAndUpdate(req.body._id, req.body, {
    "new": true
  }, function (err) {
    if (err) return res.json({
      success: false,
      message: "Unfortunately, there was an error in locating your character for updating. "
    });
    res.json({
      success: true,
      message: "".concat(req.body.name, " was successfully updated!")
    });
  });
}); // DELETE //

app["delete"]("/api/user_delete", function (req, res) {
  User.findByIdAndRemove(req.body._id, function (err, doc) {
    if (err || doc === null) return res.json({
      success: false,
      message: "Unfortunately, there was an error in locating your account for deletion. "
    });
    res.json({
      success: true,
      message: "The account for ".concat(req.body.email, " was successfully deleted!")
    });
  });
});
app["delete"]("/api/character_delete", function (req, res) {
  Character.findByIdAndRemove(req.body._id, function (err, doc) {
    if (err || doc === null) return res.json({
      success: false,
      message: "Unfortunately, there was an error in locating ".concat(req.body.name, " for deletion.")
    });
    res.json({
      success: true,
      message: "The character ".concat(req.body.name, " was successfully deleted!")
    });
  });
}); // // PICK ONE BELOW // //
// vvv Runs server on port vvv
// app.listen(port, () => {
// 	console.log(`Server running on port ${port}`);
// });
// vvv Makes server available for testing vvv

module.exports = app;