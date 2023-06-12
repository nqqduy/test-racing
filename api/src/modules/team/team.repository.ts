export class TeamRepository {
  private static teamRepository: TeamRepository;
  private init() {
    // this.artworkRepository = new ArtworkRepository();
    // this.artworkRepository.init();
  }
  public static getInstance() {
    if (!this.teamRepository) {
      this.teamRepository = new TeamRepository();
      this.teamRepository.init();
    }
    return this.teamRepository;
  }
}
