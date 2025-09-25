import { Document, model, ObjectId } from "mongoose";
import { vendorSchema } from "../schema/vendor.schema";
import { IVendorEntity } from "../../../domain/entities/vendor.entity";

export interface IVendorModel extends IVendorEntity, Document {
   _id: ObjectId;
}

export const VendorModel = model<IVendorModel>("Vendor", vendorSchema);
