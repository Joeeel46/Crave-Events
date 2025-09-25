import { Document, model, ObjectId } from "mongoose";
import { refreshTokenSchema } from "../schema/refreshToken.schema";
import { IRefreshTokenEntity } from "../../../domain/entities/refreshToken.entity";
export interface IRefreshTokenModel extends IRefreshTokenEntity, Document {
	_id: ObjectId;
}

export const RefreshTokenModel = model<IRefreshTokenModel>(
	"RefreshToken",
	refreshTokenSchema
);
