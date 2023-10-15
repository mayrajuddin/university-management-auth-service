import z from 'zod';
const createManagementDapartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required !',
    }),
  }),
});
const updateManagementDapartmentZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});
export const ManagementDepartmentValidation = {
  createManagementDapartmentZodSchema,
  updateManagementDapartmentZodSchema,
};
