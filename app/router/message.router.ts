import express from 'express';
import messageController from '../controllers/message.controller.js';
import factory from '../middleware/factory.controller.js';
import validateSchema from '../middleware/schemas.validator.js';
import createMessage from '../schemas/message/createMessage.js';
import updateMessage from '../schemas/message/updateMessage.js';
import canals from '../helpers/canals.js';

const router = express.Router();

const {
  getHistoric, create, update, destroyOne, destroyMany,
} = messageController;

router.route('/')
  .post(validateSchema(createMessage, canals.body), factory(create))
  // We don't have this functionnality on the website
  .patch(validateSchema(updateMessage, canals.body), factory(update));

router.route('/:id')
  // We don't have neither this one
  .delete(factory(destroyOne));

router.route('/event/:id')
  .get(factory(getHistoric))
  // Delete many messages ?
  .delete(factory(destroyMany));

export default router;
