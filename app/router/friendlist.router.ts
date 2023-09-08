import express, { Router } from 'express';
import friendlist from '../controllers/friendlist.controller.js';
import factory from '../middleware/factory.controller.js';
import validateSchema from '../middleware/schemas.validator.js';
import requestSchema from '../schemas/friendship/friendRequest.js';
import canals from '../helpers/canals.js';

const router: Router = express.Router();

const {
  getPendingRequestSent,
  getPendingRequestReceived,
  getAcceptedFriends,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  addFriend,
} = friendlist;

router.route('/sent/:id')
  .get(factory(getPendingRequestSent));

router.route('/accepted/:id')
  .get(factory(getAcceptedFriends));

router.route('/pending/:id')
  .get(factory(getPendingRequestReceived));

router.route('/send')
  .post(validateSchema(requestSchema, canals.body), factory(sendFriendRequest));

router.route('/add').post(factory(addFriend));

router.route('/accept')
  .patch(validateSchema(requestSchema, canals.body), factory(acceptFriendRequest));

router.route('/reject')
  .patch(validateSchema(requestSchema, canals.body), factory(rejectFriendRequest));

export default router;
