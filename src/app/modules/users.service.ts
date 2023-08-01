import config from '../../config'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utilis'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generateUserId()

  // set user id to the generated id
  user.id = id
  //setting default password
  if (!user.password) {
    user.password = config.user_default_pass as string
  }
  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new Error('User not created')
  }
  return createdUser
}

export default {
  createUser,
}
