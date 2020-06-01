import { app } from "./app.ts";

const port = Number(Deno.env.get("PORT")) || 9020;

await app.listen(port, () => console.log(`listening on port ${port}`));
