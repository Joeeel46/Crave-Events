import { Schema } from 'mongoose'
import { roles } from '../../../shared/constants';
import { IVendorModel } from '../models/vendor.model'

export const vendorSchema = new Schema<IVendorModel>({
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
        default: "vendor"
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    googleVerified: {
        type: Boolean,
        default: false,
        required: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    idProof:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["active",'blocked',"pending"],
        default:'pending'
    },
    aboutVendor:{
        type: String,
        required:false
    },
}, {
    timestamps: true
});
