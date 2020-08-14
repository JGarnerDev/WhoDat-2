const mongoose = require("mongoose");

const characterSchema = mongoose.Schema(
	{
		name: { type: String, required: true, maxlength: 40 },
		authorName: { type: String, required: true },
		authorId: { type: String, required: true },
		class: { type: String, required: true },
		level: { type: Number, required: true, min: 1, max: 20 },
		short_description: { type: String, default: "n/a" },
		character_data: { type: {}, required: true },
	},
	{ timestamps: true }
);

const Character = mongoose.model("Character", characterSchema);

module.exports = { Character };
