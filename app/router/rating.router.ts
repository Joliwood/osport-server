import express, { Router } from 'express';
import ratingController from '../controllers/rating.controller.js';
import factory from '../middleware/factory.controller.js';
import validateSchema from '../middleware/schemas.validator.js';
import createOwnRatingSchema from '../schemas/rating/createOwnRating.js';
import createRatingSchema from '../schemas/rating/createRating.js';
import canals from '../helpers/canals.js';
// import getCache from '../middleware/cache.js';

const router: Router = express.Router();

const {
  rate,
  ownRate,
  getOwnRating,
  getSports,
} = ratingController;

// Return all sports rating of the user (globalaly calculated)
router.route('/sport/:id')
  .get(/* getCache('sport'), */ factory(getSports));

// Only at the end of the event, user rate an other one
router.route('/sport')
  .post(validateSchema(createRatingSchema, canals.body), factory(rate));

router.route('/own_rating/:id')
  // Return all sport rating estimations of the user
  .get(/* getCache('own_rating'), */ factory(getOwnRating));

router.route('/own_rating')
  // Create own rating, only once for each sport
  .post(validateSchema(createOwnRatingSchema, canals.body), factory(ownRate));

export default router;
