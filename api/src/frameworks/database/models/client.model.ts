import { Document, model, ObjectId } from "mongoose";
import { clientSchema } from "../schema/user.schema";
import { IClientEntity } from "../../../domain/entities/client.entity";

export interface IClientModel extends IClientEntity, Document {
   _id: ObjectId;
}

export const ClientModel = model<IClientModel>("Client", clientSchema);
