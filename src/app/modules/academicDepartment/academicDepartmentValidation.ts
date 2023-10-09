import { z } from 'zod';

const academicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Required',
    }),
    academicFaculty: z.string({
      required_error: 'Academic Faculty is Required',
    }),
  }),
});
const updateAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});
export const AcademicDepartmentValidation = {
  academicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
};
