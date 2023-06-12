import { BaseController } from "../base.controller";
import { DriverService } from "./driver.service";

export class DriverController extends BaseController {
  private driverService: DriverService;
  constructor() {
    super();
    this.setup();
    this.driverService = DriverService.getInstance();
  }

  public routes() {
    // this.router.get("/", validator(ArtworkListDTO), this.getList);
    // this.router.get("/:id(\\d+)", this.getOne);
    // this.router.post("/", validator(ArtworkCreateDTO), this.create);
    // this.router.delete("/:id(\\d+)", this.delete);
  }
}
