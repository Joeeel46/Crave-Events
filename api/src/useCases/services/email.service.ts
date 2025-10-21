
import { IEmailService } from "../../domain/interface/services/IEmailService";
import nodemailer from 'nodemailer'
import { injectable } from "tsyringe";
import { VERIFICATION_MAIL_CONTENT } from "../../shared/constants";



@injectable()
export class EmailService implements IEmailService {

  private _transporter;

  constructor() {

    this._transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })
  }

  private async _sendMail(mailOptions: {
    from: string;
    to: string;
    subject: string;
    html: string;
  }) {
    const info = await this._transporter.sendMail(mailOptions);
    console.log('Email sent', info.response)
  }



  async sendOtpEmail(email: string, subject: string, otp: string): Promise<void> {
    try {
      console.log(email, subject, otp)
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: VERIFICATION_MAIL_CONTENT(otp)
      }

      await this._transporter.sendMail(mailOptions)
      console.log(`OTP sent to ${email}`)

    } catch (error) {
      console.error("Error sending OTP email:", error)
    }
  }

  async sendCustomEmail(
    to: string,
    subject: string,
    content: string
  ): Promise<void> {
    console.log(process.env.EMAIL_USER as string)
    const mailOptions = {
      from: process.env.EMAIL_USER as string,
      to,
      subject,
      html: content,
    };
    await this._sendMail(mailOptions);
  }
}