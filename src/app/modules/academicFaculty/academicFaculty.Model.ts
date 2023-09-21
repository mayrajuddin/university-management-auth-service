import { Schema, model } from 'mongoose';
import { IAcademicFaculty } from './academicFaculty.Interface';
import { academicSemesterModel } from '../academicSemester/academicSemester.Interface';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
export const AcademicFaculty = model<IAcademicFaculty, academicSemesterModel>(
  'academicFaculty',
  academicFacultySchema,
);
