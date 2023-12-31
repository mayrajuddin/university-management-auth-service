import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.Interface';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.Interface';
import { IAcademicSemester } from '../academicSemester/academicSemester.Interface';
export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type Guardians = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
};
type LocalGuardian = {
  name: string;
  occupation: string;
  address: string;
  contactNo: string;
};
type IBloodGroup = ['A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'];
export type IStudent = {
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
  guardian: Guardians;
  localGuardian: LocalGuardian;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicSemester: Types.ObjectId | IAcademicSemester;
  profileImage?: string;
};
export type StudentModel = Model<IStudent, Record<string, unknown>>;
export type IStudentFilter = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  contactNo?: string;
  email?: string;
};
