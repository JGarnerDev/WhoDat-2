var request = require("supertest")
var app = require("../server")
var mongoose = require("mongoose")
const mongoDB = `mongodb+srv://${process.env.DBcharacter}:${process.env.DBPASS}@whodat.iydrs.mongodb.net/${process.env.CHARDB}?retryWrites=true&w=majority`
const {
	Character
} = require("../models/character")
const {
	User
} = require("../models/user");

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

function makeUser() {
	return new User({
		email: "hello@hotmail.com",
		password: "Password",
		username: "FooBar",
		characters: [],
	});
}

describe.only("App (server) test", () => {
	it("has a module", () => {
		expect(app).toBeDefined();
	});

	let server;

	beforeAll(() => {
		server = app.listen(5001);
	});

	afterAll(async (done) => {
		await mongoose.connection.close();
		await server.close(done());
	});

	describe("User routes test", () => {
		// Black box tests to make sure the endpoints are present
		describe("GET", () => {

			it("can recieve a request for authentication", async (done) => {
				await request(server).get("/api/auth").expect(200);
				done();
			});
			it("can recieve a request for a single character", async (done) => {
				await request(server).get("/api/character").expect(200);
				done();
			});
			it("can respond with a list of characters", async (done) => {
				await request(server).get("/api/characters").expect(200);
				done();
			});
			it("can recieve a request for author metadata", async (done) => {
				await request(server).get("/api/author_get").expect(200);
				done();
			});
			it("can recieve a request for a list of all users", async (done) => {
				await request(server).get("/api/users_get").expect(200);
				done();
			});
			it("can recieve a request for the characters of a user", async (done) => {
				await request(server).get("/api/characters_user_get").expect(200);
				done();
			});
			it("can recieve a logout request", async (done) => {
				await request(server).get("/api/logout").expect(200);
				done();
			});
		});
		describe("POST", () => {
			it("can recieve requests for user registration", async (done) => {
				await request(server).post("/api/register").expect(200);
				done();
			});
			it("can recieve requests for logging in", async (done) => {
				await request(server).post("/api/login").expect(200);
				done();
			});
			it("can recieve requests for character creation", async (done) => {
				let character = {
					name: "Bob the Brave",
					authorName: "character1",
					authorId: "xxxxx",
					class: "Bard",
					level: 1,
					character_data: {},
				};
				await request(server)
					.post("/api/character")
					.send(character)
					.expect(200);
				await Character.deleteOne({});
				done();
			});
			it("can recieve requests for user updates", async (done) => {
				await request(server).post("/api/user_update").expect(200);
				done();
			});
			it("can recieve requests for character updates", async (done) => {
				await request(server).post("/api/character_update").expect(200);
				done();
			});
		});
		describe("DELETE", () => {
			it("can recieve requests for user account deletion", async (done) => {
				await request(server).delete("/api/user_delete").expect(200);
				done();
			});
			it("can recieve requests for user account deletion", async (done) => {
				await request(server).delete("/api/character_delete").expect(200);
				done();
			});
		});
		describe("404", () => {
			it("returns 404 when a non-existent route is requested", async (done) => {
				await request(server).get("/fail").expect(404);
				done();
			});
		});
		describe("Responses and Validation", () => {
			// done
			describe("User registration", () => {
				it("responds with `success: false` and a message if username is not unique", async (done) => {
					// Make two user objects sharing only a common email
					const user = makeUser();
					const userWithSameUsername = new User({
						email: "NotTheSame@hotmail.com",
						password: "Password",
						username: user.username,
						characters: [],
					});

					// send the first user object to endpoint
					await request(server)
						.post("/api/register")
						.send(user)
						.expect((res) => {
							res.body.success === true;
						});
					// send the userWithSameUsername object to endpoint, expect success to be false
					// 	and the message to be the one setup in our server for this case
					await request(server)
						.post("/api/register")
						.send(userWithSameUsername)
						.expect((res) => {
							if (res.body.success !== false) {
								throw Error("it did not prevent username duplication");
							}
							if (
								res.body.message !==
								"An account with that username already exists! "
							) {
								throw Error("it did not send the right message");
							}
						});

					await User.deleteOne({});
					done();
				});
				it("responds with `success: false` and a message if email is not unique", async (done) => {
					// Make two user objects sharing only a common email
					const user = makeUser();
					const userWithSameEmail = new User({
						email: user.email,
						password: "Password",
						username: "DifferentUsername",
						characters: [],
					});

					// send the first user object to endpoint
					await request(server)
						.post("/api/register")
						.send(user)
						.expect((res) => {
							res.body.success === true;
						});
					// send the userWithSameEmail object to endpoint, expect success to be false
					// 	and the message to be the one setup in our server for this case
					await request(server)
						.post("/api/register")
						.send(userWithSameEmail)
						.expect((res) => {
							if (res.body.success !== false) {
								throw Error("it did not prevent email duplication");
							}
							if (
								res.body.message !==
								"An account with that email already exists! "
							) {
								throw Error("it did not send the right message");
							}
						});

					await User.deleteOne({});
					done();
				});
				it("responds with `success: false` and a message if the username excedes 100 characters", async (done) => {
					// Make two user objects sharing only a common email
					const user = makeUser();

					const maxUsernameLength = 100;
					// set the username to be a string of 101 a's
					user.username = new Array(maxUsernameLength + 2).join("a");

					await request(server)
						.post("/api/register")
						.send(user)
						.expect((res) => {
							if (res.body.success !== false) {
								throw Error("it did not prevent a large username");
							}
							if (res.body.message !== "Submitted username is too big") {
								throw Error("it did not send the right message");
							}
						});

					await User.deleteOne({});
					done();
				});
				it("responds with `success: false` and a message if the password is less than 6 characters", async (done) => {
					const user = makeUser();

					user.password = "12345";

					await request(server)
						.post("/api/register")
						.send(user)
						.expect((res) => {
							if (res.body.success !== false) {
								throw Error("it did not prevent a small password");
							}
							if (res.body.message !== "Submitted password is too short") {
								throw Error("it did not send the right message");
							}
						});

					await User.deleteOne({});
					done();
				});
				it("responds with `success: false` and a message if any required information is missing", async (done) => {
					async function missingUserInfoTest(userWithoutInfo) {
						await request(server)
							.post("/api/register")
							.send(userWithoutInfo)
							.expect((res) => {
								if (res.body.success !== false) {
									throw Error("it did not prevent missing required data ");
								}
								if (
									res.body.message !== "Required account information is missing"
								) {
									throw Error("it did not send the right message");
								}
							});
					}

					const userWithoutEmail = makeUser();
					userWithoutEmail.email = undefined;

					const userWithoutPassword = makeUser();
					userWithoutPassword.password = undefined;

					const userWithoutUsername = makeUser();
					userWithoutUsername.username = undefined;

					missingUserInfoTest(userWithoutEmail);
					missingUserInfoTest(userWithoutPassword);
					missingUserInfoTest(userWithoutUsername);

					done();
				});
			});
			// done
			describe("User login and auth", () => {
				it('responds with `isAuth: false` and a message if there is not matching account"', async (done) => {
					// Make a user object, but do not save it to the db
					const user = makeUser();

					await request(server)
						.post("/api/login")
						.send(user)
						.expect((res) => {
							if (res.body.isAuth !== false) {
								throw Error(
									"it did not prevent a nonexistent user from being authenticated"
								);
							}
							if (res.body.message !== "Login failed - account not found") {
								throw Error("it did not send the right message");
							}
						});

					done();
				});
				it('responds with `isAuth: false` and a message if the password for the account does not match"', async (done) => {
					const user = makeUser();

					await user.save();

					user.password = "WrongPassword";

					await request(server)
						.post("/api/login")
						.send(user)
						.expect((res) => {
							if (res.body.isAuth !== false) {
								throw Error(
									"it did not prevent a user from being authenticated with the wrong password"
								);
							}
							if (
								res.body.message !== "Login failed - password was incorrect"
							) {
								throw Error("it did not send the right message");
							}
						});

					await User.deleteOne({});
					done();
				});
				it("responds with `isAuth: true` if username and password are correct", async (done) => {
					let user = makeUser();

					await user.save();

					// Resetting the password to the non-encrypted version

					user.password = "Password";

					await request(server)
						.post("/api/login")
						.send(user)
						.expect((res) => {
							if (res.body.isAuth !== true) {
								throw Error("it prevented a user from being authenticated");
							}
						});

					await User.deleteOne({});
					done();
				});
			});
			// done
			describe("User logout", () => {
				it("logs out a logged in user without error", async (done) => {
					const agent = request.agent(server);
					let user = makeUser();

					await user.save();

					user.password = "Password";

					await agent
						.post("/api/login")
						.send(user)
						.expect((res) => {
							if (res.body.isAuth !== true) {
								throw Error("This test did not start properly");
							}
						});

					user = await User.findById(user._id);

					await agent
						.get("/api/logout")
						.send(user)
						.expect((res) => {
							if (res.body.success !== true) {
								throw Error("The user did not log out successfully");
							}
						});

					await User.deleteOne({});
					done();
				});
			});
			// done
			describe("User info retrieval", () => {
				// '/api/user' endpoint
				it("responds with a user`s information and success value when successful", async (done) => {
					let user = makeUser();
					const character1 = new Character({
						name: "Foo1",
						authorName: user.username,
						authorId: user._id,
						class: "druid",
						level: 1,
						short_description: "A bear",
						character_data: {
							something: {},
							somethingElse: []
						},
					});
					const character2 = new Character({
						name: "Foo2",
						authorName: user.username,
						authorId: user._id,
						class: "fighter",
						level: 2,
						short_description: "A pirate",
						character_data: {
							something: {},
							somethingElse: []
						},
					});
					const character3 = new Character({
						name: "Foo3",
						authorName: user.username,
						authorId: user._id,
						class: "rogue",
						level: 3,
						short_description: "A librarian",
						character_data: {
							something: {},
							somethingElse: []
						},
					});
					user.characters = [character1, character2, character3];

					const expectedUser = user;

					await user.save();

					// make a user information request by id
					await request(server)
						.get("/api/user")
						.send({
							_id: user._id
						})
						.expect((res) => {
							// Note: would have preferred to just compare the user objects,
							// 	but Mongo returns it's own object types that I couldn't
							// 	get Jest to be happy with despite toMatchObject presenting
							// 	expected and actual values looking the same. A more elegant
							//  solution is a todo, but this works.

							//that we get success: true
							expect(res.body.success).toBe(true);
							// that the username is correct
							expect(res.body.user.username).toBe(expectedUser.username);
							// that the id is correct
							expect(res.body.user._id).toBe(expectedUser._id.toString());
							// that the amount of characters is correct
							expect(res.body.user.characters.length).toBe(
								expectedUser.characters.length
							);
							// that each character has the right authorId value
							res.body.user.characters.forEach((character) => {
								expect(character.authorId).toBe(expectedUser._id.toString());
							});
							// that each character has the right authorName value
							res.body.user.characters.forEach((character) => {
								expect(character.authorName).toBe(expectedUser.username);
							});
							// that each character is one of those we made earlier
							res.body.user.characters.forEach((character, i) => {
								expect(character.name).toBe(`Foo${i + 1}`);
							});
						});

					await User.deleteOne({});
					done();
				});
				it("responds with a success value and a message when not successful", async (done) => {
					await request(server)
						.get("/api/user")
						.send({
							_id: "Wrong"
						})
						.expect((res) => {
							expect(res.body.success).toBe(false);
							expect(res.body.message).toBe(
								"Unfortunately, we couldn't find this user!"
							);
						});
					done();
				});
			});
			// done
			describe("User characters retrieval", () => {
				it("successfully retrieves the characters by authorId", async (done) => {
					let user = makeUser();
					const character1 = new Character({
						name: "Foo1",
						authorName: user.username,
						authorId: user._id,
						class: "druid",
						level: 1,
						short_description: "test",
						character_data: {
							something: {},
							somethingElse: []
						},
					});
					const character2 = new Character({
						name: "Foo2",
						authorName: user.username,
						authorId: user._id,
						class: "fighter",
						level: 2,
						short_description: "test",
						character_data: {
							something: {},
							somethingElse: []
						},
					});
					const character3 = new Character({
						name: "Foo3",
						authorName: user.username,
						authorId: user._id,
						class: "rogue",
						level: 3,
						short_description: "test",
						character_data: {
							something: {},
							somethingElse: []
						},
					});
					const someOtherUserCharacter1 = new Character({
						name: "Wrong",
						authorName: "Bar",
						authorId: "123456",
						class: "rogue",
						level: 3,
						short_description: "test",
						character_data: {
							something: {},
							somethingElse: []
						},
					});
					const someOtherUserCharacter2 = new Character({
						name: "Wrong",
						authorName: "BarFoo",
						authorId: "12345697865",
						class: "rogue",
						level: 3,
						short_description: "test",
						character_data: {
							something: {},
							somethingElse: []
						},
					});

					user.characters = [character1, character2, character3];

					await character1.save();
					await character2.save();
					await character3.save();
					await someOtherUserCharacter1.save();
					await someOtherUserCharacter2.save();
					await user.save();

					await request(server)
						.get("/api/characters_user_get")
						.send({
							authorId: user._id
						})
						.expect((res) => {
							// expect there to be a success value of true
							expect(res.body.success).toBe(true)

							// expect the right number of characters
							const actualCharacters = res.body.characters;

							expect(actualCharacters.length).toBe(user.characters.length);
							// expect the right characters
							actualCharacters.forEach((character, i) => {
								expect(character.name).toBe(`Foo${i+1}`)
							});
						});
					await User.deleteOne({});
					await Character.deleteMany({
						short_description: "test"
					});
					done();
				});

				it("responds correctly if no characters are found", async (done) => {



					await request(server)
						.get("/api/characters_user_get")
						.send({
							authorId: "WRONG"
						})
						.expect((res) => {
							const actual = res.body
							expect(actual).toEqual({
								success: true,
								message: `No characters found by requested author`
							})
						});

					await User.deleteOne({});

					done();
				});
			});
			//
			describe("User update", () => {});
			//
			describe("User deletion", () => {});
			//
			describe("Users list", () => {});
			//
			describe("Character saving", () => {});
			//
			describe("Character retrieval", () => {});
			//
			describe("Character author metadata retrieval", () => {});
			//
			describe("Character updating", () => {});
			//
			describe("Character deletion", () => {});
			//
		});
	});
});