import { Request, Response } from 'express';
import UserOnEvent from '../models/user_on_event.js';
import Event from '../models/event.js';
import checkParams from '../utils/checkParams.js';
import { generateBalancedTeam } from '../service/generateTeam.js';
import UserInputError from '../helpers/errors/userInput.error.js';
import prisma from '../helpers/db.client.js';

export default {
  getParticipants: async (req: Request, res: Response) => {
    const id = checkParams(req.params.id);

    const participants = await UserOnEvent.find(id);

    res.status(200).json({ message: 'Participant retrieved succesfully', data: participants });
  },

  sendInvitation: async (req: Request, res: Response) => {
    const { eventId: event_id, ids } = req.body;

    await UserOnEvent.createMany(event_id, ids);

    res.status(201).json({ message: 'Invitation sent' });
  },

  updateStatus: async (req: Request, res: Response) => {
    const { eventId, userId: user_id, status } = req.body;

    if (status === 'rejected') {
      await UserOnEvent.update(user_id, eventId, status);
      return res.status(204).json({ message: 'status updated' });
    }

    const participants = await UserOnEvent.findConfirmed(eventId);

    const event = await Event.findOne({ eventId });

    if (event?.nb_max_participant === participants) {
      throw new UserInputError('Event is full');
    }
    await UserOnEvent.update(user_id, eventId, status);

    if (event?.nb_max_participant === participants + 1) {
      await generateBalancedTeam(eventId);
      await prisma.event.update({
        where: {
          id: eventId,
        },
        data: {
          status: 'closed',
        },
      });
    }

    return res.status(200).json({ message: 'status updated' });
  },
};
