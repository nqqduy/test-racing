import { DriverRepository } from "./driver.repository";
import { GetListDTO } from "./dto/get-list.dto";

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

  public getList = async (data: GetListDTO) => {
    let where: string[] = [];
    if (data.year) {
      where.push(`crawl.year = '${data.year}'`);
    }
    if (data.location) {
      let locations = data.location.split(" ");
      let locationsConditional = locations.map(
        (item) => `crawl.location LIKE '%${item}%'`
      );
      where.push(locationsConditional.join(" AND "));
    }
    const result = await this.driverRepository.getList(where);

    return result;
  };
}
