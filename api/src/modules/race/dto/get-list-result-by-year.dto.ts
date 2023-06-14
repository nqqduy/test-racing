export class GetListResultByYearDTO {
  year: string;
  constructor(data: { year: string }) {
    this.year = data.year;
  }
}
