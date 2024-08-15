const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


const userController = require('./controllers/UserController');
const gameController = require('./controllers/GameController');
const roomController = require('./controllers/RoomController');
const bookingController = require('./controllers/BookingController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use('/user', userController);
app.use('/game', gameController);
app.use('/room', roomController);
app.use('/booking', bookingController);

app.listen(3001, () => {
  console.log('Express server is running on localhost:3001');
}); 