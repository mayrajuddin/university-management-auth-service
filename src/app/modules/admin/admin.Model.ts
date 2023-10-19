import { Schema, model } from 'mongoose';
import { IAdmin } from './admin.Interface';
import { bloodGroup, gender } from './adminConstant';

const adminSchema = new Schema<IAdmin>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: { type: String },
        lastName: { type: String, required: true },
      },
      required: true,
    },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
      enum: gender,
    },
    bloodGroup: {
      type: String,
      enum: bloodGroup,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
      unique: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    designation: { type: String, required: true },
    managementDepartment: { type: Schema.Types.ObjectId, required: true },
    profileImage: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);
export const Admin = model<IAdmin>('admin', adminSchema);
