import { DriverRepository } from "./driver.repository";
import { GetListResultByYearAndLocationDTO } from "./dto/get-list-result-by-year-and-location.dto";
import { GetListDTO } from "./dto/get-list.dto";
import { IGetListResultByYearAndLocation } from "./interfaces/get-list-result-by-year-location.interface copy";

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

  public getListResultByYearAndLocation = async (
    data: GetListResultByYearAndLocationDTO
  ) => {
    let where: string[] = [];
    if (data.year) {
      where.push(`crawl.year = '${data.year}'`);
    }
    if (data.driver) {
      let drivers = data.driver.split(" ");
      let driversConditional = drivers.map(
        (item) => `crawl.driver LIKE '%${item.toLowerCase()}%'`
      );
      where.push(driversConditional.join(" AND "));
    }

    const result = await this.driverRepository.getListResultByYearAndLocation(
      where
    );

    const responseData: IGetListResultByYearAndLocation[] = result.map(
      (item) => ({
        grandPrix: item.location,
        date: item.date,
        car: item.car,
        racePosition: item.pos,
        pts: item.pts,
      })
    );
    return responseData;
  };
}
