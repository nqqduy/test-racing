import { BaseController } from "../base.controller";
import { RaceService } from "./race.service";

export class RaceController extends BaseController {
  private raceService: RaceService;
  constructor() {
    super();
    this.setup();
    this.raceService = RaceService.getInstance();
  }

  public routes() {
    // this.router.get("/", validator(ArtworkListDTO), this.getList);
    // this.router.get("/:id(\\d+)", this.getOne);
    // this.router.post("/", validator(ArtworkCreateDTO), this.create);
    // this.router.delete("/:id(\\d+)", this.delete);
  }
}
