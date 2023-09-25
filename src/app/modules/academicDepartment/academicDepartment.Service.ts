import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IPaginations } from '../../../interface/pagination';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilter,
} from './academicDepartment.Interface';
import { academicDepartment } from './academicDepartment.Model';
import { departmentSearchableField } from './academicDepartmentConstant';

const createAcademicDepartment = async (
  payload: IAcademicDepartment,
): Promise<IAcademicDepartment | null> => {
  const result = (await academicDepartment.create(payload)).populate(
    'academicFaculty',
  );
  return result;
};
const getAllAcademicDepartment = async (
  filters: IAcademicDepartmentFilter,
  paginationOptions: IPaginations,
) => {
  const { page, skip, sortBy, sortOrder, limit } =
    paginationHelper.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: departmentSearchableField.map(field => ({
        [field]: { $regex: searchTerm, $paginationOptions: 'i' },
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
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await academicDepartment
    .find(whereCondition)
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await academicDepartment.countDocuments();
  return {
    meta: { page, limit, total },
    data: result,
  };
};
const getAcademicDepartment = async (
  id: string,
): Promise<IAcademicDepartment | null> => {
  const result = await academicDepartment
    .findById(id)
    .populate('academicFaculty');
  return result;
};

const updateAcademicDepartment = async (
  id: string,
  payload: IAcademicDepartment,
): Promise<IAcademicDepartment | null> => {
  const result = await academicDepartment
    .findByIdAndUpdate({ _id: id }, payload, { new: true })
    .populate('academicFaculty');
  return result;
};
const deleteAcademicDepartment = async (
  id: string,
): Promise<IAcademicDepartment | null> => {
  const result = await academicDepartment.findByIdAndDelete(id);
  return result;
};
export const academicDepartmentService = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
};
