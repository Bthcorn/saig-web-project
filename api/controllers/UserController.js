const express = require('express');
const app = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

app.get('/list', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            where: {
                // status: 'ACTIVE',
                role: 'GUEST',
            },
        });
        res.send({ result: users });
    }
    catch (error) {
        res.status(404).send({ error: error.message });
    }
});

app.post('/create', async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                role: 'GUEST',
                status: 'ACTIVE',
            },
        });

        if (user != null) {
            const secret = process.env.TOKEN_SECRET;
            const token = jwt.sign(user, secret, { expiresIn: '1d' });
            return res.send({ token: token, user: user });
        }
        res.status(400).send({ error: 'User not created' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.post('/update', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        const user = await prisma.user.update({
            where: {
                id: decoded.id,
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
            },
        });
        res.send({ message: 'User updated successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
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

app.get('/admin/check', async (req, res) => {
    try {
        const token = req.headers.authorization;
        console.log(token);
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        if (decoded.role === 'ADMIN') {
            return res.send({ message: 'Authorized' });
        }
        res.status(401).send({ error: 'Unauthorized' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get('/info', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                username: true,
                role: true,
            },
        });
        res.send({ user: user });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = app;
