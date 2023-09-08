// import { Server } from 'socket.io';
// import logger from '../../helpers/logger.js';
// import {
//   getHistory, storeInPostgres, storeInRedis,
// } from './storeMessage.js';

// // @ts-ignore
// const initSocket = async (server, options) => {
//   // get history from redis
//   // just one room for now so we can fetch all the history at start
//   // const history = await getHistory('history')
//   // socket.emit('history', history);

//   const io = new Server(server, options);

//   io.on('connection', (socket) => {
//     socket.on('join_event_chat', async (nameoftheroom) => {
//       // nameoftheroom devrait toujours être de cette forme : chatevent${eventId}
//       socket.join(nameoftheroom);
//       // renvoyer l'historique du chat de la room associée à l'évent
//       let history;
//       try {
//         const result = await getHistory(nameoftheroom);
//         history = result;
//       } catch (error) {
//         logger.error(error);
//       }
//       socket.emit('historic', history);
//     });

//     socket.on('username', (username: string, userId: number) => {
//       /* eslint-disable no-param-reassign */
//       socket.data.username = username;
//       socket.data.userId = userId;
//     });

//     socket.on('user_sent_message', async (message: string, avatar: string, eventId) => {
//       // on ecoute le message envoyé par l'utilisateur
//       // on regarde dans quelle room il a été posté
//       // on envoie le message à tous les utilisateurs de la room

//       const infos = {
//         username: socket.data.username,
//         userId: socket.data.userId,
//         socketId: socket.id,
//         message,
//         date: new Date(),
//         avatar,
//       };
//       io.to(Array.from(socket.rooms)[1]).emit('message_has_been_sent', infos);

//       // ajout du message dans l'historique correspondant à la room
//       const messageToStore = {
//         username: socket.data.username,
//         userId: socket.data.userId,
//         eventId,
//         message,
//         created_at: new Date(),
//         avatar,
//       };
//       storeInRedis(messageToStore, 'chatevent01');
//       try {
//         await storeInPostgres(messageToStore);
//       } catch (error) {
//         logger.error(error);
//       }
//     });
//   });
// };

// export default initSocket;
