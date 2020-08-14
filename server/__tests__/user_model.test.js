var request = require("supertest"),
	app = require("../server"),
	mongoose = require("mongoose"),
	mongoDB = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@whodat.iydrs.mongodb.net/${process.env.CHARDB}?retryWrites=true&w=majority`,
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
		name: "Richard",
		lastname: "Tricky",
	});
}

describe("User Model", () => {
	beforeAll(async (done) => {
		await User.deleteOne({});
		done();
	});
	afterEach(async (done) => {
		await User.deleteOne({});

		done();
	});
	afterAll(async (done) => {
		await mongoose.connection.close();
		done();
	});
	it(" has a module", () => {
		expect(User).toBeDefined();
	});

	it("should have an encrypted password", async () => {
		// Make a new user object
		const user = makeUser();
		// retain some user information
		const name = user.name;
		// Save to database, which calls schema encryption methods for user.password
		await user.save();
		// Retrieve the same user object
		const retrievedUser = await User.findOne({ name: name });
		// Compare passwords
		expect(retrievedUser.password).not.toBe("Password");
	});

	it("can be found in database by property", async (done) => {
		// Make a new user object
		const user = makeUser();
		// retain some user information
		const name = user.name;
		// Save the user object to the database
		await user.save();
		// Attempt finding the user by retained information
		const foundUser = await User.findOne({ name: name });
		const expected = name;
		const actual = foundUser.name;
		expect(actual).toEqual(expected);
		done();
	});

	it("can be saved to database", async (done) => {
		// Make a new user object
		const user = makeUser();
		// retain some user information
		const name = user.name;
		// Save the user object to the database
		const savedUser = await user.save();

		const expected = name;
		const actual = savedUser.name;
		expect(actual).toEqual(expected);
		done();
	});
	it("can be updated", async (done) => {
		// Make a new user object
		const user = makeUser();
		// Save the user object to the database
		await user.save();
		// Alter the user name
		user.name = "foo";
		// Save the updated user
		const updatedUser = await user.save();
		const currentName = updatedUser.name;
		expect(currentName).toEqual("foo");
		done();
	});
	it("can be found and deleted", async (done) => {
		// Make a new user object
		const user = makeUser();
		const id = user._id;
		// Save the user object to the database
		await user.save();
		// Attempt finding and removing user by id
		user.deleteOne({ _id: id });
		// Check if user remains
		const result = await User.findOne({ _id: id });

		expect(result).toEqual(null);

		done();
	});
});
