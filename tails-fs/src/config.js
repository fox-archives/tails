import * as ERROR from './errors';
import * as helper from './config.helper';
// should only be used by Config.find()
import { TAILS_CONFIG_FILE } from './config.helper';

async function showConfig() {
  if (!(await helper.storeExists()))
    throw new ERROR.DoesNotExistError('config');

  try {
    return await helper.readStore();
  } catch (err) {
    throw new Error(err);
  }
}

async function createConfig() {
  if (await helper.storeExists()) throw new ERROR.AlreadyExistsError('config');

  try {
    return await helper.createStore();
  } catch (err) {
    throw new Error(err);
  }
}

async function deleteConfig() {
  if (!(await helper.storeExists()))
    throw new ERROR.DoesNotExistError('config');

  try {
    return await helper.deleteConfig();
  } catch (err) {
    throw new Error(err);
  }
}

async function getConfigKey(key) {
  if (!(await helper.storeExists()))
    throw new ERROR.DoesNotExistError('config');
  if (!key) throw new ERROR.InvalidArgumentError('key', key);

  let json;
  try {
    json = await helper.readStore();
  } catch (err) {
    throw new Error(err);
  }

  if (!json[key]) throw new ERROR.DoesNotExistError('key', key);

  return json[key];
}

async function setConfigKey(key, value, isForce) {
  if (!(await helper.storeExists()))
    throw new ERROR.DoesNotExistError('config');
  if (!value && !isForce)
    throw new ERROR.InvalidArgumentError('force', isForce);

  try {
    let json = await helper.readStore();

    if (isForce) {
      delete json[key];
      await helper.writeStore(json);
    } else {
      json[key] = value;
      await helper.writeStore(json);
    }
  } catch (err) {
    throw new Error(err);
  }
}

async function findConfig() {
  if (!(await helper.storeExists()))
    throw new ERROR.DoesNotExistError('config');

  return TAILS_CONFIG_FILE;
}

export { TAILS_CONFIG_FILE };
export class Config {
  static show() {
    return showConfig();
  }

  static create() {
    return createConfig();
  }

  static delete() {
    return deleteConfig();
  }

  static get(key) {
    return getConfigKey(key);
  }

  static set(key, value, isForce) {
    return setConfigKey(key, value, isForce);
  }

  static find() {
    return findConfig();
  }
}
