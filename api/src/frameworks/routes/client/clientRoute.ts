import { Request, RequestHandler, Response, Router } from "express";
import { authController } from "../../di/resolver";
import { decodeToken, verifyAuth } from "../../../interfaceAdapters/middleware/auth.middleware";
import { blockStatusMiddleware } from "../../di/resolver";



export class ClientRoute {
  public clientRoute: Router;

  constructor() {
    this.clientRoute = Router()
    this.setRoute()
  }
  private setRoute(): void {

    this.clientRoute.post('/client/logout',
      verifyAuth,
      blockStatusMiddleware.checkStatus as RequestHandler,
      (req: Request, res: Response) => {
        authController.logout(req, res)
      })
  }
}