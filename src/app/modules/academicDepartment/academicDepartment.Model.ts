import { Schema, model } from 'mongoose';
import { IAcademicDepartment } from './academicDepartment.Interface';
import { academicSemesterModel } from '../academicSemester/academicSemester.Interface';

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academicFaculty',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);
export const academicDepartment = model<
  IAcademicDepartment,
  academicSemesterModel
>('academicDepartment', academicDepartmentSchema);
