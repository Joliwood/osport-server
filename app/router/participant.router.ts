import express, { Router } from 'express';
import participantController from '../controllers/participant.controller.js';
import factory from '../middleware/factory.controller.js';
import validateSchema from '../middleware/schemas.validator.js';
import canals from '../helpers/canals.js';
import invitationParticipantSchema from '../schemas/participant/invitationParticipant.js';
import updateParticipantSchema from '../schemas/participant/updateParticipant.js';

const router: Router = express.Router();

const {
  getParticipants,
  sendInvitation,
  updateStatus,
} = participantController;

router.route('/:id')
  .get(factory(getParticipants));

router.route('/')
  .post(validateSchema(invitationParticipantSchema, canals.body), factory(sendInvitation))
  .patch(validateSchema(updateParticipantSchema, canals.body), factory(updateStatus));

export default router;
