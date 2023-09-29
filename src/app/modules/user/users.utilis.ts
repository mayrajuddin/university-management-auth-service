import { IAcademicSemester } from '../academicSemester/academicSemester.Interface';
import { User } from './user.model';

export const findLastStudentId = async () => {
  const lastStudent = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester,
) => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementedId}`;

  return incrementedId;
};
export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastFaculty?.id;
};
export const generateFacultyId = async () => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `F-${incrementedId}`;
  return incrementedId;
};
