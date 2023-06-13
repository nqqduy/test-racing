import { Router } from "express";

export abstract class BaseController {
  public router: Router;
  constructor() {
    this.router = Router();
  }

  protected setup() {
    this.routes();
  }

  abstract routes(): void;
}
