import * as z from 'zod';

const loginSchema = z.object({
  username: z.string().min(2, { message: 'Must be at least 2 characters long' }).max(36),
  password: z.string(),
});

export default loginSchema;
