import { RaceRepository } from "./race.repository";

export class RaceService {
  private static raceService: RaceService;

  private raceRepository: RaceRepository;
  private init() {
    this.raceRepository = RaceRepository.getInstance();
  }
  public static getInstance() {
    if (!this.raceService) {
      this.raceService = new RaceService();
      this.raceService.init();
    }
    return this.raceService;
  }
}
