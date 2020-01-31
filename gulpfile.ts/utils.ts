import fs from 'fs-extra';
import path from 'path';
import {
  ROOT,
  SRC_PATH,
  IS_NOT_COMPONENT_DIRS,
  SCRIPT_EXTS,
} from './constants';

export function fillExt(filePath: string): string {
  if (/\.tsx?$/.test(filePath)) {
    if (fs.existsSync(filePath)) {
      return filePath;
    }
    return '';
  }

  for (let i = 0; i <= SCRIPT_EXTS.length; i++) {
    const completePath = `${filePath}${SCRIPT_EXTS[i]}`;
    if (fs.existsSync(completePath)) {
      return completePath;
    }
  }

  for (let i = 0; i <= SCRIPT_EXTS.length; i++) {
    const completePath = `${filePath}/index${SCRIPT_EXTS[i]}`;
    if (fs.existsSync(completePath)) {
      return completePath;
    }
  }

  return '';
}

export function isComponentScript(filePath: string) {
  filePath = fillExt(filePath);

  if (
    filePath &&
    !IS_NOT_COMPONENT_DIRS.includes(path.basename(path.dirname(filePath)))
  ) {
    return fs.readFileSync(filePath, 'utf-8').includes('export default');
  }

  return false;
}

export function isComponentEntry(filePath: string) {
  return (
    path.dirname(path.dirname(filePath)) === SRC_PATH &&
    path.basename(filePath, path.extname(filePath)) === 'index' &&
    isComponentScript(filePath)
  );
}

export function getComponentName(filePath: string): string {
  if (filePath === ROOT) {
    return '';
  }

  const dirname = path.dirname(filePath);

  if (dirname === SRC_PATH) {
    return path.basename(filePath);
  }

  return getComponentName(dirname);
}
