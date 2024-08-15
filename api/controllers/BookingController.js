const express = require('express');
const app = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

app.get('/list', async (req, res) => {
  try {
    const bookings = await prisma.reservation.findMany({
      include: {
        Room: true,
        User: true,
      },
    });
    res.send({ result: bookings });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

app.post('/save', async (req, res) => {
  try {
    const booking = await prisma.reservation.create({
      data: {
        userId: req.body.userId,
        date: req.body.createdAt,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        customerName: req.body.customerName,
        customerEmail: req.body.customerEmail,
        customerPhone: req.body.customerPhone,
        dateStart: req.body.dateStart,
        dateEnd: req.body.dateEnd,
        duration: req.body.duration,
        status: req.body.status,
        createdAt: req.body.createdAt,
      }
    }
    );

    for (let i = 0; i < req.body.boardgames.length; i++) {
      const rowBoardGame = await prisma.boardGame.findFirst({
        where: {
          id: req.body.boardgames[i].id,
        },
      });

      const boardgame_reservation_detail = await prisma.boardGame_Reservation_Detail.create({
        data: {
          date: req.body.date,
          reservation: {
            connect: {
              id: booking.id,
            },
          },
          boardGame: {
            connect: {
              id: req.body.boardgames[i].id,
            }
          },
          price: rowBoardGame.price,

        },
      });
    }

    for (let i = 0; i < req.body.rooms.length; i++) {
      const rowRoom = await prisma.room.findFirst({
        where: {
          id: req.body.rooms[i].id,
        },
      });

      const room_reservation_detail = await prisma.room_Reservation_Detail.create({
        data: {
          date: req.body.date,
          reservation: {
            connect: {
              id: booking.id,
            },
          },
          room: {
            connect: {
              id: req.body.rooms[i].id,
            }
          },
          price: rowRoom.price,
        },
      });
    }

    res.send({ result: booking });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
}
);


module.exports = app;
