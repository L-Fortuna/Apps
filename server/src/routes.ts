import express, { request } from 'express';
import PointsController from './controllers/PointsController';
import TypesController from './controllers/TypesController';

const routes = express.Router();
const pointsController = new PointsController;
const typesController = new TypesController



routes.get('/types', typesController.index);
routes.get('/points/', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post('/points', pointsController.create);

  export default routes;