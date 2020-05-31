import * as http from "https://deno.land/std@v0.54.0/http/mod.ts";

import { app } from "./app.ts";

const port = Number(Deno.env.get("PORT")) || 9020;

const server = http.serve({ port });
console.info(`on port ${port}`);

for await (const req of server) {
  app(req);
}
