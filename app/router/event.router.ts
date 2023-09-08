import express, { Router } from 'express';
import eventController from '../controllers/event.controller.js';
import factory from '../middleware/factory.controller.js';
import validateSchema from '../middleware/schemas.validator.js';
import createEventSchema from '../schemas/event/createEvent.js';
import { updateEventSchema } from '../schemas/event/updateEvent.js';
import { validateEventSchema } from '../schemas/event/validateEvent.js';
// import getCache from '../middleware/cache.js';
import canals from '../helpers/canals.js';
import validateUser from '../middleware/validate.user.js';

const router: Router = express.Router();

const {
  createEvent,
  validateEvent,
  updateEvent,
  getEvents,
  getEventDetails,
  resultsEvent,
} = eventController;

router.route('/')
  .post(validateSchema(createEventSchema, canals.body), factory(createEvent))
  .patch(validateUser, validateSchema(updateEventSchema, canals.body), factory(updateEvent));

router.route('/details/:id')
  .get(factory(getEventDetails));

router.route('/validate')
  .patch(validateSchema(validateEventSchema, canals.body), factory(validateEvent));

router.route('/results')
  .patch(validateSchema(updateEventSchema, canals.body), factory(resultsEvent));

router.route('/:id')
  .get(/* getCache('event'), */ factory(getEvents));

export default router;
