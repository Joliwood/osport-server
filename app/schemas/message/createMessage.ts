import * as z from 'zod';

export const createMessageSchema = z.object({
  user_id: z.number().min(1),
  event_id: z.number().min(1),
  message: z.string().min(1).max(255),
});

export default createMessageSchema;
