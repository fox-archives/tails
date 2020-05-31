import * as http from "std/http/mod.ts";
import {
  readAllNamespaces,
  readAllProjects,
} from "./util/read.ts";

const fmt = (text: string) => new TextEncoder().encode(text);

export async function app(req: http.ServerRequest) {
  if (req.url === "/") {
    const body = fmt("done");

    req.respond({ body, status: 200 });
  } else if (req.url === "/api/data") {
    let [namespaces, projects] = await Promise.all([
      readAllNamespaces(),
      readAllProjects(),
    ]);

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
