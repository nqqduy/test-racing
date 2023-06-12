export class DriverRepository {
  private static driverRepository: DriverRepository;
  private init() {
    // this.artworkRepository = new ArtworkRepository();
    // this.artworkRepository.init();
  }
  public static getInstance() {
    if (!this.driverRepository) {
      this.driverRepository = new DriverRepository();
      this.driverRepository.init();
    }
    return this.driverRepository;
  }
}
