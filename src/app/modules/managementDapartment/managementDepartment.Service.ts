import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import {
  IDepartmentFielters,
  IManagementDepartment,
} from './managementDepartment.Interface';
import { ManagementDepartment } from './managementDepartment.Model';
import { IPaginations } from '../../../interface/pagination';
import { paginationHelper } from '../../../helper/paginationHelper';
import { SortOrder } from 'mongoose';
import { departmentSearchableField } from '../academicDepartment/academicDepartmentConstant';
import { IGenericResponse } from '../../../interface/common';

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
const getAllDepartment = async (
  filters: IDepartmentFielters,
  pagination: IPaginations,
): Promise<IGenericResponse<IManagementDepartment[] | null>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(pagination);
  const sortConditon: { [key: string]: SortOrder } = {};
  const { searchTerm, ...fieltersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: departmentSearchableField.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }
  if (Object.keys(fieltersData).length) {
    andCondition.push({
      $and: Object.entries(fieltersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  if (sortBy && sortOrder) {
    sortConditon[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const total = await ManagementDepartment.countDocuments(whereCondition);
  const result = await ManagementDepartment.find(whereCondition)
    .sort(sortConditon)
    .skip(skip)
    .limit(limit);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const updateDepartment = async (
  id: string,
  payload: Partial<IManagementDepartment>,
) => {
  const isExist = await ManagementDepartment.findOne({ _id: id });
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

const deleteDepartment = async (id: string) => {
  const isExist = await ManagementDepartment.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Management department not found');
  }
  const result = await ManagementDepartment.findOneAndDelete({ _id: id });
  return result;
};
export const ManagementDepartmentService = {
  createDepartment,
  getSingleDepartment,
  updateDepartment,
  getAllDepartment,
  deleteDepartment,
};
