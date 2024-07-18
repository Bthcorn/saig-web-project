const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const userController = require('./controllers/UserController');
const gameController = require('./controllers/GameController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/user', userController);
app.use('/game', gameController);

app.listen(3001, () => {
  console.log('Express server is running on localhost:3001');
}); 