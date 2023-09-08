import { Request, Response } from 'express';
import UserModel from '../models/user.js';
import Image from '../models/image.js';
import { deleteImageFromServer, saveImageOnServer } from '../service/image.js';
import checkParams from '../utils/checkParams.js';
import logger from '../helpers/logger.js';
// import Cache from '../service/cache.js';

export default {

  getUser: async (req: Request, res: Response) => {
    // data should be validated before reaching this point
    // factory controller will handle the error throwing in database or createUser function
    const id = checkParams(req.params.id);
    // const { cacheKey } = req.body;

    const user = await UserModel.getUserInfos(id);

    // await Cache.set(cacheKey, user);

    return res.status(200).json({ message: 'User informations', data: user });
  },
  updateImage: async (req: Request, res: Response) => {
    const { id } = req.body; //  form-data so id is a string
    if (!req.file) return res.status(200).json({ error: 'No image provided' });
    const error: any = {

    };

    const image = req.file.buffer;

    const { relativePath, name } = await saveImageOnServer({
      buffer: image,
      height: 100,
      width: 100,
    });

    const imageStored = await Image.create({ title: name, url: relativePath });

    const user = await UserModel.getUserInfos(Number(id));

    if (user.image_url) {
      try {
        await deleteImageFromServer(user.image_url as string);
      } catch (err: any) {
        logger.error(err);
        error.image = 'Error while deleting image from server';
      }
    }

    const isUpdated = await UserModel.updateUser(Number(id), { imageUrl: imageStored.url });

    // await Cache.del([`user${id}`]);

    return res.status(200).json({ message: 'User has been updated', data: isUpdated, error });
  },

  deleteUser: async (req: Request, res: Response) => {
    const id = checkParams(req.params.id);

    await UserModel.deleteUser(id);

    // await Cache.del([`user${id}`]);

    return res.status(200).json({ message: 'User has been deleted' });
  },

  updateUser: async (req: Request, res: Response) => {
    const { userId, ...data } = req.body;

    const user = await UserModel.updateUser(userId, data);

    // await Cache.del([`user${userId}`]);

    return res.status(200).json({ message: 'User has been updated', data: user });
  },
};
