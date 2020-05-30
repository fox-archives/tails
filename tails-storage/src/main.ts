import * as path from "https://deno.land/std@v0.53.0/path/mod.ts";
import { serve } from "https://deno.land/std@v0.53.0/http/server.ts";

const fmt = (text: string) => new TextEncoder().encode(text);

const port = Number(Deno.env.get("PORT")) || 9000;
const s = serve({ port });
console.info(`on port ${port}`);

for await (const req of s) {
  if (req.url === "/") {
    const body = fmt("done");

    req.respond({ body, status: 200 });
  } else if (req.url === "/api/data") {
    const home = Deno.env.get("HOME");
    // TODO: when throw expressions land in typescript
    if (!home) throw new Error("home not defined in environment");

    let namespaces: Array<Deno.DirEntry> = [];
    for await (const namespace of Deno.readDir(path.join(home, "repos"))) {
      namespaces.push(namespace);
    }
    namespaces = namespaces.filter((namespace) =>
      namespace.name.startsWith("_")
    );

    let projects: Array<Deno.DirEntry> = [];
    for await (const project of Deno.readDir(path.join(home, "repos"))) {
      projects.push(project);
    }
    projects = projects.filter((project) => !project.name.startsWith("_"));

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
  } else if (req.url === "/api/projects") {
  } else {
    const body = fmt("Not Found");

    const headers = new Headers();
    headers.set("status", "404");

    req.respond({ body, headers, status: 404 });
  }
}
