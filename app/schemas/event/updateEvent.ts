import * as z from 'zod';

export const updateEventSchema = z.object({
  userId: z.number(),
  eventId: z.number(),
  date: z.string().datetime().optional(),
  location: z.string().optional(),
  score_team_1: z.number().nullable().optional(),
  score_team_2: z.number().nullable().optional(),
  duration: z.number().optional(),
  nb_team: z.number().optional(),
  nb_max_participant: z.number().optional(),
  sport_id: z.number().optional(),
});

export default updateEventSchema;
