import { InferSchemaType, Model } from 'mongoose';
import { StudentSchema } from './student.Model';
export type IStudent = InferSchemaType<typeof StudentSchema>;
export type StudentModel = Model<IStudent, Record<string, unknown>>;
