import * as z from 'zod';

const createEventSchema = z.object({
  userId: z.number(),
  eventDate: z.string(),
  location: z.string(),
  duration: z.number(),
  nbMaxParticipant: z.number(),
  sportId: z.number(),
});

export default createEventSchema;
