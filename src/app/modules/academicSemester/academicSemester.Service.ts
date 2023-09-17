import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiErrors';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interface/common';
import { IPaginations } from '../../../interface/pagination';
import {
  IAcademicSemester,
  IAcademicSemesterFilter,
} from './academicSemester.Interface';
import { AcademicSemester } from './academicSemester.Model';
import { academicSemesterTitleCodeMapper } from './academicSemesterConstant';
import status from 'http-status';
const createAcademicSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(status.BAD_REQUEST, 'Wrong Semester Code !');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemesters = async (
  filters: IAcademicSemesterFilter,
  pagination: IPaginations,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(pagination);
  const sortConditon: { [key: string]: SortOrder } = {};
  const { searchTerm } = filters;
  if (sortBy && sortOrder) {
    sortConditon[sortBy] = sortOrder;
  }
  const searchFields = ['title', 'code', 'year'];
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: searchFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }
  // const and = [
  //   {
  //     $or: [
  //       { title: { $regex: searchTerm, $options: 'i' } },
  //       { code: { $regex: searchTerm, $options: 'i' } },
  //       { year: { $regex: searchTerm, $options: 'i' } },
  //     ],
  //   },
  // ];
  const result = await AcademicSemester.find({ $and: andCondition })
    .sort(sortConditon)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemesters,
};
