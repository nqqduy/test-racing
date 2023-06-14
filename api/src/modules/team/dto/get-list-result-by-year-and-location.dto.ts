export class GetListResultByYearAndLocationDTO {
  year?: string;
  team?: string;
  constructor(data: { year?: string; team?: string }) {
    this.year = data.year;
    this.team = data.team;
  }
}
