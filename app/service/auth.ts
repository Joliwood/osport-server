import bcrypt from 'bcrypt';
import User from '../models/user.js';
import type { LoginForm, RegisterForm } from '../@types/index.d.js';
import DatabaseError from '../helpers/errors/database.error.js';
import ServerError from '../helpers/errors/server.error.js';
import UserInputError from '../helpers/errors/userInput.error.js';
import createAccesToken from '../helpers/token/create.access.js';

export async function createUser(data: RegisterForm): Promise<boolean> {
  const { email, username, password } = data;
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds).catch((err: any) => {
      if (err) throw new ServerError("Couldn't hash user password");
    });

    if (!hashedPassword) throw new ServerError('hash password is missing');

    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    return !!newUser;
  } catch (error) {
    throw new DatabaseError('Most likely the user already exists', 'user', error);
  }
}

export async function login(data: LoginForm):
  Promise<{ accessToken: string; }> {
  const { username, password } = data;

  const trimedPassword = password.trim();
  const trimedUsername = username.trim();

  const expireTimeAccess = '8h';

  const user = await User.findOne({ username: trimedUsername });

  if (!user) throw new UserInputError('Wrong credentials');

  const passwordMatch = await bcrypt.compare(trimedPassword, user.password);

  if (!passwordMatch) throw new UserInputError("Password didn't match", 'wrong credentials');

  const accessToken = createAccesToken(
    expireTimeAccess,
    { userId: user.id },
  );

  return { accessToken };
}
