const mongoose = require("mongoose");

const attacksSchema = new mongoose.Schema({
  name: { type: String, required: true },
  power: { type: Number, required: true },
});

const pokemonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  energy: { type: Number, required: true },
  attack: { type: Number, required: true },
  defense: { type: Number, required: true },
  attacks: { type: [attacksSchema], required: true },
  type: { type: String, required: true },
  image: {data: Buffer, contentType: String},
});

module.exports = mongoose.model("pokemon", pokemonSchema);
