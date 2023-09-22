import { IAcademicDepartment } from './academicDepartment.Interface';
import { academicDepartment } from './academicDepartment.Model';

const createAcademicDepartment = async (
  payload: IAcademicDepartment,
): Promise<IAcademicDepartment | null> => {
  const result = (await academicDepartment.create(payload)).populate(
    'academicFaculty',
  );
  return result;
};

export const academicDepartmentService = {
  createAcademicDepartment,
};
