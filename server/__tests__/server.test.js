var request = require("supertest"),
	app = require("../server"),
	mongoose = require("mongoose"),
	mongoDB = `mongodb+srv://${process.env.DBcharacter}:${process.env.DBPASS}@whodat.iydrs.mongodb.net/${process.env.CHARDB}?retryWrites=true&w=majority`,
	{ Character } = require("../models/character"),
	{ User } = require("../models/user");

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

describe("App (server) test", () => {
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
		describe("Validation failures", () => {
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
			describe("User Login", () => {
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
							console.log("AAAAAAAA", res.cookie);
							if (res.body.isAuth !== true) {
								throw Error("it prevented a user from being authenticated");
							}
						});

					await User.deleteOne({});
					done();
				});
			});
			describe("User Update", () => {});
		});
	});
});
