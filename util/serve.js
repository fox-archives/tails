import path from 'path';

export function GET_PROJECT(projectName) {
  return path.join(__dirname, '..', 'projects', projectName);
};

export function GET_TEMPLATE(templateName) {
  const set = new Set([
    'web'
  ]);

  if(!set.has(templateName)) {
    throw new Error(`'${templateName}' is not a valid template name`);
  }

  return path.join(__dirname, '..', 'templates', templateName);
};
