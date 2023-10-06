import express, { Router } from 'express';
import authController from '../controllers/auth.controllers.js';
import factory from '../middleware/factory.controller.js';
import validateToken from '../middleware/validate.token.js';
import validateSchema from '../middleware/schemas.validator.js';
import createUserSchema from '../schemas/auth/createUser.js';
import loginUserSchema from '../schemas/auth/loginUser.js';
import canals from '../helpers/canals.js';

const router: Router = express.Router();

const {
  register,
  signin,
  validate,
  logout,
} = authController;

router.route('/signup')
  .post(validateSchema(createUserSchema, canals.body), factory(register));

router.route('/signin')
  .post(validateSchema(loginUserSchema, canals.body), factory(signin));

router.route('/user/validate')
  .get(validateToken, factory(validate));

router.route('/logout')
  .post(logout);

export default router;
