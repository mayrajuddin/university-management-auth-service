import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IPaginations } from '../../../interface/pagination';
import { IStudent, IStudentFilter } from './student.Interface';
import { Student } from './student.Model';
import { searchAbleFields } from './studentConstant';
import { IGenericResponse } from '../../../interface/common';

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
    .sort(sortConditon)
    .skip(skip)
    .limit(limit);
  const total = await Student.countDocuments();

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
  const result = await Student.findById(id);
  return result;
};
const updateStudent = async (id: string, payload: Partial<IStudent>) => {
  const result = await Student.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
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
