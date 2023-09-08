import * as z from 'zod';

const updateRating = z.object({
  rating: z.number().int().min(1).max(10),
  user_id: z.number().int(),
  sport_id: z.number().int(),
  rater_id: z.number().int(),
});

export default updateRating;
