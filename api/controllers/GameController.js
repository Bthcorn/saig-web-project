const express = require('express');
const app = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

app.get('/list', async (req, res) => {
    const games = await prisma.boardGame.findMany({});
    res.send(games);
});

app.get('/category/list', async (req, res) => {
    const categories = await prisma.boardGame_Category.findMany({
        include: {
            boardGames: true,
        },
    });
    res.send(categories);
});

app.post('/create', async (req, res) => {
    // const { name, description, price, image } = req.body;
    const game = await prisma.game.create({
        data: {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            category: {
                connect: {
                    id: req.body.categoryId,
                },
            },

        },
    });
    res.send(game);
});

app.post('/category/create', async (req, res) => {
    const category = await prisma.boardGame_Category.create({
        data: {
            name: req.body.name,
        },
    });

    res.send(category);
});

module.exports = app;