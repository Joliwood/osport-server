import * as z from 'zod';

const friendRequestSchema = z.object({
  userId: z.number().int().positive(),
  friendId: z.number().int().positive(),
});

export default friendRequestSchema;
