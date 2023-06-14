import { NextFunction, Request, Response } from "express";
import { BaseController } from "../base.controller";
import { RaceService } from "./race.service";
import { GetListResultByYearDTO } from "./dto/get-list-result-by-year.dto";
import { GetListResultByYearAndLocationDTO } from "./dto/get-list-result-by-location.dto";
import { Response as dataResponse } from "../../common/response";

export class RaceController extends BaseController {
  private raceService: RaceService;
  constructor() {
    super();
    this.setup();
    this.raceService = RaceService.getInstance();
  }

  private getListResult = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = new GetListResultByYearDTO({
        year: req.params.year,
      });
      const result = await this.raceService.getListResult(data);

      return res.status(200).send(dataResponse.Success(result));
    } catch (error) {
      next(error);
    }
  };
  private getListResultByYearAndLocation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = new GetListResultByYearAndLocationDTO({
        year: req.params.year,
        ...req.query,
      });
      const result = await this.raceService.getListResultByYearAndLocation(
        data
      );

      return res.status(200).send(dataResponse.Success(result));
    } catch (error) {
      next(error);
    }
  };

  public routes() {
    this.router.get("/:year/result", this.getListResult);
    this.router.get("/result", this.getListResultByYearAndLocation);
  }
}
