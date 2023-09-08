import * as z from 'zod';

export const updateMessageSchema = z.object({
  id: z.number().min(1),
  user_id: z.number().min(1),
  event_id: z.number().min(1),
  message: z.string().min(1).max(255),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export default updateMessageSchema;
