import { DriverRepository } from "./driver.repository";

export class DriverService {
  private static driverService: DriverService;

  private driverRepository: DriverRepository;
  private init() {
    this.driverRepository = DriverRepository.getInstance();
  }
  public static getInstance() {
    if (!this.driverService) {
      this.driverService = new DriverService();
      this.driverService.init();
    }
    return this.driverService;
  }
}
