import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.Interface';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.Interface';
export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
type IBloodGroup = ['A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'];
export type IFaculty = {
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
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  profileImage?: string;
};
export type FacultyModel = Model<IFaculty, Record<string, unknown>>;
export type IFacultyFilter = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  contactNo?: string;
  email?: string;
};
