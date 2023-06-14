import { NextFunction, Request, Response } from "express";
import { BaseController } from "../base.controller";
import { TeamService } from "./team.service";
import { IGetListRankTeam } from "./interfaces/get-list-rank.interface";
import { GetListRankDTO } from "./dto/get-list-rank.dto";
import { GetListResultByYearAndLocationDTO } from "./dto/get-list-result-by-year-and-location.dto";
import { Response as dataResponse } from "../../common/response";

export class TeamController extends BaseController {
  private teamService: TeamService;
  constructor() {
    super();
    this.setup();
    this.teamService = TeamService.getInstance();
  }

  private getListRank = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = new GetListRankDTO({ ...req.query });
      const result = await this.teamService.getListRank(data);

      const responseData: IGetListRankTeam[] = result.map((item, index) => {
        item = JSON.parse(JSON.stringify(item));
        return {
          pos: index + 1,
          team: item.car,
          pts: Number(item.pts),
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
      const result = await this.teamService.getListResultByYearAndLocation(
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
