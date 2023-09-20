import * as z from 'zod';

const createRating = z.object({
  rating: z.number().int().min(1).max(10),
  user_id: z.number().int(),
  sport_id: z.number().int(),
  rater_id: z.number().int(),
  event_id: z.number().int(),
});

export default createRating;
