import ApiError from '../../../errors/ApiErrors';
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

const getAllSemesters = (pagination: IPaginations) => {};
export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemesters,
};
