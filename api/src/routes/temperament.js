const express = require('express');
const temperamentRouter = express.Router();
const getTemperamentsHandler = require('../handlers/temperamentsHandler')

temperamentRouter.get('/', getTemperamentsHandler);

module.exports = temperamentRouter;