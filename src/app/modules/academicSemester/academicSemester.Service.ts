import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiErrors';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interface/common';
import { IPaginations } from '../../../interface/pagination';
import { IAcademicSemester } from './academicSemester.Interface';
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
  pagination: IPaginations,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(pagination);
  const sortConditon: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditon[sortBy] = sortOrder;
  }
  const result = await AcademicSemester.find()
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
