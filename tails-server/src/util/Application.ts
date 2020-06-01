import * as http from "std/http/mod.ts";

export class Application {
  #app: any;

  constructor(app: any) {
    this.#app = app;
  }

  public async listen(port: any, cb: () => void): Promise<void> {
    const server = http.serve({ port });
    cb();
    for await (const req of server) {
      this.#app(req);
    }
  }
}
