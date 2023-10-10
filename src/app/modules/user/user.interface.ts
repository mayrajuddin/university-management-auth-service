import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.Interface';
import { IFaculty } from '../faculty/faculty.Interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  // admin?: Types.ObjectId;
};
export type UserModel = Model<IUser, Record<string, unknown>>;
