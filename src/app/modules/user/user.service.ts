import config from '../../../config';
import apiError from '../../../errors/ApiErrors';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './users.utilis';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const test = {
    code: '01',
    year: '2023',
  };
  const id = await generateStudentId(test);

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
