require('dotenv').config();
const cors = require('cors');

const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(cors({
    origin: '*'
}));

mongoose.connect(process.env.DATABASE_URL, {});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

app.use(express.json());

const pokemonsRouter = require('./routes/pokemon');
app.use('/pokemon', pokemonsRouter);

app.listen(process.env.PORT, () => console.log('Server Started'));