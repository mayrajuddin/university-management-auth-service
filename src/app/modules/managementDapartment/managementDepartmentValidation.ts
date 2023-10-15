import z from 'zod';
const managementDapartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required !',
    }),
  }),
});
export const ManagementDepartmentValidation = {
  managementDapartmentZodSchema,
};
