import express, { Router } from 'express';
import userController from '../controllers/user.controller.js';
import ratingController from '../controllers/rating.controller.js';
import factory from '../middleware/factory.controller.js';
import upload from '../service/upload.js';
import validateUser from '../middleware/validate.user.js';
import updateUserSchema from '../schemas/user/updateUser.js';
import validateSchema from '../middleware/schemas.validator.js';
import createRatingSchema from '../schemas/rating/createRating.js';
import updateRatingSchema from '../schemas/rating/updateRating.js';
import canals from '../helpers/canals.js';
// import getCache from '../middleware/cache.js';

const router: Router = express.Router();

// All methods listed in the controller
const {
  getUser,
  updateImage,
  deleteUser,
  updateUser,
} = userController;

const {
  rate,
  updateRating,
  getStartRating,
  getSports,
} = ratingController;

// User controller behind
router.route('/:id')
  .get(/* getCache('user'), */ factory(getUser))
  .delete(validateUser, factory(deleteUser));

router.route('/')
  .patch(validateUser, validateSchema(updateUserSchema, canals.body), factory(updateUser));

router.route('/image')
  .patch(upload.single('image'), factory(updateImage));

// Rating controller behind
router.route('/sport')
  .post(validateSchema(createRatingSchema, canals.body), factory(rate))
  .patch(validateSchema(updateRatingSchema, canals.body), factory(updateRating));

router.route('/sport/:id')
  .get(/* getCache('sport'),   */ factory(getSports));

router.route('/own_rating/:id')
  .get(/* getCache('own_rating'), */ factory(getStartRating));

export default router;
