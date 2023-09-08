import * as z from 'zod';

const createRating = z.object({
  rating: z.enum(['advanced',
    'intermediate',
    'beginner',
    'Advanced',
    'Intermediate',
    'Beginner']),
  user_id: z.number().int(),
  sport_id: z.number().int(),
});

export default createRating;
