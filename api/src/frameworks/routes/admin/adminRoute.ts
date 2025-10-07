import { Request, RequestHandler, Response, Router } from "express";
import { authController, blockStatusMiddleware } from "../../di/resolver";
import { verifyAuth } from "../../../interfaceAdapters/middleware/auth.middleware";


export class AdminRoute {
  public adminRoute: Router;

  constructor() {
    this.adminRoute = Router()
    this.setRoute()
  }
  private setRoute(): void {
    this.adminRoute.post("/admin/logout", verifyAuth,
      blockStatusMiddleware.checkStatus as RequestHandler,
      (req: Request, res: Response) => {
        authController.logout(req, res)
      })
  }
} 