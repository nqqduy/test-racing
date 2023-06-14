import { GetListResultByYearAndLocationDTO } from "./dto/get-list-result-by-location.dto";
import { GetListResultByYearDTO } from "./dto/get-list-result-by-year.dto";
import { IGetListResultByYearAndLocation } from "./interfaces/get-list-result-by-year-location.interface copy";
import { IGetListResultByYear } from "./interfaces/get-list-result-by-year.interface";
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

  public getListResult = async (
    data: GetListResultByYearDTO
  ): Promise<IGetListResultByYear[]> => {
    let where: string[] = [`crawl.year = '${data.year}'`];

    const result = await this.raceRepository.getListResultByYear(where);
    const responseData: IGetListResultByYear[] = result.map((item, index) => {
      item = JSON.parse(JSON.stringify(item));
      return {
        grandPrix: item.location,
        date: item.date,
        winner: item.driver,
        car: item.car,
        laps: item.laps,
        time: item.retired,
      };
    });

    return responseData;
  };

  public getListResultByYearAndLocation = async (
    data: GetListResultByYearAndLocationDTO
  ): Promise<IGetListResultByYearAndLocation[]> => {
    let where: string[] = [];

    if (data.year) {
      where.push(`crawl.year = '${data.year}'`);
    }

    if (data.location) {
      let locations = data.location.split(" ");
      let locationsConditional = locations.map(
        (item) => `crawl.location LIKE '%${item.toLowerCase()}%'`
      );
      where.push(locationsConditional.join(" AND "));
    }

    const result = await this.raceRepository.getListResultByYearAndLocation(
      where
    );

    const responseData: IGetListResultByYearAndLocation[] = result.map(
      (item, index) => {
        item = JSON.parse(JSON.stringify(item));
        return {
          pos: item.pos,
          no: item.no,
          driver: item.driver,
          car: item.car,
          laps: item.laps,
          time: item.retired,
          pts: Number(item.pts),
        };
      }
    );

    return responseData;
  };
}
