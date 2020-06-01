import * as fs from "std/fs/mod.ts";
import * as path from "std/path/mod.ts";
import * as asserts from "std/testing/asserts.ts";

/**
 * look into Array.prototype.flat(), and use it if it performs better
 */

interface TailsConfig {
  workspaces: Array<string>;
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

export async function readAllWorkspaceProjects(): Promise<Project[]> {
 const config = await readConfig();
 const workspaces = config.workspaces

  asserts.assert(
    Array.isArray(workspaces), "tailsRoot must be an array",
  );

  const promises: Promise<Project[]>[] = []
  for (const workspace of workspaces) {
    const projectsPromise = readWorkspaceProjects(workspace)
    promises.push(projectsPromise)
  }

  let totalProjects: Project[] = []
  const projectsArray = await Promise.all(promises)
  for(const projectArray of projectsArray) {
    totalProjects = totalProjects.concat(projectArray)
  }

  return totalProjects
}

export async function readAllWorkspacePacks(): Promise<Pack[]> {
  const config = await readConfig();
  const workspaces = config.workspaces

  asserts.assert(
    Array.isArray(workspaces), "tailsRoot must be an array",
  );

  const promises: Promise<Pack[]>[] = []
  for (const workspace of workspaces) {
    const packsPromise = readWorkspacePacks(workspace)
    promises.push(packsPromise)
  }

  let totalPacks: Pack[] = []
  const packsArray = await Promise.all(promises)
  for (const packArray of packsArray) {
    totalPacks = totalPacks.concat(packArray)
  }

  return totalPacks
}

/**
 * @description reads all projects in a workspace
 * @param {string} workspaceDir - absolute path to workspace
 */
export async function readWorkspaceProjects(workspaceDir: string): Promise<Project[]> {
  let totalProjects: Project[] = [];
  // projects not in a pack
  {
    const promises: Promise<readonly Project[]>[] = [];
    for (const workspace of [ workspaceDir ]) {
      const projectsPromise = readProjects(workspace);
      promises.push(projectsPromise);
    }

    const projectArrays = await Promise.all(promises);
    for (const projectArray of projectArrays) {
      totalProjects = totalProjects.concat(projectArray);
    }
  }

  // projects in a pack
  {
    const packs = await readWorkspacePacks(workspaceDir);
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
 * @param {string} workspaceDir - absolute path to workspace
 */
export async function readWorkspacePacks(workspaceDir: string): Promise<Pack[]> {
  const config = await readConfig();
  asserts.assert(
    Array.isArray(config.workspaces), "tailsRoot must be array or string",
  );

  let totalPacks: Pack[] = [];
  const workspaces = config.workspaces
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
 * @private
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
 * @private
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
