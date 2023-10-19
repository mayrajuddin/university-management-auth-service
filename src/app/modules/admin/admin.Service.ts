/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IPaginations } from '../../../interface/pagination';
import { IAdmin, IAdminFilter } from './admin.Interface';
import { adminSearchFields } from './adminConstant';
import { Admin } from './admin.Model';
import ApiError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllAdmin = async (filters: IAdminFilter, pagination: IPaginations) => {
  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelper.calculatePagination(pagination);
  const sortConditon: { [key: string]: SortOrder } = {};
  const { searchTerm, ...filtersData } = filters;
  if (sortBy && sortOrder) {
    sortConditon[sortBy] = sortOrder;
  }
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: adminSearchFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const total = await Admin.countDocuments(whereCondition);
  const result = await Admin.find(whereCondition)
    .populate('managementDepartment')
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
const getSingleAdmin = async (id: string) => {
  const result = await Admin.findById(id).populate('managementDepartment');
  return result;
};
const updateAdmin = async (id: string, payload: Partial<IAdmin>) => {
  const isExist = await Admin.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found!');
  }
  const { name, ...adminData } = payload;
  const updatedData: Partial<IAdmin> = { ...adminData };
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const namekey = `name.${key}`;
      (updatedData as any)[namekey] = name[key as keyof typeof name];
    });
  }
  const result = await Admin.findOneAndUpdate({ id }, updatedData, {
    new: true,
  });
  return result;
};
const deleteAdmin = async (id: string) => {
  const isExist = await Admin.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Admin not found!');
  }
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const admin = await Admin.findOneAndDelete({ id }, { session });
    if (!admin) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete admin');
    }
    //also delete admin from user
    await User.deleteOne({ id });
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};
export const AdminService = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
