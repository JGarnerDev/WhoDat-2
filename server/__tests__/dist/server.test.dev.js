"use strict";

var request = require("supertest");

var app = require("../server");

var mongoose = require("mongoose");

var mongoDB = "mongodb+srv://".concat(process.env.DBcharacter, ":").concat(process.env.DBPASS, "@whodat.iydrs.mongodb.net/").concat(process.env.CHARDB, "?retryWrites=true&w=majority");

var _require = require("../models/character"),
    Character = _require.Character;

var _require2 = require("../models/user"),
    User = _require2.User;

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

function makeUser() {
  return new User({
    email: "hello@hotmail.com",
    password: "Password",
    username: "FooBar",
    characters: []
  });
}

describe.only("App (server) test", function () {
  it("has a module", function () {
    expect(app).toBeDefined();
  });
  var server;
  beforeAll(function () {
    server = app.listen(5001);
  });
  afterAll(function _callee(done) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(mongoose.connection.close());

          case 2:
            _context.next = 4;
            return regeneratorRuntime.awrap(server.close(done()));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  describe("User routes test", function () {
    // Black box tests to make sure the endpoints are present
    describe("GET", function () {
      it("can recieve a request for authentication", function _callee2(done) {
        return regeneratorRuntime.async(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return regeneratorRuntime.awrap(request(server).get("/api/auth").expect(200));

              case 2:
                done();

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        });
      });
      it("can recieve a request for a single character", function _callee3(done) {
        return regeneratorRuntime.async(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return regeneratorRuntime.awrap(request(server).get("/api/character").expect(200));

              case 2:
                done();

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        });
      });
      it("can respond with a list of characters", function _callee4(done) {
        return regeneratorRuntime.async(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return regeneratorRuntime.awrap(request(server).get("/api/characters").expect(200));

              case 2:
                done();

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        });
      });
      it("can recieve a request for author metadata", function _callee5(done) {
        return regeneratorRuntime.async(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return regeneratorRuntime.awrap(request(server).get("/api/author_get").expect(200));

              case 2:
                done();

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        });
      });
      it("can recieve a request for a list of all users", function _callee6(done) {
        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return regeneratorRuntime.awrap(request(server).get("/api/users_get").expect(200));

              case 2:
                done();

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        });
      });
      it("can recieve a request for the characters of a user", function _callee7(done) {
        return regeneratorRuntime.async(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return regeneratorRuntime.awrap(request(server).get("/api/characters_user_get").expect(200));

              case 2:
                done();

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        });
      });
      it("can recieve a logout request", function _callee8(done) {
        return regeneratorRuntime.async(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return regeneratorRuntime.awrap(request(server).get("/api/logout").expect(200));

              case 2:
                done();

              case 3:
              case "end":
                return _context8.stop();
            }
          }
        });
      });
    });
    describe("POST", function () {
      it("can recieve requests for user registration", function _callee9(done) {
        return regeneratorRuntime.async(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return regeneratorRuntime.awrap(request(server).post("/api/register").expect(200));

              case 2:
                done();

              case 3:
              case "end":
                return _context9.stop();
            }
          }
        });
      });
      it("can recieve requests for logging in", function _callee10(done) {
        return regeneratorRuntime.async(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return regeneratorRuntime.awrap(request(server).post("/api/login").expect(200));

              case 2:
                done();

              case 3:
              case "end":
                return _context10.stop();
            }
          }
        });
      });
      it("can recieve requests for character creation", function _callee11(done) {
        var character;
        return regeneratorRuntime.async(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                character = {
                  name: "Bob the Brave",
                  authorName: "character1",
                  authorId: "xxxxx",
                  "class": "Bard",
                  level: 1,
                  character_data: {}
                };
                _context11.next = 3;
                return regeneratorRuntime.awrap(request(server).post("/api/character").send(character).expect(200));

              case 3:
                _context11.next = 5;
                return regeneratorRuntime.awrap(Character.deleteOne({}));

              case 5:
                done();

              case 6:
              case "end":
                return _context11.stop();
            }
          }
        });
      });
      it("can recieve requests for user updates", function _callee12(done) {
        return regeneratorRuntime.async(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return regeneratorRuntime.awrap(request(server).post("/api/user_update").expect(200));

              case 2:
                done();

              case 3:
              case "end":
                return _context12.stop();
            }
          }
        });
      });
      it("can recieve requests for character updates", function _callee13(done) {
        return regeneratorRuntime.async(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return regeneratorRuntime.awrap(request(server).post("/api/character_update").expect(200));

              case 2:
                done();

              case 3:
              case "end":
                return _context13.stop();
            }
          }
        });
      });
    });
    describe("DELETE", function () {
      it("can recieve requests for user account deletion", function _callee14(done) {
        return regeneratorRuntime.async(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return regeneratorRuntime.awrap(request(server)["delete"]("/api/user_delete").expect(200));

              case 2:
                done();

              case 3:
              case "end":
                return _context14.stop();
            }
          }
        });
      });
      it("can recieve requests for user account deletion", function _callee15(done) {
        return regeneratorRuntime.async(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return regeneratorRuntime.awrap(request(server)["delete"]("/api/character_delete").expect(200));

              case 2:
                done();

              case 3:
              case "end":
                return _context15.stop();
            }
          }
        });
      });
    });
    describe("404", function () {
      it("returns 404 when a non-existent route is requested", function _callee16(done) {
        return regeneratorRuntime.async(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return regeneratorRuntime.awrap(request(server).get("/fail").expect(404));

              case 2:
                done();

              case 3:
              case "end":
                return _context16.stop();
            }
          }
        });
      });
    });
    describe("Responses and Validation", function () {
      // done
      describe("User registration", function () {
        it("responds with `success: false` and a message if username is not unique", function _callee17(done) {
          var user, userWithSameUsername;
          return regeneratorRuntime.async(function _callee17$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  // Make two user objects sharing only a common email
                  user = makeUser();
                  userWithSameUsername = new User({
                    email: "NotTheSame@hotmail.com",
                    password: "Password",
                    username: user.username,
                    characters: []
                  }); // send the first user object to endpoint

                  _context17.next = 4;
                  return regeneratorRuntime.awrap(request(server).post("/api/register").send(user).expect(function (res) {
                    res.body.success === true;
                  }));

                case 4:
                  _context17.next = 6;
                  return regeneratorRuntime.awrap(request(server).post("/api/register").send(userWithSameUsername).expect(function (res) {
                    if (res.body.success !== false) {
                      throw Error("it did not prevent username duplication");
                    }

                    if (res.body.message !== "An account with that username already exists! ") {
                      throw Error("it did not send the right message");
                    }
                  }));

                case 6:
                  _context17.next = 8;
                  return regeneratorRuntime.awrap(User.deleteOne({}));

                case 8:
                  done();

                case 9:
                case "end":
                  return _context17.stop();
              }
            }
          });
        });
        it("responds with `success: false` and a message if email is not unique", function _callee18(done) {
          var user, userWithSameEmail;
          return regeneratorRuntime.async(function _callee18$(_context18) {
            while (1) {
              switch (_context18.prev = _context18.next) {
                case 0:
                  // Make two user objects sharing only a common email
                  user = makeUser();
                  userWithSameEmail = new User({
                    email: user.email,
                    password: "Password",
                    username: "DifferentUsername",
                    characters: []
                  }); // send the first user object to endpoint

                  _context18.next = 4;
                  return regeneratorRuntime.awrap(request(server).post("/api/register").send(user).expect(function (res) {
                    res.body.success === true;
                  }));

                case 4:
                  _context18.next = 6;
                  return regeneratorRuntime.awrap(request(server).post("/api/register").send(userWithSameEmail).expect(function (res) {
                    if (res.body.success !== false) {
                      throw Error("it did not prevent email duplication");
                    }

                    if (res.body.message !== "An account with that email already exists! ") {
                      throw Error("it did not send the right message");
                    }
                  }));

                case 6:
                  _context18.next = 8;
                  return regeneratorRuntime.awrap(User.deleteOne({}));

                case 8:
                  done();

                case 9:
                case "end":
                  return _context18.stop();
              }
            }
          });
        });
        it("responds with `success: false` and a message if the username excedes 100 characters", function _callee19(done) {
          var user, maxUsernameLength;
          return regeneratorRuntime.async(function _callee19$(_context19) {
            while (1) {
              switch (_context19.prev = _context19.next) {
                case 0:
                  // Make two user objects sharing only a common email
                  user = makeUser();
                  maxUsernameLength = 100; // set the username to be a string of 101 a's

                  user.username = new Array(maxUsernameLength + 2).join("a");
                  _context19.next = 5;
                  return regeneratorRuntime.awrap(request(server).post("/api/register").send(user).expect(function (res) {
                    if (res.body.success !== false) {
                      throw Error("it did not prevent a large username");
                    }

                    if (res.body.message !== "Submitted username is too big") {
                      throw Error("it did not send the right message");
                    }
                  }));

                case 5:
                  _context19.next = 7;
                  return regeneratorRuntime.awrap(User.deleteOne({}));

                case 7:
                  done();

                case 8:
                case "end":
                  return _context19.stop();
              }
            }
          });
        });
        it("responds with `success: false` and a message if the password is less than 6 characters", function _callee20(done) {
          var user;
          return regeneratorRuntime.async(function _callee20$(_context20) {
            while (1) {
              switch (_context20.prev = _context20.next) {
                case 0:
                  user = makeUser();
                  user.password = "12345";
                  _context20.next = 4;
                  return regeneratorRuntime.awrap(request(server).post("/api/register").send(user).expect(function (res) {
                    if (res.body.success !== false) {
                      throw Error("it did not prevent a small password");
                    }

                    if (res.body.message !== "Submitted password is too short") {
                      throw Error("it did not send the right message");
                    }
                  }));

                case 4:
                  _context20.next = 6;
                  return regeneratorRuntime.awrap(User.deleteOne({}));

                case 6:
                  done();

                case 7:
                case "end":
                  return _context20.stop();
              }
            }
          });
        });
        it("responds with `success: false` and a message if any required information is missing", function _callee21(done) {
          var missingUserInfoTest, userWithoutEmail, userWithoutPassword, userWithoutUsername;
          return regeneratorRuntime.async(function _callee21$(_context22) {
            while (1) {
              switch (_context22.prev = _context22.next) {
                case 0:
                  missingUserInfoTest = function _ref(userWithoutInfo) {
                    return regeneratorRuntime.async(function missingUserInfoTest$(_context21) {
                      while (1) {
                        switch (_context21.prev = _context21.next) {
                          case 0:
                            _context21.next = 2;
                            return regeneratorRuntime.awrap(request(server).post("/api/register").send(userWithoutInfo).expect(function (res) {
                              if (res.body.success !== false) {
                                throw Error("it did not prevent missing required data ");
                              }

                              if (res.body.message !== "Required account information is missing") {
                                throw Error("it did not send the right message");
                              }
                            }));

                          case 2:
                          case "end":
                            return _context21.stop();
                        }
                      }
                    });
                  };

                  userWithoutEmail = makeUser();
                  userWithoutEmail.email = undefined;
                  userWithoutPassword = makeUser();
                  userWithoutPassword.password = undefined;
                  userWithoutUsername = makeUser();
                  userWithoutUsername.username = undefined;
                  missingUserInfoTest(userWithoutEmail);
                  missingUserInfoTest(userWithoutPassword);
                  missingUserInfoTest(userWithoutUsername);
                  done();

                case 11:
                case "end":
                  return _context22.stop();
              }
            }
          });
        });
      }); // done

      describe("User login and auth", function () {
        it('responds with `isAuth: false` and a message if there is not matching account"', function _callee22(done) {
          var user;
          return regeneratorRuntime.async(function _callee22$(_context23) {
            while (1) {
              switch (_context23.prev = _context23.next) {
                case 0:
                  // Make a user object, but do not save it to the db
                  user = makeUser();
                  _context23.next = 3;
                  return regeneratorRuntime.awrap(request(server).post("/api/login").send(user).expect(function (res) {
                    if (res.body.isAuth !== false) {
                      throw Error("it did not prevent a nonexistent user from being authenticated");
                    }

                    if (res.body.message !== "Login failed - account not found") {
                      throw Error("it did not send the right message");
                    }
                  }));

                case 3:
                  done();

                case 4:
                case "end":
                  return _context23.stop();
              }
            }
          });
        });
        it('responds with `isAuth: false` and a message if the password for the account does not match"', function _callee23(done) {
          var user;
          return regeneratorRuntime.async(function _callee23$(_context24) {
            while (1) {
              switch (_context24.prev = _context24.next) {
                case 0:
                  user = makeUser();
                  _context24.next = 3;
                  return regeneratorRuntime.awrap(user.save());

                case 3:
                  user.password = "WrongPassword";
                  _context24.next = 6;
                  return regeneratorRuntime.awrap(request(server).post("/api/login").send(user).expect(function (res) {
                    if (res.body.isAuth !== false) {
                      throw Error("it did not prevent a user from being authenticated with the wrong password");
                    }

                    if (res.body.message !== "Login failed - password was incorrect") {
                      throw Error("it did not send the right message");
                    }
                  }));

                case 6:
                  _context24.next = 8;
                  return regeneratorRuntime.awrap(User.deleteOne({}));

                case 8:
                  done();

                case 9:
                case "end":
                  return _context24.stop();
              }
            }
          });
        });
        it("responds with `isAuth: true` if username and password are correct", function _callee24(done) {
          var user;
          return regeneratorRuntime.async(function _callee24$(_context25) {
            while (1) {
              switch (_context25.prev = _context25.next) {
                case 0:
                  user = makeUser();
                  _context25.next = 3;
                  return regeneratorRuntime.awrap(user.save());

                case 3:
                  // Resetting the password to the non-encrypted version
                  user.password = "Password";
                  _context25.next = 6;
                  return regeneratorRuntime.awrap(request(server).post("/api/login").send(user).expect(function (res) {
                    if (res.body.isAuth !== true) {
                      throw Error("it prevented a user from being authenticated");
                    }
                  }));

                case 6:
                  _context25.next = 8;
                  return regeneratorRuntime.awrap(User.deleteOne({}));

                case 8:
                  done();

                case 9:
                case "end":
                  return _context25.stop();
              }
            }
          });
        });
      }); // done

      describe("User logout", function () {
        it("logs out a logged in user without error", function _callee25(done) {
          var agent, user;
          return regeneratorRuntime.async(function _callee25$(_context26) {
            while (1) {
              switch (_context26.prev = _context26.next) {
                case 0:
                  agent = request.agent(server);
                  user = makeUser();
                  _context26.next = 4;
                  return regeneratorRuntime.awrap(user.save());

                case 4:
                  user.password = "Password";
                  _context26.next = 7;
                  return regeneratorRuntime.awrap(agent.post("/api/login").send(user).expect(function (res) {
                    if (res.body.isAuth !== true) {
                      throw Error("This test did not start properly");
                    }
                  }));

                case 7:
                  _context26.next = 9;
                  return regeneratorRuntime.awrap(User.findById(user._id));

                case 9:
                  user = _context26.sent;
                  _context26.next = 12;
                  return regeneratorRuntime.awrap(agent.get("/api/logout").send(user).expect(function (res) {
                    if (res.body.success !== true) {
                      throw Error("The user did not log out successfully");
                    }
                  }));

                case 12:
                  _context26.next = 14;
                  return regeneratorRuntime.awrap(User.deleteOne({}));

                case 14:
                  done();

                case 15:
                case "end":
                  return _context26.stop();
              }
            }
          });
        });
      }); // done

      describe("User info retrieval", function () {
        // '/api/user' endpoint
        it("responds with a user`s information and success value when successful", function _callee26(done) {
          var user, character1, character2, character3, expectedUser;
          return regeneratorRuntime.async(function _callee26$(_context27) {
            while (1) {
              switch (_context27.prev = _context27.next) {
                case 0:
                  user = makeUser();
                  character1 = new Character({
                    name: "Foo1",
                    authorName: user.username,
                    authorId: user._id,
                    "class": "druid",
                    level: 1,
                    short_description: "A bear",
                    character_data: {
                      something: {},
                      somethingElse: []
                    }
                  });
                  character2 = new Character({
                    name: "Foo2",
                    authorName: user.username,
                    authorId: user._id,
                    "class": "fighter",
                    level: 2,
                    short_description: "A pirate",
                    character_data: {
                      something: {},
                      somethingElse: []
                    }
                  });
                  character3 = new Character({
                    name: "Foo3",
                    authorName: user.username,
                    authorId: user._id,
                    "class": "rogue",
                    level: 3,
                    short_description: "A librarian",
                    character_data: {
                      something: {},
                      somethingElse: []
                    }
                  });
                  user.characters = [character1, character2, character3];
                  expectedUser = user;
                  _context27.next = 8;
                  return regeneratorRuntime.awrap(user.save());

                case 8:
                  _context27.next = 10;
                  return regeneratorRuntime.awrap(request(server).get("/api/user").send({
                    _id: user._id
                  }).expect(function (res) {
                    // Note: would have preferred to just compare the user objects,
                    // 	but Mongo returns it's own object types that I couldn't
                    // 	get Jest to be happy with despite toMatchObject presenting
                    // 	expected and actual values looking the same. A more elegant
                    //  solution is a todo, but this works.
                    //that we get success: true
                    expect(res.body.success).toBe(true); // that the username is correct

                    expect(res.body.user.username).toBe(expectedUser.username); // that the id is correct

                    expect(res.body.user._id).toBe(expectedUser._id.toString()); // that the amount of characters is correct

                    expect(res.body.user.characters.length).toBe(expectedUser.characters.length); // that each character has the right authorId value

                    res.body.user.characters.forEach(function (character) {
                      expect(character.authorId).toBe(expectedUser._id.toString());
                    }); // that each character has the right authorName value

                    res.body.user.characters.forEach(function (character) {
                      expect(character.authorName).toBe(expectedUser.username);
                    }); // that each character is one of those we made earlier

                    res.body.user.characters.forEach(function (character, i) {
                      expect(character.name).toBe("Foo".concat(i + 1));
                    });
                  }));

                case 10:
                  _context27.next = 12;
                  return regeneratorRuntime.awrap(User.deleteOne({}));

                case 12:
                  done();

                case 13:
                case "end":
                  return _context27.stop();
              }
            }
          });
        });
        it("responds with a success value and a message when not successful", function _callee27(done) {
          return regeneratorRuntime.async(function _callee27$(_context28) {
            while (1) {
              switch (_context28.prev = _context28.next) {
                case 0:
                  _context28.next = 2;
                  return regeneratorRuntime.awrap(request(server).get("/api/user").send({
                    _id: "Wrong"
                  }).expect(function (res) {
                    expect(res.body.success).toBe(false);
                    expect(res.body.message).toBe("Unfortunately, we couldn't find this user!");
                  }));

                case 2:
                  done();

                case 3:
                case "end":
                  return _context28.stop();
              }
            }
          });
        });
      }); // done

      describe("User characters retrieval", function () {
        it("successfully retrieves the characters by authorId", function _callee28(done) {
          var user, character1, character2, character3, someOtherUserCharacter1, someOtherUserCharacter2;
          return regeneratorRuntime.async(function _callee28$(_context29) {
            while (1) {
              switch (_context29.prev = _context29.next) {
                case 0:
                  user = makeUser();
                  character1 = new Character({
                    name: "Foo1",
                    authorName: user.username,
                    authorId: user._id,
                    "class": "druid",
                    level: 1,
                    short_description: "test",
                    character_data: {
                      something: {},
                      somethingElse: []
                    }
                  });
                  character2 = new Character({
                    name: "Foo2",
                    authorName: user.username,
                    authorId: user._id,
                    "class": "fighter",
                    level: 2,
                    short_description: "test",
                    character_data: {
                      something: {},
                      somethingElse: []
                    }
                  });
                  character3 = new Character({
                    name: "Foo3",
                    authorName: user.username,
                    authorId: user._id,
                    "class": "rogue",
                    level: 3,
                    short_description: "test",
                    character_data: {
                      something: {},
                      somethingElse: []
                    }
                  });
                  someOtherUserCharacter1 = new Character({
                    name: "Wrong",
                    authorName: "Bar",
                    authorId: "123456",
                    "class": "rogue",
                    level: 3,
                    short_description: "test",
                    character_data: {
                      something: {},
                      somethingElse: []
                    }
                  });
                  someOtherUserCharacter2 = new Character({
                    name: "Wrong",
                    authorName: "BarFoo",
                    authorId: "12345697865",
                    "class": "rogue",
                    level: 3,
                    short_description: "test",
                    character_data: {
                      something: {},
                      somethingElse: []
                    }
                  });
                  user.characters = [character1, character2, character3];
                  _context29.next = 9;
                  return regeneratorRuntime.awrap(character1.save());

                case 9:
                  _context29.next = 11;
                  return regeneratorRuntime.awrap(character2.save());

                case 11:
                  _context29.next = 13;
                  return regeneratorRuntime.awrap(character3.save());

                case 13:
                  _context29.next = 15;
                  return regeneratorRuntime.awrap(someOtherUserCharacter1.save());

                case 15:
                  _context29.next = 17;
                  return regeneratorRuntime.awrap(someOtherUserCharacter2.save());

                case 17:
                  _context29.next = 19;
                  return regeneratorRuntime.awrap(user.save());

                case 19:
                  _context29.next = 21;
                  return regeneratorRuntime.awrap(request(server).get("/api/characters_user_get").send({
                    authorId: user._id
                  }).expect(function (res) {
                    // expect there to be a success value of true
                    expect(res.body.success).toBe(true); // expect the right number of characters

                    var actualCharacters = res.body.characters;
                    expect(actualCharacters.length).toBe(user.characters.length); // expect the right characters

                    actualCharacters.forEach(function (character, i) {
                      expect(character.name).toBe("Foo".concat(i + 1));
                    });
                  }));

                case 21:
                  _context29.next = 23;
                  return regeneratorRuntime.awrap(User.deleteOne({}));

                case 23:
                  _context29.next = 25;
                  return regeneratorRuntime.awrap(Character.deleteMany({
                    short_description: "test"
                  }));

                case 25:
                  done();

                case 26:
                case "end":
                  return _context29.stop();
              }
            }
          });
        });
        it("responds correctly if no characters are found", function _callee29(done) {
          return regeneratorRuntime.async(function _callee29$(_context30) {
            while (1) {
              switch (_context30.prev = _context30.next) {
                case 0:
                  _context30.next = 2;
                  return regeneratorRuntime.awrap(request(server).get("/api/characters_user_get").send({
                    authorId: "WRONG"
                  }).expect(function (res) {
                    var actual = res.body;
                    expect(actual).toEqual({
                      success: true,
                      message: "No characters found by requested author"
                    });
                  }));

                case 2:
                  _context30.next = 4;
                  return regeneratorRuntime.awrap(User.deleteOne({}));

                case 4:
                  done();

                case 5:
                case "end":
                  return _context30.stop();
              }
            }
          });
        });
      }); //

      describe("User update", function () {}); //

      describe("User deletion", function () {}); //

      describe("Users list", function () {}); //

      describe("Character saving", function () {}); //

      describe("Character retrieval", function () {}); //

      describe("Character author metadata retrieval", function () {}); //

      describe("Character updating", function () {}); //

      describe("Character deletion", function () {}); //
    });
  });
});