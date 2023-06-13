export class GetListResultByYearDTO {
  year: string;
  location?: string;
  constructor(data: { year: string; location?: string }) {
    this.year = data.year;
    this.location = data.location;
  }
}
