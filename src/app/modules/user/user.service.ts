import mongoose from 'mongoose';
import config from '../../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.Model';
import { IStudent } from '../student/student.Interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './users.utilis';
import { Student } from '../student/student.Model';
import ApiError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';

const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  //setting default password
  if (!user.password) {
    user.password = config.student_default_pass as string;
  }
  //set role
  user.role = 'student';
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester,
  );
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester);
    student.id = id;
    user.id = id;
    const newStudent = await Student.create([student], { session });
    //if failed to create student
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        { path: 'academicFaculty' },
        { path: 'academicDepartment' },
        { path: 'academicSemester' },
      ],
    });
  }
  return newUserAllData;
};

export const UserService = {
  createStudent,
};
