const express = require("express");
const router = express.Router();
const Pokemon = require("../models/pokemon");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Getting all
router.get("/", async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    res.json(pokemons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Creating one
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newPokemon = new Pokemon({
      name: req.body.name,
      energy: req.body.energy,
      attack: req.body.attack,
      defense: req.body.defense,
      attacks: JSON.parse(req.body.attacks),
      type: req.body.type,
      image: { data: req.file.buffer, contentType: req.file.mimetype },
    });

    await newPokemon.save();
    res.status(201).json(newPokemon);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
