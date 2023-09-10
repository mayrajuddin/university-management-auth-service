import { IAcademicSemester } from './academicSemester.Interface';
import { AcademicSemester } from './academicSemester.Model';

const createAcademicSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  const result = await AcademicSemester.create(payload);
  return result;
};
export const AcademicSemesterService = { createAcademicSemester };
