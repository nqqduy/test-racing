export class RaceRepository {
  private static raceRepository: RaceRepository;
  private init() {
    // this.artworkRepository = new ArtworkRepository();
    // this.artworkRepository.init();
  }
  public static getInstance() {
    if (!this.raceRepository) {
      this.raceRepository = new RaceRepository();
      this.raceRepository.init();
    }
    return this.raceRepository;
  }
}
