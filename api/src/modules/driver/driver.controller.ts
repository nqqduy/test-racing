import { NextFunction, Response, Request } from "express";
import { BaseController } from "../base.controller";
import { DriverService } from "./driver.service";
import { IGetListRankDriver } from "./interfaces/get-list-rank.interface";
import { GetListDTO } from "./dto/get-list.dto";
import { GetListResultByYearAndLocationDTO } from "./dto/get-list-result-by-year-and-location.dto";
import { Response as dataResponse } from "../../common/response";

export class DriverController extends BaseController {
  private driverService: DriverService;
  constructor() {
    super();
    this.setup();
    this.driverService = DriverService.getInstance();
  }

  private getListRank = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = new GetListDTO({ ...req.query });
      const result = await this.driverService.getList(data);

      const responseData: IGetListRankDriver[] = result.map((item, index) => {
        item = JSON.parse(JSON.stringify(item));
        return {
          pos: index + 1,
          driver: item.driver,
          pts: Number(item.pts),
          nationality: item.nationality,
          car: item.car,
        };
      });

      return res.status(200).send(dataResponse.Success(responseData));
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
        ...req.query,
      });
      const result = await this.driverService.getListResultByYearAndLocation(
        data
      );

      return res.status(200).send(dataResponse.Success(result));
    } catch (error) {
      next(error);
    }
  };
  public routes() {
    this.router.get("/ranking", this.getListRank);
    this.router.get("/result", this.getListResultByYearAndLocation);
  }
}
