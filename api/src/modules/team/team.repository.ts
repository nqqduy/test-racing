import { Repository } from "typeorm";
import { ResultCrawl } from "../../schemas/result-crawl";
import { AppDataSource } from "../../config/typeorm";

export class TeamRepository {
  private static teamRepository: TeamRepository;
  private crawlingRepo: Repository<ResultCrawl>;

  private init() {
    this.crawlingRepo = AppDataSource.getRepository(ResultCrawl);
  }
  public static getInstance() {
    if (!this.teamRepository) {
      this.teamRepository = new TeamRepository();
      this.teamRepository.init();
    }
    return this.teamRepository;
  }

  public async getListRank(where: string[]): Promise<ResultCrawl[]> {
    const result = await this.crawlingRepo
      .createQueryBuilder("crawl")
      .select([
        "ANY_VALUE(crawl.id) AS id",
        "SUM(crawl.pts) AS pts",
        "ANY_VALUE(crawl.car) AS car",
      ])
      .where(where.join(" AND "))
      .orderBy("SUM(crawl.pts) DESC, ANY_VALUE(crawl.driver)", "ASC")
      .groupBy("crawl.car")
      .getRawMany();

    return result;
  }
}
