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
      dateOfBirth: z.string({ required_error: 'Date of birth is Required!' }),
      gender: z.enum([...gender] as [string], {
        required_error: 'Gender is Required!',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
        required_error: 'Blood group is Required!',
      }),
      email: z.string({ required_error: 'Email is Required!' }),
      contactNo: z.string({ required_error: 'Contact Number is Required!' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required!',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required!',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required!',
      }),
      guardian: z.object({
        fatherName: z.string({ required_error: 'Father name is required!' }),
        fatherOccupation: z.string({
          required_error: 'Father occupation is Required!',
        }),
        fatherContactNo: z.string({
          required_error: 'Father contact number is required!',
        }),
        motherName: z.string({ required_error: 'Mother name is required!' }),
        motherOccupation: z.string({
          required_error: 'Mother occupation is required!',
        }),
        motherContactNo: z.string({
          required_error: 'Mother contact number is required!',
        }),
        address: z.string({ required_error: 'Address is required!' }),
      }),
      localGuardian: z.object({
        name: z.string({ required_error: 'Name is required!' }),
        occupation: z.string({ required_error: 'Occupation is required!' }),
        address: z.string({ required_error: 'Address is required!' }),
        contactNo: z.string({ required_error: 'Contact number is required!' }),
      }),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required!',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required!',
      }),
      academicSemester: z.string({
        required_error: 'Academic semester is required!',
      }),
      profileImage: z.string().optional(),
    }),
  }),
});
const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'First Name is Required!' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'Last Name is Required!' }),
      }),
      dateOfBirth: z.string({ required_error: 'Date of birth is Required!' }),
      gender: z.enum([...gender] as [string], {
        required_error: 'Gender is Required!',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
        required_error: 'Blood group is Required!',
      }),
      email: z.string({ required_error: 'Email is Required!' }),
      contactNo: z.string({ required_error: 'Contact Number is Required!' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required!',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required!',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required!',
      }),
      designation: z.string({
        required_error: 'Designation is required!',
      }),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required!',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required!',
      }),
      profileImage: z.string().optional(),
    }),
  }),
});
const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'First Name is Required!' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'Last Name is Required!' }),
      }),
      dateOfBirth: z.string({ required_error: 'Date of birth is Required!' }),
      gender: z.enum([...gender] as [string], {
        required_error: 'Gender is Required!',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      email: z.string({ required_error: 'Email is Required!' }),
      contactNo: z.string({ required_error: 'Contact Number is Required!' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required!',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required!',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required!',
      }),
      designation: z.string({
        required_error: 'Designation is required!',
      }),
      managementDepartment: z.string({
        required_error: 'Management department is required!',
      }),
      profileImage: z.string().optional(),
    }),
  }),
});
export const UserValidation = {
  createUserZodSchema,
  createFacultyZodSchema,
  createAdminZodSchema,
};
