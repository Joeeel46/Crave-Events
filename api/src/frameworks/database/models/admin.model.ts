import { Document, model, ObjectId } from "mongoose";
import { adminSchema } from "../schema/admin.schema";
import { IAdminEntity } from "../../../domain/entities/admin.entity";

export interface IAdminModel extends IAdminEntity, Document {
	_id: ObjectId;
}

export const AdminModel = model<IAdminModel>("Admin", adminSchema);
