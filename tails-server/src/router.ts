import * as http from "std/http/mod.ts";
import * as path from "std/path/mod.ts";
// import { Router } from "pkg/oak/mod.ts";
// import type { Context } from "pkg/oak/mod.ts";
import {
  readAllNamespaces,
  readAllProjects,
} from "./util/read.ts";
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from 'https://cdn.pika.dev/graphql@^15.0.0';

let _dirname = path.dirname(new URL(import.meta.url).pathname);

const decode = (buf: ArrayBuffer) => (new TextDecoder()).decode(buf)
const encode = (text: string) => new TextEncoder().encode(text);

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        },
      },
    },
  }),
});
// const router = new Router();

// router.get("/", (ctx: Context) => {
//   console.log(ctx.request)
// });

export async function app(req: http.ServerRequest) {
  if (req.url === "/") {
    const body = encode("done");

    req.respond({ body, status: 200 });
  } else if (req.url === "/api/data" && req.method === "GET") {
    let [namespaces, projects] = await Promise.all([
      readAllNamespaces(),
      readAllProjects(),
    ]);

    const body = encode(JSON.stringify({
      data: {
        namespaces,
        projects,
      },
    }));

    const headers = new Headers();
    headers.set("content-type", "application/json; charset=utf-8");
    headers.set("x-content-type-options", "nosniff");

    req.respond({ body, headers, status: 200 });
  } else if (req.url === "/graphql" && req.method === "GET") {
    const body = encode(await Deno.readTextFile(path.join(_dirname, './assets/graphql.html')))

    const headers = new Headers()
    headers.set("content-type", "text/html; charset=utf-8");
    headers.set("x-content-type-options", "nosniff");
    
    req.respond({ body, headers, status: 200 });

  }
  else if (req.url === "/graphql" && req.method === "POST") {
    const query = decode(await Deno.readAll(req.body));
    const result = <object> await graphql(schema, query)
    const body = encode(JSON.stringify(result, null, 2))

    const headers = new Headers();
    headers.set("content-type", "application/json; charset=utf-8");
    headers.set("x-content-type-options", "nosniff");
    
    req.respond({ body, headers, status: 200 });
  } else if (req.url === "/assets/prism.js") {
    const body = await Deno.readTextFile(path.join(_dirname, './assets/prism.js'))

    const headers = new Headers();
    headers.set("content-type", "application/javascript; charset=utf-8");
    headers.set("x-content-type-options", "nosniff");

    req.respond({ body, headers, status: 200 });
    headers.set("x-content-type-options", "nosniff");
  } else if (req.url === "/assets/prism.css") {
    const body = await Deno.readTextFile(path.join(_dirname, './assets/prism.css'))

    const headers = new Headers();
    headers.set("content-type", "text/css; charset=utf-8");
    headers.set("x-content-type-options", "nosniff");

    req.respond({ body, headers, status: 200 });
  } else {
    console.info(`not found: ${req.url}`)
    const body = encode("Not Found");

    const headers = new Headers();
    headers.set("status", "404");

    req.respond({ body, headers, status: 404 });
  }
}

// export { router }
