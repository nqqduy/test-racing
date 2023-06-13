import { NextFunction, Request, Response } from "express";
import { BaseController } from "../base.controller";
import { RaceService } from "./race.service";
import { GetListResultByYearDTO } from "./dto/get-list-result-by-year.dto";
import { IGetListResultByYear } from "./interfaces/get-list-result-by-year.interface";

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
        ...req.query,
      });
      const result = await this.raceService.getListResult(data);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };
  public routes() {
    this.router.get("/:year/result", this.getListResult);
  }
}
