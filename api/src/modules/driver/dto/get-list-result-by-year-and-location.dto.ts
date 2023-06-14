export class GetListResultByYearAndLocationDTO {
  year?: string;
  driver?: string;
  constructor(data: { year?: string; driver?: string }) {
    this.year = data.year;
    this.driver = data.driver;
  }
}
