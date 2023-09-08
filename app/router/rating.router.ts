import express, { Router } from 'express';
import ratingController from '../controllers/rating.controller.js';
import factory from '../middleware/factory.controller.js';
import validateSchema from '../middleware/schemas.validator.js';
import createRatingSchema from '../schemas/rating/createRating.js';
import updateRatingSchema from '../schemas/rating/updateRating.js';
// import getCache from '../middleware/cache.js';
import canals from '../helpers/canals.js';

const router: Router = express.Router();

const {
  rate,
  updateRating,
  getStartRating,
  getSports,
} = ratingController;

router.route('/user/sport')
  .post(validateSchema(createRatingSchema, canals.body), factory(rate))
  .patch(validateSchema(updateRatingSchema, canals.body), factory(updateRating));

router.route('/user/sport/:id')
  .get(/* getCache('sport'),   */ factory(getSports));

router.route('/user/own_rating/:id')
  .get(/* getCache('own_rating'), */ factory(getStartRating));

export default router;
