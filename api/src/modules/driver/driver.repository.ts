import { ResultCrawl } from "../../schemas/result-crawl";
import { AppDataSource } from "../../config/typeorm";
import { Repository } from "typeorm";

export class DriverRepository {
  private static driverRepository: DriverRepository;
  private crawlingRepo: Repository<ResultCrawl>;

  private init() {
    this.crawlingRepo = AppDataSource.getRepository(ResultCrawl);
  }
  public static getInstance() {
    if (!this.driverRepository) {
      this.driverRepository = new DriverRepository();
      this.driverRepository.init();
    }
    return this.driverRepository;
  }

  public getList = async (where: string[]): Promise<ResultCrawl[]> => {
    const result = await this.crawlingRepo
      .createQueryBuilder("crawl")
      .select([
        "crawl.driver AS driver",
        "SUM(crawl.pts) AS pts",
        "crawl.nationality AS nationality",
        "crawl.car AS car",
      ])
      .where(where.join(" AND "))
      .orderBy("SUM(crawl.pts) DESC, crawl.driver", "ASC")
      .groupBy("crawl.driver")
      .getRawMany();

    return result;
  };
}
