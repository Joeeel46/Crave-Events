import "reflect-metadata";
// import "./frameworks/di/resolver";

// Module imports
import { Server } from "./frameworks/http/server";
import { config } from "./shared/config";
import { conncetMongo } from "./frameworks/database/connection/dbConnection";

// Instance creation
const server = new Server();
const mongoConnect = new conncetMongo();

// Database connection
mongoConnect.connectDB();

// Start the server
const port = Number(config.server.PORT) || 5003;
server.start(port);
