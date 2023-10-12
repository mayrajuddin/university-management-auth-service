import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interface/common';
import { IPaginations } from '../../../interface/pagination';
import { IFaculty, IFacultyFilter } from './faculty.Interface';
import { Faculty } from './faculty.Model';
import { searchAbleFields } from './facultyConstant';

const getAllFaculties = async (
  filters: IFacultyFilter,
  pagination: IPaginations,
): Promise<IGenericResponse<IFaculty[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(pagination);
  const sortConditon: { [key: string]: SortOrder } = {};
  const { searchTerm, ...filtersData } = filters;
  if (sortBy && sortOrder) {
    sortConditon[sortBy] = sortOrder;
  }
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: searchAbleFields.map(field => ({
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
  const total = await Faculty.countDocuments(whereCondition);
  const result = await Faculty.find(whereCondition)
    .populate('academicFaculty')
    .populate('academicDepartment')
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
export const FacultyService = {
  getAllFaculties,
};
