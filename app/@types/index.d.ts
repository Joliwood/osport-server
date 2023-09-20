import { NextFunction, Request, Response } from 'express';

export type Controller = (req: Request, res: Response, next?: NextFunction) => any | Promise<any>;

export type LoginForm = {
  username: string;
  password: string;
};

export type RegisterForm = {
  email: string;
  username: string;
  password: string;
};
export type AllowedUserUpdate = {
  username?: string;
  email?: string;
  password?: string;
  imageUrl?: string;
};
export type RequestStatus = 'pending' | 'accepted' | 'rejected';

export type Levels = 'beginner' | 'intermediate' | 'advanced';

export type Player = {
  id: number;
  rating: number;
};

export type TeamGeneratorConfig = {
  participants: number;
  ids: number[];
  values: number[];
  team1: Player[];
  team2: Player[];
};

export type UserInfos = {
  userId: number;
};

export type ChatMessage = {
  id?: number;
  message: string;
  username?: string;
  userId: number;
  eventId: number;
  created_at: Date;
  updated_at?: Date;
  avatar?: string;
};

type SportLevel = {
  name: string,
  gb_rating: number | null,
  user_id?: number,
  nb_rating?: number,
};
