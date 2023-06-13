import { GetListRankDTO } from "./dto/get-list-rank.dto";
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
}
