import * as z from 'zod';

const createOwnRating = z.object({
  rating: z.enum(['advanced',
    'intermediate',
    'beginner',
    'Advanced',
    'Intermediate',
    'Beginner']),
  user_id: z.number().int(),
  sport_id: z.number().int(),
});

export default createOwnRating;
