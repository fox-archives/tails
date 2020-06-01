import * as fs from "std/fs/mod.ts";
import * as path from "std/path/mod.ts";
import * as asserts from "std/testing/asserts.ts";

interface TailsConfig {
  tailsRoot: string | Array<string>;
}

interface Namespace extends Deno.DirEntry {
  location: string;
}

interface Project extends Deno.DirEntry {
  location: string;
  namespace: string;
}

/**
 * @description uses custom resolution algorithm to read config
 * @todo support for ~ in `tailsRoot` (probably process in separate function)
 */
export async function readConfig(): Promise<TailsConfig> {
  const home = Deno.env.get("HOME") || Deno.env.get("HOMEPATH") ||
    Deno.env.get("USERPROFILE");
  if (!home) {
    throw new Error(
      `HOME, HOMEPATH, or USERPROFILE not in environment. exiting.`,
    );
  }
  const configPath = path.join(home, ".config", "tails", "config.json");
  return await fs.readJson(configPath) as TailsConfig;
}

/**
 * @todo optimize
 */
export async function readAllProjects(): Promise<Array<Project>> {
  const config = await readConfig();
  asserts.assert(
    Array.isArray(config.tailsRoot) || typeof config.tailsRoot === "string",
    "tailsRoot must be array or string",
  );

  let totalProjects: Array<Project> = [];

  // projects not in a namespace
  {
    if (Array.isArray(config.tailsRoot)) {
      const promises: Array<Promise<ReadonlyArray<Project>>> = [];
      for (const tailsRoot of config.tailsRoot) {
        const projectsPromise = readProjects(tailsRoot);
        promises.push(projectsPromise);
      }

      const projectArrays = await Promise.all(promises);
      for (const projectArray of projectArrays) {
        totalProjects = totalProjects.concat(projectArray);
      }
    } else {
      const projects = await readProjects(config.tailsRoot);
      totalProjects = totalProjects.concat(projects);
    }
  }

  // projects in a namespace
  {
    const namespaces = await readAllNamespaces();
    const promises: Array<Promise<ReadonlyArray<Project>>> = [];
    for (const namespace of namespaces) {
      const projectsPromise = readProjects(namespace.location);
      promises.push(projectsPromise);
    }

    const projectArrays = await Promise.all(promises);
    for (const projectArray of projectArrays) {
      totalProjects = totalProjects.concat(projectArray);
    }
  }

  return totalProjects;
}

/**
 * @description - reads all the namespaces of all `tailsRoots` 
 */
export async function readAllNamespaces(): Promise<Array<Namespace>> {
  const config = await readConfig();
  asserts.assert(
    Array.isArray(config.tailsRoot) || typeof config.tailsRoot === "string",
    "tailsRoot must be array or string",
  );

  let totalNamespaces: Array<Namespace> = [];
  if (Array.isArray(config.tailsRoot)) {
    const promises: Array<Promise<ReadonlyArray<Namespace>>> = [];

    for (const tailsRoot of config.tailsRoot) {
      const namespaces = readNamespaces(tailsRoot);
      promises.push(namespaces);
    }

    const namespacesArray: Array<ReadonlyArray<Namespace>> = await Promise.all(
      promises,
    );
    for (const namespaceArray of namespacesArray) {
      totalNamespaces = totalNamespaces.concat(namespaceArray);
    }
  } else {
    const namespaces = await readNamespaces(config.tailsRoot);
    totalNamespaces = totalNamespaces.concat(namespaces);
  }

  return totalNamespaces;
}

/**
 * @description - reads all the projects of a particular `namespace`
 * @param {string} dir - absolute path of directory to read
 */
export async function readProjects(dir: string): Promise<Array<Project>> {
  asserts.assert(path.isAbsolute(dir), "dir is not absolute");

  const projects: Array<Project> = [];
  for await (const dirEntry of Deno.readDir(dir)) {
    if (dirEntry.name.startsWith("_")) continue;
    if (!dirEntry.isDirectory) continue;

    const location = path.join(dir, dirEntry.name);
    // a project's parent directory can be a 'namespace' (folder that starts
    // with an underscore, or a regular folder)
    const resolveNamespace = (namespace: string) =>
      namespace.startsWith("_") ? namespace.slice("_".length) : namespace;

    const project: Project = {
      ...dirEntry,
      location,
      namespace: resolveNamespace(path.basename(path.dirname(location))),
    };

    projects.push(project);
  }

  return projects;
}

/**
 * @description - reads all the namespaces of a particular `tailsRoot`
 * @param {string} dir - absolute path of directory to read
 */
export async function readNamespaces(dir: string): Promise<Array<Namespace>> {
  asserts.assert(path.isAbsolute(dir), "dir is not absolute");

  const namespaces: Array<Namespace> = [];
  for await (const dirEntry of Deno.readDir(dir)) {
    if (!dirEntry.name.startsWith("_")) continue;
    if (!dirEntry.isDirectory) continue;

    const namespace: Namespace = {
      ...dirEntry,
      name: dirEntry.name.slice("_".length),
      location: path.join(dir, dirEntry.name),
    };

    namespaces.push(namespace);
  }

  return namespaces;
}
