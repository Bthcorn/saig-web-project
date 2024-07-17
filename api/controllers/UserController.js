const express = require('express');
const app = express.Router();
const { PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken'); 
const dotenv = require('dotenv');

dotenv.config();



module.exports = app;
