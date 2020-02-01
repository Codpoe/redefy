import gulp from 'gulp';
import ts from 'gulp-typescript';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';
import del from 'del';
import merge2 from 'merge2';
import collectComponentDeps from './collect-component-deps';
import genScriptEntry from './gen-script-entry';
import genStyleEntry from './gen-style-entry';
import removeStyleImports from './remove-style-imports';

type OutputDir = 'es' | 'lib';

function getTsProject(dir?: OutputDir) {
  return ts.createProject(
    'tsconfig.json',
    dir === 'es' ? { module: 'ESNext' } : undefined
  );
}

function compileScript(dir: OutputDir) {
  const srcGlob = `${dir}/**/*.{ts,tsx}`;

  return gulp
    .src(srcGlob)
    .pipe(removeStyleImports())
    .pipe(getTsProject(dir)())
    .pipe(gulp.dest(dir))
    .on('end', () => del([srcGlob, `!${dir}/**/*.d.ts`]));
}

export function clean() {
  return del(['es/**', 'lib/**', 'dist/**']);
}

export function collectDeps() {
  return getTsProject()
    .src()
    .pipe(collectComponentDeps())
    .pipe(gulp.dest('dist'));
}

export function copyScript() {
  return merge2(
    getTsProject().src(),
    gulp.src('dist/deps-map.json').pipe(genScriptEntry())
  )
    .pipe(gulp.dest('es'))
    .pipe(gulp.dest('lib'));
}

export function compileESM() {
  return compileScript('es');
}

export function compileCJS() {
  return compileScript('lib');
}

export const buildScript = gulp.series(copyScript, compileESM, compileCJS);

export function copyStyle() {
  return merge2(
    gulp.src('src/**/*.less'),
    gulp.src('dist/deps-map.json').pipe(genStyleEntry())
  )
    .pipe(gulp.dest('es'))
    .pipe(gulp.dest('lib'));
}

export function compileStyle() {
  return gulp
    .src('es/**/*.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cleanCss())
    .pipe(gulp.dest('es'))
    .pipe(gulp.dest('lib'));
}

export const buildStyle = gulp.series(copyStyle, compileStyle);

const build = gulp.series(clean, collectDeps, buildScript, buildStyle);

export default build;
