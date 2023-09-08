import * as z from 'zod';

const invitationParticipantSchema = z.object({
  eventId: z.number().int().positive(),
  ids: z.union([z.number().int().positive(), z.array(z.number().int().positive())]),
});

export default invitationParticipantSchema;
