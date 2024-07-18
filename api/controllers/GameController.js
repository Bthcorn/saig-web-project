const express = require('express');
const app = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

app.get('/list', async (req, res) => {
    const games = await prisma.boardGame.findMany();
    res.send(games);
});

// app.post('/create', async (req, res) => {
//     // const { name, description, price, image } = req.body;
//     const game = await prisma.game.create({
//         data: {
//             name: req.body.name,
//             description: req.body.description,
//             image: req.body.image,
//             minPlayers: req.body.minPlayers,
//             maxPlayers: req.body.maxPlayers,
//             minAge: req.body.minAge,
//             duration: req.body.duration,
//             complexity: req.body.complexity,
//             price: req.body.price,
//             categories: 

//         },
//     });
//     res.send(game);
// });

app.post('/create/category', async (req, res) => {
    const category = await prisma.boardGame_Category.create({
        data: {
            name: req.body.name,
        },
    });
    res.send(category);
});

module.exports = app;