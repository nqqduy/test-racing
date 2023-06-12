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
}
