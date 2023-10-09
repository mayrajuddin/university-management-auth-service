import { z } from 'zod';

const createAcademiFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Required',
    }),
  }),
});
export const AcademicFacultyValidation = {
  createAcademiFacultyZodSchema,
};
