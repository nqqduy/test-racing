import { Repository } from "typeorm";
import { AppDataSource } from "../../config/typeorm";
import { ResultCrawl } from "../../schemas/result-crawl";

export class RaceRepository {
  private static raceRepository: RaceRepository;
  private crawlingRepo: Repository<ResultCrawl>;

  private init() {
    this.crawlingRepo = AppDataSource.getRepository(ResultCrawl);
  }
  public static getInstance() {
    if (!this.raceRepository) {
      this.raceRepository = new RaceRepository();
      this.raceRepository.init();
    }
    return this.raceRepository;
  }

  public async getListResultByYear(where: string[]) {
    where.push(`crawl.pos = '1'`);

    const result = await this.crawlingRepo
      .createQueryBuilder("crawl")
      .select([
        "crawl.location AS location",
        "crawl.date as date",
        "crawl.laps as laps",
        "crawl.driver as driver",
        "crawl.car as car",
        "crawl.retired as retired",
      ])
      .where(where.join(" AND "))
      .orderBy("crawl.id", "ASC")
      .getRawMany();

    return result;
  }

  public async getListResultByYearAndLocation(where: string[]) {
    const result = await this.crawlingRepo
      .createQueryBuilder("crawl")
      .select([
        "crawl.pos AS pos",
        "crawl.no as no",
        "crawl.driver as driver",
        "crawl.car as car",
        "crawl.laps as laps",
        "crawl.retired as retired",
        "crawl.pts as pts",
      ])
      .where(where.join(" AND "))
      .orderBy("crawl.id", "ASC")
      .getRawMany();

    return result;
  }
}
