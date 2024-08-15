const express = require('express');
const app = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

app.get('/get/:reservationid', async (req, res) => {
  try {
    const booking = await prisma.reservation.findFirst({
      where: {
        id: req.params.reservationid,
      },
    });
    res.send({ result: booking });
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

      //need to check if the boardgame is available and update the status to unavailable

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
      //need to check if the room is available and update the status to unavailable

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

//get booking by user id
app.get('/list', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const bookings = await prisma.reservation.findMany({
      where: {
        userId: decoded.id,
      },
      include: {
        Room_Reservation_Detail: true,
        BoardGame_Reservation_Detail: true,
      },
    });
    res.send({ result: bookings });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

app.post('/update/:reservationid', async (req, res) => {
  try {
    const booking = await prisma.reservation.update({
      where: {
        id: req.params.reservationid,
      },
      data: {
        status: req.body.status,
      },
    });
    res.send({ result: booking });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

//get booking by booking id
app.get('/list/boardgames/:reservationid', async (req, res) => {
  try {
    const bookings = await prisma.boardGame_Reservation_Detail.findMany({
      where: {
        reservationId: req.params.reservationid,
      },
    });
    res.send({ result: bookings });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

app.post('/update/boardgame/approve/:reservationid', async (req, res) => {
  try {
    const bookings = await prisma.boardGame_Reservation_Detail.updateMany({
      where: {
        reservationId: req.params.reservationid,
      },
      data: {
        status: 'APPROVED',
      },
    });
    res.send({ result: bookings });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

app.post('/update/boardgame/cancel/:reservationid', async (req, res) => {
  try {
    const bookings = await prisma.boardGame_Reservation_Detail.updateMany({
      where: {
        reservationId: req.params.reservationid,
      },
      data: {
        status: 'CANCELLED',
      },
    });
    res.send({ result: bookings });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

//get booking by booking id
app.post('/list/rooms/:reservationid', async (req, res) => {
  try {
    const bookings = await prisma.room_Reservation_Detail.findMany({
      where: {
        reservationId: req.params.reservationid,
      },
    });
    res.send({ result: bookings });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

app.post('/update/room/approve/:reservationid', async (req, res) => {
  try {
    const bookings = await prisma.room_Reservation_Detail.updateMany({
      where: {
        reservationId: req.params.reservationid,
      },
      data: {
        status: 'APPROVED',
      },
    });
    res.send({ result: bookings });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

app.get('/update/room/cancel/:reservationid', async (req, res) => {
  try {
    const bookings = await prisma.room_Reservation_Detail.updateMany({
      where: {
        reservationId: req.params.reservationid,
      },
      data: {
        status: 'CANCELLED',
      },
    });
    res.send({ result: bookings });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});



module.exports = app;
