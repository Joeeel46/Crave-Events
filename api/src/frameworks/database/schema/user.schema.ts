import { Schema } from 'mongoose'
import { IClientModel } from '../models/client.model'
import { roles } from '../../../shared/constants';

export const clientSchema = new Schema<IClientModel>({
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
    default: "client"
  },
  status: {
    type: String,
    enum: ["active", "blocked"],
    default: "active"
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  googleVerified: {
    type: Boolean,
    default: false,
    required: false
  }
}, {
  timestamps: true
});
