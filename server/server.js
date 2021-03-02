import express from "express";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import cors from "cors";
// import { contactsController } from "./contacts/contacts.controller.js";
import { getPaths } from "./helpers/utils.js"
import { messagesRouters } from "./messages/messages.controller.js";

const { __dirname } = getPaths(import.meta.url);


export class ContactsServer {
  constructor() {
    this.server = null;
  }

  start() {
    this.initServer();
    this.initConfig();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }
  initConfig() {

    
    dotenv.config({ path: path.join(__dirname, "../.env") });
    
  }
  initMiddlewares() {
    
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(morgan("combined"));
    this.server.use(express.static(path.join(__dirname, '../build')))
  }

  initRoutes() {
this.server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
    this.server.use("/messages", messagesRouters);
    
  }

  initErrorHandling() {
    this.server.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      res.status(statusCode).send(err.message);
    });
  }

  startListening() {
    const { PORT } = process.env;
    this.server.listen(PORT, () => {
      console.log("Server started listening on port", PORT);
    });
  }
}