let mongoose = require("mongoose");
const mongoDB = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@whodat.iydrs.mongodb.net/${process.env.CHARDB}?retryWrites=true&w=majority`;
const { User } = require("../models/user");

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

function makeUser() {
	return new User({
		email: "hello@hotmail.com",
		password: "Password",
		username: "Foo",
		characters: [],
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
	it("has a module", () => {
		expect(User).toBeDefined();
	});

	describe("With valid information ", () => {
		it("should have an encrypted password", async () => {
			// Make a new user object
			const user = makeUser();
			// retain some user information
			const username = user.username;

			// Save to database, which calls schema encryption methods for user.password
			await user.save();
			// Retrieve the same user object
			const retrievedUser = await User.findOne({ username: username });
			// Compare passwords
			expect(retrievedUser.password).not.toBe("Password");
		});

		it("can be found in database by property", async (done) => {
			// Make a new user object
			const user = makeUser();
			// retain some user information
			const username = user.username;
			// Save the user object to the database
			await user.save();
			// Attempt finding the user by retained information
			const foundUser = await User.findOne({ username: username });
			const expected = username;
			const actual = foundUser.username;
			expect(actual).toEqual(expected);
			done();
		});

		it("can be saved to database", async (done) => {
			// Make a new user object
			const user = makeUser();
			// retain some user information
			const username = user.username;
			// Save the user object to the database
			const savedUser = await user.save();

			const expected = username;
			const actual = savedUser.username;
			expect(actual).toEqual(expected);
			done();
		});

		it("can be updated", async (done) => {
			// Make a new user object
			const user = makeUser();
			// Save the user object to the database
			await user.save();
			// Alter the user name
			user.username = "foo";
			// Save the updated user
			const updatedUser = await user.save();
			const currentUsername = updatedUser.username;
			expect(currentUsername).toEqual("foo");
			done();
		});
		it("can be found and deleted", async (done) => {
			// Make a new user object
			const user = makeUser();
			const _id = user._id;
			// Save the user object to the database
			await user.save();
			// Attempt finding and removing user by id
			await user.deleteOne({ _id: _id });
			// Check if user remains
			const result = await User.findOne({ _id: _id });

			expect(result).toEqual(null);

			done();
		});
	});
});
