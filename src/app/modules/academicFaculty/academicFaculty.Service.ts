import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IPaginations } from '../../../interface/pagination';
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.Interface';
import { AcademicFaculty } from './academicFaculty.Model';
import { academicFacultySearchAbleField } from './academicFacultyConstant';

const createAcademicFaculty = async (
  payload: IAcademicFaculty,
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.create(payload);

  return result;
};
const getAllFaculties = async (
  filters: IAcademicFacultyFilters,
  pagination: IPaginations,
) => {
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
      $or: academicFacultySearchAbleField.map(field => ({
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
  const result = await AcademicFaculty.find(whereCondition)
    .sort(sortConditon)
    .skip(skip)
    .limit(limit);

  const total = await AcademicFaculty.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleFaculty = async (
  id: string,
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};
const updateFaculty = async (id: string, payload: IAcademicFaculty) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};
export const academicFacultyService = {
  createAcademicFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
};
