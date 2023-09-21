import { Model, Types } from 'mongoose';

export type IAcademicDepartment = {
  title: string;
  academicFaculty: Types.ObjectId;
};
export type AcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>;
export type IAcademicDepartmentFilter = {
  searchTerm?: string;
  academicFaculty?: Types.ObjectId;
};
