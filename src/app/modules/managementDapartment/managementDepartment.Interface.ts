import { Model } from 'mongoose';

export type IManagementDepartment = {
  title: string;
};
export type ManagementDepartmentModel = Model<
  IManagementDepartment,
  Record<string, string>
>;
export type IDepartmentFielters = {
  searchTerm?: string;
  title?: string;
};
