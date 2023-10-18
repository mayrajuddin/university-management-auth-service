import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.Interface';
import { IFaculty } from '../faculty/faculty.Interface';
import { IAdmin } from '../admin/admin.Interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
};
export type UserModel = Model<IUser, Record<string, unknown>>;
