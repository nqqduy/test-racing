import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import { createServer, Server as HttpServer } from "http";
import { SERVER_PORT, SERVER_PREFIX } from "./constants/enviroment";
import { AppDataSource } from "./config/typeorm";

import { DriverController } from "./modules/driver/driver.controller";
import { RaceController } from "./modules/race/race.controller";
import { TeamController } from "./modules/team/team.controller";

class Server {
  private app: express.Application;
  private httpServer: HttpServer;
  private driverController: DriverController;
  private raceController: RaceController;
  private teamController: TeamController;

  constructor() {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.configuration();

    this.initController();

    this.routes();
  }
  public initController() {
    this.driverController = new DriverController();
    this.raceController = new RaceController();
    this.teamController = new TeamController();
  }

  public configuration() {
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(cors());
    this.app.set("port", SERVER_PORT);
  }

  public routes() {
    this.app.use(`/${SERVER_PREFIX}/drivers`, this.driverController.router);
    this.app.use(`/${SERVER_PREFIX}/races`, this.raceController.router);
    this.app.use(`/${SERVER_PREFIX}/teams`, this.teamController.router);

    this.app.get(`/${SERVER_PREFIX}/`, (req: Request, res: Response) => {
      res.send({
        hello: "Racing F1",
      });
    });

    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        res.status(500).send({
          result: false,
          message: err.message,
          data: null,
          errorCode: "INTERNAL_SV_ERR",
        });
      }
    );
  }

  async start() {
    try {
      await AppDataSource.initialize();

      this.httpServer.listen(this.app.get("port"), () => {
        console.log(
          `Server is listening on http://localhost:${this.app.get(
            "port"
          )}/${SERVER_PREFIX}.`
        );
      });
    } catch (error) {
      console.log(error);
    }
  }
}

const server = new Server();
server.start();
