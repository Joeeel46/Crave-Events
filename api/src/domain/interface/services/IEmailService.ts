export interface IEmailService {
  sendCustomEmail(to: string, subject: string, content: string): Promise<void>;
  sendOtpEmail(email: string , subject: string, otp: string):Promise<void>
}