import { IManagementDepartment } from './managementDepartment.Interface';
import { ManagementDepartment } from './managementDepartment.Model';

const createDepartment = async (
  payload: IManagementDepartment,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.create(payload);
  return result;
};
export const ManagementDepartmentService = {
  createDepartment,
};
