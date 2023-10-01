//create zod error handler
import { z } from 'zod';
import { bloodGroup, gender } from '../student/studentConstant';
const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'First Name is Required!' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'Last Name is Required!' }),
      }),
      dateOfBirth: z.string({ required_error: 'Birth date is Required!' }),
      gender: z.enum([...gender] as [string], {
        required_error: 'Gender is Required!',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
        required_error: 'Blood group is Required!',
      }),
    }),
  }),
});
export const UserValidation = {
  createUserZodSchema,
};
