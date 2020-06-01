import type { ServerRequest } from "std/http/mod.ts";

import { Application } from "./util/Application.ts";
import {
  rootController,
  apiDataController,
  graphQlPostController,
  graphQlGetController,
  serveStatic,
  fourOhFourController,
} from "./controllers/rootControllers.ts";

async function fn(req: ServerRequest) {
  if (req.url === "/") {
    await rootController(req);
  } else if (req.url === "/api/data" && req.method === "GET") {
    await apiDataController(req);
  } else if (req.url === "/graphql" && req.method === "GET") {
    await graphQlGetController(req);
  } else if (req.url === "/graphql" && req.method === "POST") {
    await graphQlPostController(req);
  } else if (req.url === "/assets/prism.js") {
    await serveStatic(req, "prism.js");
  } else if (req.url === "/assets/prism.css") {
    await serveStatic(req, "prism.css");
  } else {
    await fourOhFourController(req);
  }
}

const app = new Application(fn);

export { app };
