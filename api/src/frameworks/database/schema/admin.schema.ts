import { Schema } from 'mongoose'
import { IAdminModel } from '../models/admin.model';
import { roles } from '../../../shared/constants';

export const adminSchema = new Schema<IAdminModel>({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  role: {
    type: String,
    enum: roles,
    default: "admin"
  },
  isSuperAdmin: { 
    type: Boolean, 
    default: false 
  }, 
});