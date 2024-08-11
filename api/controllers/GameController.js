const express = require('express');
const app = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { stat } = require('fs');

dotenv.config();

app.get('/list', async (req, res) => {
    const result = await prisma.boardGame.findMany({});
    res.send({ result: result });
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
    try {
        const game = await prisma.boardGame.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                image: req.body.image,
                minPlayers: parseInt(req.body.minPlayers),
                maxPlayers: parseInt(req.body.maxPlayers),
                difficulty: parseInt(req.body.difficulty),
                duration: parseInt(req.body.duration),
                price: parseInt(req.body.price),
                status: req.body.status,
                BoardGame_Category: {
                    connect: {
                        id: req.body.boardGame_CategoryId,
                    },
                },
            },

        });
        res.send(game);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.post('/category/create', async (req, res) => {
    const category = await prisma.boardGame_Category.create({
        data: {
            name: req.body.name,
        },
    });

    res.send(category);
});

app.get('/boardgame/:id', async (req, res) => {
    try {
        const boardGame = await prisma.boardGame.findFirst({
            where: {
                id: req.params.id,
            },
        });
        res.send({ result: boardGame });
    } catch (error) {
        res.status(404).send({ error: 'Board game not found' });
    }
});

app.put('/boardgame/update/:id', async (req, res) => {
    try {
        const boardGame = await prisma.boardGame.update({
            where: {
                id: req.params.id,
            },
            data: {
                name: req.body.name,
                description: req.body.description,
                image: req.body.image,
                minPlayers: parseInt(req.body.minPlayers),
                maxPlayers: parseInt(req.body.maxPlayers),
                difficulty: parseInt(req.body.difficulty),
                duration: parseInt(req.body.duration),
                price: parseInt(req.body.price),
                status: req.body.status,
                BoardGame_Category: {
                    connect: {
                        id: req.body.boardGame_CategoryId,
                    },
                },
            },
        });
        res.send({ result: boardGame });
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
});

module.exports = app;