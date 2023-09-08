import * as z from 'zod';

const updateParticipantSchema = z.object({
  eventId: z.number().int().positive(),
  userId: z.number().int().positive(),
  status: z.enum(['accepted', 'rejected']),
});

export default updateParticipantSchema;
