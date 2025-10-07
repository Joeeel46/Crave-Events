import { Request, RequestHandler, Response, Router } from "express";
import { verifyAuth } from "../../../interfaceAdapters/middleware/auth.middleware";
import { authController } from "../../di/resolver";
import { blockStatusMiddleware } from "../../di/resolver";


export class VendorRoute {
    public vendorRoute: Router;

    constructor() {
        this.vendorRoute = Router()
        this.setRoute()
    }
    private setRoute(): void {

        this.vendorRoute.post('/vendor/logout',
            verifyAuth,
            //  authorizeRole(["vendor"])
            blockStatusMiddleware.checkStatus as RequestHandler,
            (req: Request, res: Response) => {
                authController.logout(req, res)
            })
    }
}