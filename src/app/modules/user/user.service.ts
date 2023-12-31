import mongoose from 'mongoose';
import config from '../../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.Model';
import { IStudent } from '../student/student.Interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './users.utilis';
import { Student } from '../student/student.Model';
import ApiError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';
import { IFaculty } from '../faculty/faculty.Interface';
import { Faculty } from '../faculty/faculty.Model';
import { IAdmin } from '../admin/admin.Interface';
import { Admin } from '../admin/admin.Model';

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
    user.id = id;
    student.id = id;
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
const createFaculy = async (faculty: IFaculty, user: IUser) => {
  if (!user.password) {
    user.password = config.faculty_default_pass as string;
  }
  //set role
  user.role = 'faculty';
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;
    const newFaculty = await Faculty.create([faculty], { session });
    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty!');
    }
    user.faculty = newFaculty[0]._id;

    //create faculty as user
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [{ path: 'academicDepartment' }, { path: 'academicFaculty' }],
    });
  }
  return newUserAllData;
};

const createAdmin = async (admin: IAdmin, user: IUser) => {
  if (!user.password) {
    user.password = config.admin_default_pass as string;
  }
  user.role = 'admin';
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateAdminId();
    user.id = id;
    admin.id = id;
    const newAdmin = await Admin.create([admin], { session });
    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin!');
    }
    user.admin = newAdmin[0]._id;

    //create admin as user
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [{ path: 'managementDepartment' }],
    });
  }
  return newUserAllData;
};
export const UserService = {
  createStudent,
  createFaculy,
  createAdmin,
};
