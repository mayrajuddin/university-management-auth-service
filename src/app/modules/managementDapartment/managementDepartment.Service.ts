import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { IManagementDepartment } from './managementDepartment.Interface';
import { ManagementDepartment } from './managementDepartment.Model';

const createDepartment = async (
  payload: IManagementDepartment,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.create(payload);
  return result;
};
const getSingleDepartment = async (id: string) => {
  const result = await ManagementDepartment.findById(id);
  return result;
};
const updateDepartment = async (
  id: string,
  payload: Partial<IManagementDepartment>,
) => {
  const isExist = await ManagementDepartment.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Management department not found');
  }
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};
export const ManagementDepartmentService = {
  createDepartment,
  getSingleDepartment,
  updateDepartment,
};
