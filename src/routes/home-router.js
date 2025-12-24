const { Router } = require('express');
const homeController = require('../controllers/home-controller');

const homeRouter = Router();

homeRouter.get('/', homeController.homePageGet);
homeRouter.get('/show', homeController.homePageGenreGet);

module.exports = homeRouter;