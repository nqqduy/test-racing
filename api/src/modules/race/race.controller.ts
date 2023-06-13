import { BaseController } from "../base.controller";
import { RaceService } from "./race.service";

export class RaceController extends BaseController {
  private raceService: RaceService;
  constructor() {
    super();
    this.setup();
    this.raceService = RaceService.getInstance();
  }

  public routes() {}
}
