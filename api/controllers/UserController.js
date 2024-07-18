const express = require('express');
const app = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken'); 
const dotenv = require('dotenv');

dotenv.config();

app.get('/', async (req, res) => {
    const users = await prisma.user.findMany({
        include: {
            Post: true,
        },
    });
    res.send(users);
});

app.post('/create', async (req, res) => {
    const user = await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        },
    });
    res.send(user);
});


module.exports = app;
