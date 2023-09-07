import config from '../../../config';
import apiError from '../../../errors/ApiErrors';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './users.utilis';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generateUserId();

  // set user id to the generated id
  user.id = id;
  //setting default password
  if (!user.password) {
    user.password = config.user_default_pass as string;
  }
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new apiError(400, 'User not created');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
