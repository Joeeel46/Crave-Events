import { injectable } from "tsyringe";
import { IVendorModel, VendorModel } from "../../../frameworks/database/models/vendor.model";
import { BaseRepository } from "../base.repository";
import { IVendorRepository } from "../../../domain/interface/repository/users/vendor.repository.interface";
import { IVendorEntity } from "../../../domain/entities/vendor.entity";

@injectable()
export class VendorRepository extends BaseRepository<IVendorModel> implements IVendorRepository {
  constructor() {
    super(VendorModel)
  }

  async updateFcmToken(userId: string, token: string): Promise<void> {
    await VendorModel.updateOne({ userId }, { $set: { fcmToken: token } });
  }

  async clearFcmToken(userId: string): Promise<void> {
    await VendorModel.updateOne({ userId }, { $unset: { fcmToken: "" } });
  }

  async vendorSave(data: IVendorModel): Promise<void> {
    const vendorDoc = await data.save()
  }

  async VendorfindOne(userId: string): Promise<IVendorModel | null> {
    return this.model.findOne({ userId })
  }

  async BookingDates(userId: string): Promise<IVendorModel | null> {
    return this.model.findOne({ userId }, { bookedDates: 1 })
  }

  async findById(userId: string): Promise<IVendorEntity | null> {
    return await VendorModel.findById(userId);
  }
}