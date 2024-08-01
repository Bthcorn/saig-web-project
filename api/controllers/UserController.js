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

app.post('/signin', async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).send({ error: 'Invalid email or password' });
        }

        const user = await prisma.user.findFirst({
            where: {
                username: req.body.username,
                password: req.body.password,
                status: 'ACTIVE',
            },
            select: {
                id: true,
                name: true,
                role: true,
            }
        });

        if (user != null) {
            const secret = process.env.TOKEN_SECRET;
            const token = jwt.sign(user, secret, { expiresIn: '1d' });
            return res.send({ token: token, user: user });
        } else {
            console.log('User not found');
        }
        res.status(401).send({ error: 'Unauthorized' });

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = app;
