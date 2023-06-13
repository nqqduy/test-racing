export class GetListRankDTO {
  year?: string;

  constructor(data: { year?: string }) {
    this.year = data.year;
  }
}
