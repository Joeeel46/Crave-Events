import cors from "cors";
import helmet from "helmet";
import express, { Application, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { config } from "../../shared/config";
import { AuthRoutes } from "../routes/auth/auth.route";
import { ClientRoute } from "../routes/client/clientRoute";
import { VendorRoute } from "../routes/vendor/VendorRoute";
import { AdminRoute } from "../routes/admin/adminRoute";
import { createServer, Server as HTTPServer } from "http";


export class Server {
  private _app: Application;
  private _httpServer: HTTPServer;

  constructor() {
    this._app = express();
    this._httpServer = createServer(this._app);

    this.configureMiddlewares();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  private configureMiddlewares(): void {
    this._app.use(morgan(config.loggerStatus));
    this._app.use(helmet());
    this._app.use(
      cors({
        origin: config.cors.ALLOWED_ORGIN,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Authorization", "Content-Type"],
        credentials: true,
      })
    );
    this._app.use(cookieParser());
    this._app.use(express.json());
    this._app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 1000,
      })
    );
  }

  private configureRoutes(): void {
    this._app.use("/api/v_1/auth", new AuthRoutes().router);
    this._app.use('/api/v_1/_cl', new ClientRoute().clientRoute)
    this._app.use('/api/v_1/_ad', new AdminRoute().adminRoute)
    this._app.use('/api/v_1/_ve', new VendorRoute().vendorRoute)
  }

  private configureErrorHandling(): void {
    this._app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        const statusCode = err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        res.status(statusCode).json({
          success: false,
          statusCode,
          message,
        });
      }
    );
  }

  public start(port: number): void {
    this._httpServer.listen(port, () => {
      console.log(`🚀 Server is running at port ${port}`);
    });
  }
}