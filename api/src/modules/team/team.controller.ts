import { BaseController } from "../base.controller";
import { TeamService } from "./team.service";

export class TeamController extends BaseController {
  private teamService: TeamService;
  constructor() {
    super();
    this.setup();
    this.teamService = TeamService.getInstance();
  }

  public routes() {
    // this.router.get("/", validator(ArtworkListDTO), this.getList);
    // this.router.get("/:id(\\d+)", this.getOne);
    // this.router.post("/", validator(ArtworkCreateDTO), this.create);
    // this.router.delete("/:id(\\d+)", this.delete);
  }
}
