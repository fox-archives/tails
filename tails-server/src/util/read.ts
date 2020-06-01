import * as fs from "std/fs/mod.ts";
import * as path from "std/path/mod.ts";
import * as asserts from "std/testing/asserts.ts";

interface TailsConfig {
  tailsRoot: string | Array<string>;
}

interface Namespace extends Deno.DirEntry {
  location: string;
}

interface Pack extends Deno.DirEntry {
  location: string;
  workspace: string
}

interface Project extends Deno.DirEntry {
  location: string;
  workspace: string,
  pack: string | null;
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
 * @description reads all projects in a workspace
 */
export async function readWorkspaceProjects(): Promise<Project[]> {
  const config = await readConfig();
  asserts.assert(
    Array.isArray(config.tailsRoot) || typeof config.tailsRoot === "string",
    "tailsRoot must be array or string",
  );

  let totalProjects: Array<Project> = [];
  // projects not in a pack
  {
    if (Array.isArray(config.tailsRoot)) {
      const workspaces = config.tailsRoot
      const promises: Promise<readonly Project[]>[] = [];
      for (const workspace of workspaces) {
        const projectsPromise = readProjects(workspace);
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

  // projects in a pack
  {
    const packs = await readWorksapcePacks();
    const promises: Promise<readonly Project[]>[] = [];
    for (const pack of packs) {
      const projectsPromise = readProjects(pack.location);
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
 * @description reads all packs in a worksapce
 * @todo pass in workspace path as parameter
 */
export async function readWorksapcePacks(): Promise<Pack[]> {
  const config = await readConfig();
  asserts.assert(
    Array.isArray(config.tailsRoot) || typeof config.tailsRoot === "string",
    "tailsRoot must be array or string",
  );

  let totalPacks: Pack[] = [];
  if (Array.isArray(config.tailsRoot)) {
    const workspaces = config.tailsRoot
    const promises: Promise<readonly Pack[]>[] = [];

    for (const workspace of workspaces) {
      const packs = readPacks(workspace);
      promises.push(packs);
    }

    const packsArray: Array<readonly Pack[]> = await Promise.all(
      promises,
    );
    for (const packArray of packsArray) {
      totalPacks = totalPacks.concat(packArray);
    }
  } else {
    const namespaces = await readPacks(config.tailsRoot);
    totalPacks = totalPacks.concat(namespaces);
  }

  return totalPacks;
}

function isParentDirectoryAPack(dir: string): boolean {
  const parentDirName = path.basename(dir)
  if (parentDirName.startsWith("_")) { 
    return true
  }
  return false
}

/**
 * @description - reads all the projects of a folder. this assumes we are
 * reading a `workspace` _or_ a `pack` directory
 * @param {string} dir - absolute path of directory to read
 */
export async function readProjects(dir: string): Promise<Project[]> {
  asserts.assert(path.isAbsolute(dir), "dir is not absolute");

  const projects: Project[] = [];
  for await (const dirEntry of Deno.readDir(dir)) {
    if (dirEntry.name.startsWith("_")) continue;
    if (!dirEntry.isDirectory) continue;

    const project: Project = { 
      ...dirEntry,
      location: path.join(dir, dirEntry.name),
      workspace: isParentDirectoryAPack(dir)
        ? path.basename(path.dirname(dir))
        : path.basename(dir),
      pack: isParentDirectoryAPack(dir)
        ? path.basename(dir).slice("_".length)
        : null
    };

    projects.push(project);
  }

  return projects;
}

/**
 * @description - reads all the `packs` of a `workspace` directory
 * @param {string} dir - absolute path of directory to read
 */
export async function readPacks(workspaceDir: string): Promise<Pack[]> {
  asserts.assert(path.isAbsolute(workspaceDir), "dir is not absolute");

  const packs: Pack[] = [];
  for await (const dirEntry of Deno.readDir(workspaceDir)) {
    if (!dirEntry.name.startsWith("_")) continue;
    if (!dirEntry.isDirectory) continue;

    const namespace: Pack = {
      ...dirEntry,
      name: dirEntry.name.slice("_".length),
      location: path.join(workspaceDir, dirEntry.name),
      workspace: path.basename(workspaceDir)
    };

    packs.push(namespace);
  }

  return packs;
}
