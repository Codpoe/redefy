import path from 'path';

export const ROOT = process.cwd();
export const SRC_PATH = path.join(ROOT, 'src');
export const ES_PATH = path.join(ROOT, 'es');
export const LIB_PATH = path.join(ROOT, 'lib');
export const DIST_PATH = path.join(ROOT, 'dist');
export const DEPS_MAP_JSON_PATH = path.join(DIST_PATH, 'deps-map.json');
export const IS_NOT_COMPONENT_DIRS = [
  'common',
  'utils',
  'styles',
  'demo',
  'test',
];
export const SCRIPT_EXTS = ['.ts', '.tsx'];

// https://regexr.com/47jlq
export const IMPORT_RE = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;
