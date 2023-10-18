import { Model, Types } from 'mongoose';
import { IManagementDepartment } from '../managementDapartment/managementDepartment.Interface';

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
type IBloodGroup = ['A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'];
export type IAdmin = {
  id: string;
  name: UserName;
  dateOfBirth: string;
  gender: 'male' | 'female';
  bloodGroup?: IBloodGroup;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  designation: string;
  managementDepartment: Types.ObjectId | IManagementDepartment;
  profileImage?: string;
};
export type AdminModel = Model<IAdmin, Record<string, unknown>>;
