const express = require('express');
const app = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { stat } = require('fs');

dotenv.config();

app.get('/boardgame/list', async (req, res) => {
    try {
        const boardGames = await prisma.boardGame.findMany({
            include: {
                BoardGame_Category: true,
            },
        });
        res.send({ result: boardGames });
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
});

app.get('/category/list', async (req, res) => {
    try {
        const categories = await prisma.boardGame_Category.findMany({});
        res.send({ result: categories });
    }
    catch (error) {
        res.status(404).send({ error: error.message });
    }
});

app.post('/boardgame/create', async (req, res) => {
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
                        id: req.body.boardGame_CategoryId ?? "66b908ea4fbe78d6b2e2f66a", // Default None Category
                    },
                },
            },

        });
        res.send({ message: 'Game created', result: game });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.post('/category/create', async (req, res) => {
    try {
        const category = await prisma.boardGame_Category.create({
            data: {
                name: req.body.name,
            },
        });
        res.send({ result: category });
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
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

app.get('/category/:id', async (req, res) => {
    try {
        const category = await prisma.boardGame_Category.findFirst({
            where: {
                id: req.params.id,
            },
        });
        res.send({ result: category });
    } catch (error) {
        res.status(404).send({ error: 'Category not found' });
    }
});

app.put('/category/update/:id', async (req, res) => {
    try {
        const category = await prisma.boardGame_Category.update({
            where: {
                id: req.params.id,
            },
            data: {
                name: req.body.name,
            },
        });
        res.send({ result: category, message: 'Category updated' });
    } catch (error) {
        res.status(404).send({ error: error.message });
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
                        id: req.body.boardGame_CategoryId ?? "66b908ea4fbe78d6b2e2f66a",
                    },
                },
            },
        });
        res.send({ result: boardGame, message: 'Game updated' });
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
});

module.exports = app;