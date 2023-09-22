import { Request, Response } from 'express';
import Friends from '../models/user_on_friend.js';
import NotFoundError from '../helpers/errors/notFound.error.js';
import checkParams from '../utils/checkParams.js';
import User from '../models/user.js';
import logger from '../helpers/logger.js';

export default {
  getPendingRequestSent: async (req: Request, res: Response) => {
    const userId = checkParams(req.params.id);
    const status = 'pending';

    const friends = await Friends.find(userId, status);

    res.status(200).json({ message: 'Friends retrieved successfully', data: friends });
  },

  getAcceptedFriends: async (req: Request, res: Response) => {
    const userId = checkParams(req.params.id);
    const status = 'accepted';

    const friends = await Friends.find(userId, status);
    if (friends.length === 0) {
      return res.status(200).json({ message: 'No friends accepted', data: friends });
    }

    return res.status(200).json({ message: 'Friends retrieved successfully', data: friends });
  },

  getPendingRequestReceived: async (req: Request, res: Response) => {
    const userId = checkParams(req.params.id);

    const friends = await Friends.findManyRequest(userId);

    if (friends.length === 0) {
      return res.status(200).json({ message: 'No friends in pending', data: friends });
    }

    return res.status(200).json({ message: 'Friends retrieved successfully', data: friends });
  },

  sendFriendRequest: async (req: Request, res: Response) => {
    const data = {
      asker_id: Number(req.body.userId),
      asked_id: Number(req.body.friendId),
    };

    await Friends.create(data);

    res.status(201).json({ message: 'Friend request sent successfully' });
  },

  addFriend: async (req: Request, res: Response) => {
    const { username, email, userId } = req.body;
    let friend: any = {};

    try {
      friend = await User.findOne({ username, email });
    } catch (error) {
      logger.error(error);
      res.status(200).json({ error: "Friend doesn't exist" });
    }

    await Friends.create({ asker_id: userId, asked_id: friend.id });

    res.status(201).json({ message: 'Friend added successfully' });
  },

  acceptFriendRequest: async (req: Request, res: Response) => {
    const { userId, friendId } = req.body;

    try {
      await Friends.findRequest({ userId, friendId });
    } catch (error) {
      if (error instanceof NotFoundError) return res.status(200).json({ error: 'No pending friend request found' });
    }

    const updateStatus = 'accepted';
    await Friends
      .update(friendId, userId, updateStatus);

    return res.status(204).json({ message: 'Friend request accepted successfully' });
  },

  rejectFriendRequest: async (req: Request, res: Response) => {
    const { userId, friendId } = req.body;

    try {
      await Friends.findRequest({ userId, friendId });
    } catch (error) {
      if (error instanceof NotFoundError) return res.status(200).json({ message: 'No pending friend request found' });
    }

    await Friends.reject(friendId, userId);

    return res.status(204).json({ message: 'Friend request rejected successfully' });
  },
};
