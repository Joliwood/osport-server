import * as z from 'zod';

const updateUserSchema = z.object({
  email: z.string().email({ message: 'This is not an valid email' }),
  username: z.string().min(2, { message: 'Must be at least 2 characters long' }).max(36),
});

export default updateUserSchema;
