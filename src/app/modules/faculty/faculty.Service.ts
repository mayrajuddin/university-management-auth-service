import { IFaculty } from './faculty.Interface';
import { Faculty } from './faculty.Model';

const createFaculty = async (payload: IFaculty): Promise<IFaculty | null> => {
  const result = await Faculty.create(payload);
  return result;
};
export const FacultyService = {
  createFaculty,
};
