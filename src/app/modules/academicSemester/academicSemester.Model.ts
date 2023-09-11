import { Schema, model } from 'mongoose';
import {
  IAcademicSemester,
  academicSemesterModel,
} from './academicSemester.Interface';
import {
  academicSemesterCode,
  academicSemesterMonths,
  academicSemesterTitle,
} from './academicSemesterConstant';
import ApiError from '../../../errors/ApiErrors';
import status from 'http-status';
const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitle,
    },
    year: { type: Number, required: true },
    code: { type: String, required: true, enum: academicSemesterCode },
    startMonth: { type: String, required: true, enum: academicSemesterMonths },
    endMonth: { type: String, required: true, enum: academicSemesterMonths },
  },
  { timestamps: true },
);
// fix same year double semester ex. 2023 fall | fall  not valid

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic Semester Already Exist ! ');
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester, academicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema,
);
