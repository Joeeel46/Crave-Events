import { Request,Response } from "express";

export interface IAuthController{
    login(req:Request,res:Response):Promise<void>
    logout(req:Request,res:Response):Promise<void>
    register(req:Request,res:Response):Promise<void>
    sendOtpEmail(req:Request,res:Response):Promise<void>
    authenticateWithGoogle(req: Request, res: Response): Promise<void>
    verifyOtp(req: Request, res: Response): Promise<void>
    forgetPassword(req: Request, res: Response): Promise<void>
}