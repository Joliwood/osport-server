import { Response, Request } from 'express';
import { createUser, login } from '../service/auth.js';

export default {
  register: async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    await createUser({ email, username, password });

    res.status(201).json({ message: 'User created successfully' });
  },

  signin: async (req: Request, res: Response) => {
    const data = {
      username: req.body.username,
      password: req.body.password,
    };

    try {
      const { accessToken } = await login(data);

      res.cookie('accessToken', accessToken, {
        httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ message: 'User logged in successfully' });
    } catch (error: any) {
      res.status(200).json({ error: 'Bad credentials' });
    }
  },

  validate: async (req: Request, res: Response) => {
    const { decoded } = req.body;

    res.status(200).json({ message: 'User is logged in', userInfos: decoded[0] });
  },

  logout: async (_req: Request, res: Response) => {
    res.clearCookie('accessToken');
    res.status(200).json({ message: 'User logged out successfully' });
  },
};
