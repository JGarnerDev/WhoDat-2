var request = require("supertest"),
	app = require("../server"),
	mongoose = require("mongoose"),
	mongoDB = `mongodb+srv://${process.env.DBcharacter}:${process.env.DBPASS}@whodat.iydrs.mongodb.net/${process.env.CHARDB}?retryWrites=true&w=majority`,
	{ Character } = require("../models/character");

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Tests here are to simply confirm if the routes respond with 200 codes
// For intergration tests that expect routes to perform their logic, see model tests.

describe("App (server) test", () => {
	it("has a module", () => {
		expect(app).toBeDefined();
	});

	let server;

	beforeAll(() => {
		server = app.listen(5001);
	});

	afterAll((done) => {
		mongoose.connection.close();
		server.close(done());
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
	});
});
