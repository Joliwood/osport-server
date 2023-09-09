import express from 'express';
import messageController from '../controllers/message.controller.js';
import factory from '../middleware/factory.controller.js';
import validateSchema from '../middleware/schemas.validator.js';
import createMessage from '../schemas/message/createMessage.js';
import updateMessage from '../schemas/message/updateMessage.js';
// import getCache from '../middleware/cache.js';
import canals from '../helpers/canals.js';

const router = express.Router();

const {
  getHistoric, create, update, destroyOne, destroyMany,
} = messageController;

router.route('/')
  .post(validateSchema(createMessage, canals.body), factory(create))
  .patch(validateSchema(updateMessage, canals.body), factory(update));

router.route('/:id')
  .delete(factory(destroyOne));

router.route('/event/:id')
  .get(/* getCache('chat'), */ factory(getHistoric))
  .delete(factory(destroyMany));

export default router;
