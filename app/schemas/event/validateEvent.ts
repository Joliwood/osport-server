import * as z from 'zod';

export const validateEventSchema = z.object({
  userId: z.number(),
  eventId: z.number(),
});

export default validateEventSchema;
