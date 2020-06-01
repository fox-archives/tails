import * as http from "std/http/mod.ts"
// import { app } from "./app.ts";
import { app } from './router.ts'

const port = Number(Deno.env.get("PORT")) || 9020;

console.info(`listening on port ${port}`)
// await app.listen({ port });
const server = http.serve({ port });
for await (const req of server) {
  app(req);
}
