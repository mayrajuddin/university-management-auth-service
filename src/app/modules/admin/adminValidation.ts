import { z } from 'zod';
import { bloodGroup, gender } from './adminConstant';

const updateAdminZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z
          .string({ required_error: 'First Name is Required!' })
          .optional(),
        middleName: z.string().optional(),
        lastName: z
          .string({ required_error: 'Last Name is Required!' })
          .optional(),
      })
      .optional(),
    dateOfBirth: z
      .string({ required_error: 'Date of birth is Required!' })
      .optional(),
    gender: z
      .enum([...gender] as [string], {
        required_error: 'Gender is Required!',
      })
      .optional(),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    email: z.string({ required_error: 'Email is Required!' }).optional(),
    contactNo: z
      .string({ required_error: 'Contact Number is Required!' })
      .optional(),
    emergencyContactNo: z
      .string({
        required_error: 'Emergency contact number is required!',
      })
      .optional(),
    presentAddress: z
      .string({
        required_error: 'Present address is required!',
      })
      .optional(),
    permanentAddress: z
      .string({
        required_error: 'Permanent address is required!',
      })
      .optional(),
    designation: z
      .string({
        required_error: 'Designation is required!',
      })
      .optional(),
    managementDepartment: z
      .string({
        required_error: 'Management department is required!',
      })
      .optional(),
    profileImage: z.string().optional(),
  }),
});
export const AdminValidation = {
  updateAdminZodSchema,
};
