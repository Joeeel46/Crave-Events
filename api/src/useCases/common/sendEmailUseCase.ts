import { inject, injectable } from "tsyringe";
import { ISendEmailUseCase } from "../../domain/interface/useCase/common/ISendEmailUseCase";
import { IEmailService } from "../../domain/interface/services/IEmailService";



@injectable()
export class SendEmailUseCase implements ISendEmailUseCase{
    constructor(
      @inject("IEmailService")
      private _emailSerivice: IEmailService
    ) {}

    async execute(to: string, subject: string, content: string): Promise<void> {
       await this._emailSerivice.sendCustomEmail(to,subject,content)
    }
}