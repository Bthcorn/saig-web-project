const express = require('express');
const app = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { stat } = require('fs');

dotenv.config();

app.get('/list', async (req, res) => {
  try {
    const rooms = await prisma.room.findMany({});
    res.send({ result: rooms });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});


app.post('/create', async (req, res) => {
  try {
    const room = await prisma.room.create({
      data: req.body,
    });
    res.send({ message: 'Room created', result: room });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.get('/:id', async (req, res) => {
  try {
    const room = await prisma.room.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.send({ result: room });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

app.put('/update/:id', async (req, res) => {
  try {
    const room = await prisma.room.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        status: req.body.status,
        table: parseInt(req.body.table),
        capacity: parseInt(req.body.capacity),
        price: parseInt(req.body.price),
      },
    });
    res.send({ message: 'Room updated', result: room });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});


module.exports = app;