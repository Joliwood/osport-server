// import { Redis } from 'ioredis';
// import logger from '../../helpers/logger.js';
// import prisma from '../../helpers/db.client.js';
// import { ChatMessage } from '../../@types/index.js';

// const redis = new Redis();

// export const storeInRedis = async (messageInfos: ChatMessage, historyKey: string) => {
//   // rapel historyKey devrait toujours être de cette forme : chatevent${eventId}
//   const DEFAULT_EXPIRATION = 604800; // 1 week in seconds

//   if (!redis.exists(historyKey)) {
//     await redis.lpush(historyKey, JSON.stringify([messageInfos]), 'EX', DEFAULT_EXPIRATION);
//     logger.info('New history cache created and message stored');
//   } else {
//     const length = await redis.llen(historyKey);
//     if (length >= 200) {
//       await redis.rpop(historyKey);
//     }
//     await redis.lpush(historyKey, JSON.stringify(messageInfos));
//     logger.info(`Message stored in ${historyKey} historic`);
//   }
// };

// export const storeInPostgres = async (messageInfos: ChatMessage) => {
//   // store in postgres
//   try {
//     await prisma.event_chat_on_user.create(
//       {
//         data: {
//           message: messageInfos.message,
//           user_id: messageInfos.userId,
//           event_id: messageInfos.eventId,
//           created_at: messageInfos.created_at,
//           avatar: messageInfos.avatar,
//         },
//       },
//     );
//   } catch (error: any) {
//     console.log(error);
//   }
// };

// export const getHistory = async (historyKey: string) => {
//   // -1 to fetch all the list
//   const history = await redis.lrange(historyKey, 0, -1);
//   const jsonHistory = history.map((message) => JSON.parse(message));
//   return jsonHistory;
// };
