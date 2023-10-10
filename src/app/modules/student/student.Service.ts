/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IPaginations } from '../../../interface/pagination';
import { IStudent, IStudentFilter } from './student.Interface';
import { Student } from './student.Model';
import { searchAbleFields } from './studentConstant';
import { IGenericResponse } from '../../../interface/common';
import ApiError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';

const getAllStudents = async (
  filters: IStudentFilter,
  pagination: IPaginations,
): Promise<IGenericResponse<IStudent[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(pagination);
  const sortConditon: { [key: string]: SortOrder } = {};
  const { searchTerm, ...filtersData } = filters;
  if (sortBy && sortOrder) {
    sortConditon[sortBy] = sortOrder;
  }

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: searchAbleFields.map(field => ({
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
  const result = await Student.find(whereCondition)
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('academicSemester')
    .sort(sortConditon)
    .skip(skip)
    .limit(limit);
  const total = await Student.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('academicSemester');
  return result;
};
const updateStudent = async (id: string, payload: Partial<IStudent>) => {
  const isExist = await Student.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found!');
  }
  const { name, guardian, localGuardian, ...studentData } = payload;
  const updatedStudentData: Partial<IStudent> = { ...studentData };
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const namekey = `name.${key}`;
      (updatedStudentData as any)[namekey] = name[key as keyof typeof name];
    });
  }
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardiankey = `guardian.${key}`;
      (updatedStudentData as any)[guardiankey] =
        guardian[key as keyof typeof guardian];
    });
  }
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardiankey = `localGuardian.${key}`;
      (updatedStudentData as any)[localGuardiankey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }
  const result = await Student.findOneAndUpdate(
    { _id: id },
    updatedStudentData,
    {
      new: true,
    },
  );
  return result;
};
const deleteStudent = async (id: string) => {
  const result = await Student.findByIdAndDelete(id);
  return result;
};
export const studentService = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
