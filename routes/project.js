import { Router } from "express";

import {
  newProjectController,
  projectCreateController
} from "../controllers/newProjectController";

const projectRoute = new Router();

projectRoute.get("/create", newProjectController);
projectRoute.get("/create/action", projectCreateController);

export default projectRoute;
