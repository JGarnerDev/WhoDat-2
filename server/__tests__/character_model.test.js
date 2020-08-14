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

function makeCharacter() {
	return new Character({
		name: "Bob the Brave",
		authorName: "character1",
		authorId: "xxxxx",
		class: "Bard",
		level: 1,

		character_data: {},
	});
}

describe("Character Model", () => {
	beforeAll(async (done) => {
		await Character.deleteOne({});
		done();
	});
	afterEach(async (done) => {
		await Character.deleteOne({});

		done();
	});
	afterAll(async (done) => {
		await mongoose.connection.close();
		done();
	});
	it("has a module", () => {
		expect(Character).toBeDefined();
	});

	it("can be found in database by property", async (done) => {
		// Make a new character object
		const character = makeCharacter();
		// retain some character information
		const name = character.name;
		// Save the character object to the database
		await character.save();
		// Attempt finding the character by retained information
		const foundCharacter = await Character.findOne({ name: name });
		const expected = name;
		const actual = foundCharacter.name;
		expect(actual).toEqual(expected);
		done();
	});
	it("can be saved to database", async (done) => {
		// Make a new character object
		const character = makeCharacter();
		// retain some character information
		const name = character.name;
		// Save the character object to the database
		const savedCharacter = await character.save();

		const expected = name;
		const actual = savedCharacter.name;
		expect(actual).toEqual(expected);
		done();
	});
	it("can be updated", async (done) => {
		// Make a new character object
		const character = makeCharacter();

		// Save the character object to the database
		await character.save();
		// Alter the character name
		character.name = "foo";
		// Save the updated character
		const updatedCharacter = await character.save();
		const currentName = updatedCharacter.name;
		expect(currentName).toEqual("foo");
		done();
	});
	it("can be found and deleted", async (done) => {
		// make a new character object
		const character = makeCharacter();
		// retain it's id
		const id = character._id;
		// save character to db
		await character.save();
		// find it by retained id
		const foundCharacter = await Character.findById(id);
		// confirming that exists
		expect(foundCharacter._id).toEqual(id);
		// attempt deletion
		await Character.findByIdAndDelete(id);
		// confirm that it doesn't exist
		const actual = await Character.findById(id);
		expect(actual).toBeNull();
		done();
	});
});
