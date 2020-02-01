import gulp from 'gulp';
import ts from 'gulp-typescript';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';
import del from 'del';
import merge2 from 'merge2';
import collectDeps from './collect-deps';
import genStyleEntry from './gen-style-entry';

function compileDir(dir: 'es' | 'lib') {
  const tsProject = ts.createProject(
    'tsconfig.json',
    dir === 'es' ? { module: 'ESNext' } : undefined
  );

  return tsProject
    .src()
    .pipe(collectDeps())
    .pipe(tsProject())
    .pipe(gulp.dest(dir));
}

export function clean() {
  return del(['es/**', 'lib/**', 'dist/**']);
}

export function compileESM() {
  return compileDir('es');
}

export function compileCJS() {
  return compileDir('lib');
}

export const compileScript = gulp.series(compileESM, compileCJS);

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

const build = gulp.series(clean, compileScript, compileStyle);

export default build;
