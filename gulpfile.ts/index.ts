import gulp from 'gulp';
import ts from 'gulp-typescript';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';
import del from 'del';
import merge2 from 'merge2';
import * as rollup from 'rollup';
import rollupCommonjs from '@rollup/plugin-commonjs';
import rollupResolve from '@rollup/plugin-node-resolve';
import rollupTypescript from '@rollup/plugin-typescript';
import collectComponentDeps from './collect-component-deps';
import genScriptEntry from './gen-script-entry';
import genStyleEntry from './gen-style-entry';
import removeStyleImports from './remove-style-imports';
import strFileSrc from './str-file-src';
import { getPkg } from './utils';

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
    .pipe(getTsProject(dir)())
    .pipe(gulp.dest(dir))
    .on('end', () => del([srcGlob, `!${dir}/**/*.d.ts`]));
}

function cleanDist() {
  return del(['dist/**', '!dist/*.{js,css,json}']);
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
    .pipe(removeStyleImports())
    .pipe(gulp.dest('es'))
    .pipe(gulp.dest('lib'))
    .pipe(gulp.dest('dist'));
}

export function compileESM() {
  return compileScript('es');
}

export function compileCJS() {
  return compileScript('lib');
}

export async function compileUMD() {
  const name = getPkg('name');
  const bundle = await rollup.rollup({
    input: 'dist/index.ts',
    plugins: [
      rollupTypescript({ module: 'ESNext', skipLibCheck: true }),
      rollupCommonjs(),
      rollupResolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
    ],
    external: Object.keys(getPkg('peerDependencies')),
  });

  const res = await bundle.generate({
    file: `dist/${name}.js`,
    format: 'umd',
    name,
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  });

  return strFileSrc(`${name}.js`, res.output[0].code)
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename(`${name}.min.js`))
    .pipe(gulp.dest('dist'))
    .on('end', cleanDist);
}

export const buildScript = gulp.series(
  copyScript,
  gulp.parallel(compileESM, compileCJS, compileUMD)
);

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
    .pipe(gulp.dest('lib'))
    .pipe(
      rename(parsed => {
        if (parsed.dirname === '.') {
          return {
            ...parsed,
            basename: getPkg('name'),
          };
        }
      })
    )
    .pipe(gulp.dest('dist'))
    .on('end', cleanDist);
}

export const buildStyle = gulp.series(copyStyle, compileStyle);

const build = gulp.series(clean, collectDeps, buildScript, buildStyle);

export default build;
