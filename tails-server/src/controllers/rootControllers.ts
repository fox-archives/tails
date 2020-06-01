import * as http from "std/http/mod.ts";
import * as path from "std/path/mod.ts";
import {
  readAllWorkspacePacks,
  readAllWorkspaceProjects,
} from "../util/read.ts";
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from "https://cdn.pika.dev/graphql@^15.0.0";


// TODO: fix ignores
// @ts-ignore
const schema: any = new GraphQLSchema({
  // @ts-ignore
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return "world";
        },
      },
    },
  }),
});

const decode = (buf: ArrayBuffer) => (new TextDecoder()).decode(buf);
const encode = (text: string) => new TextEncoder().encode(text);
const _dirname = path.dirname(new URL(import.meta.url).pathname);

export function rootController(req: http.ServerRequest) {
  const body = encode("done");

  req.respond({ body, status: 200 });
}

export async function apiDataController(req: http.ServerRequest) {
  let [namespaces, projects] = await Promise.all([
    readAllWorkspacePacks(),
    readAllWorkspaceProjects(),
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
}

export async function graphQlGetController(req: http.ServerRequest) {
  const body = encode(
    await Deno.readTextFile(path.join(_dirname, "../assets/graphql.html")),
  );

  const headers = new Headers();
  headers.set("content-type", "text/html; charset=utf-8");
  headers.set("x-content-type-options", "nosniff");

  req.respond({ body, headers, status: 200 });
}

export async function graphQlPostController(req: http.ServerRequest) {
  const query = decode(await Deno.readAll(req.body));
  const result = <object> await graphql(schema, query);
  const body = encode(JSON.stringify(result, null, 2));

  const headers = new Headers();
  headers.set("content-type", "application/json; charset=utf-8");
  headers.set("x-content-type-options", "nosniff");

  req.respond({ body, headers, status: 200 });
}

export async function serveStatic(req: http.ServerRequest, fileName: string) {
  const body = await Deno.readTextFile(path.join(_dirname, "../assets", fileName));
  const ext = path.extname(fileName).slice(1)

  const mimeTypes = new Map([
    ['html', 'text/html'],
    ['css', 'text/css'],
    ['js', 'application/javascript']
  ])
  const mimeType = mimeTypes.get(ext) || 'text/plain'

  const headers = new Headers();
  headers.set("content-type", `${mimeType}; charset=utf-8`);
  headers.set("x-content-type-options", "nosniff");

  req.respond({ body, headers, status: 200 });
}

export function fourOhFourController(req: http.ServerRequest) {
  console.info(`not found: ${req.url}`);
  const body = encode("Not Found");

  const headers = new Headers();
  headers.set("status", "404");

  req.respond({ body, headers, status: 404 });
}
