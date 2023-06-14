import { GetListRankDTO } from "./dto/get-list-rank.dto";
import { GetListResultByYearAndLocationDTO } from "./dto/get-list-result-by-year-and-location.dto";
import { IGetListResultByYearAndLocation } from "./interfaces/get-list-result-by-year-location.interface copy";
import { TeamRepository } from "./team.repository";

export class TeamService {
  private static teamService: TeamService;

  private teamRepository: TeamRepository;
  private init() {
    this.teamRepository = TeamRepository.getInstance();
  }
  public static getInstance() {
    if (!this.teamService) {
      this.teamService = new TeamService();
      this.teamService.init();
    }
    return this.teamService;
  }

  public async getListRank(data: GetListRankDTO) {
    let where: string[] = [];
    if (data.year) {
      where.push(`crawl.year = '${data.year}'`);
    }
    const result = await this.teamRepository.getListRank(where);
    return result;
  }

  public async getListResultByYearAndLocation(
    data: GetListResultByYearAndLocationDTO
  ) {
    let where: string[] = [];
    if (data.year) {
      where.push(`crawl.year = '${data.year}'`);
    }
    if (data.team) {
      let drivers = data.team.split(" ");
      let driversConditional = drivers.map(
        (item) => `crawl.car LIKE '%${item.toLowerCase()}%'`
      );
      where.push(driversConditional.join(" AND "));
    }

    const result = await this.teamRepository.getListResultByYearAndLocation(
      where
    );

    const responseData: IGetListResultByYearAndLocation[] = result.map(
      (item) => ({
        grandPrix: item.location,
        date: item.date,
        pts: Number(item.pts),
      })
    );
    return responseData;
  }
}
