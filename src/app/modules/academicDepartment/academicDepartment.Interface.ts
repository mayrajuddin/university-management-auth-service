import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.Interface';

export type IAcademicDepartment = {
  title: string;
  academicFaculty?: Types.ObjectId | IAcademicFaculty;
};
export type AcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>;
export type IAcademicDepartmentFilter = {
  searchTerm?: string;
  academicFaculty?: Types.ObjectId;
};
