import * as http from "std/http/mod.ts";
import * as path from "std/path/mod.ts";
import {
  readProjects,
  readNamespaces,
  readAllNamespaces,
  readAllProjects,
} from "./util/read.ts";

const fmt = (text: string) => new TextEncoder().encode(text);

const ns = await readAllNamespaces();
console.info("namespaces", ns);

export async function app(req: http.ServerRequest) {
  if (req.url === "/") {
    const body = fmt("done");

    req.respond({ body, status: 200 });
  } else if (req.url === "/api/data") {
    const home = Deno.env.get("HOME");
    // TODO: when throw expressions land in typescript
    if (!home) throw new Error("home not defined in environment");

    let namespaces = await readAllNamespaces();
    let projects = await readAllProjects();

    const body = fmt(JSON.stringify({
      data: {
        namespaces,
        projects,
      },
    }));

    const headers = new Headers();
    headers.set("content-type", "application/json; charset=utf-8");
    headers.set("x-content-type-options", "nosniff");

    req.respond({ body, headers, status: 200 });
  } else {
    const body = fmt("Not Found");

    const headers = new Headers();
    headers.set("status", "404");

    req.respond({ body, headers, status: 404 });
  }
}
