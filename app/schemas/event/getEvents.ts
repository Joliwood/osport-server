import * as z from 'zod';

const getEventsSchema = z.object({
  id: z.any(),
});

export default getEventsSchema;
