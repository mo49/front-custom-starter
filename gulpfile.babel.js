'use strict';

// import
import gulp from 'gulp';
import source from 'vinyl-source-stream';
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import pleeease from 'gulp-pleeease';
import browserify from 'browserify';
import babelify from 'babelify';
import pug from 'gulp-pug';
import browserSync from 'browser-sync';
import readConfig from 'read-config';
import watch from 'gulp-watch';
import RevLogger from 'rev-logger';
import postcss from 'gulp-postcss';
import assets from 'postcss-assets';
import spritesmith from 'gulp.spritesmith';

// const
const SRC = './src';
const CONFIG = './src/config';
const HTDOCS = './public';
const BASE_PATH = '';
// const BASE_PATH = '/brandsite';
const DEST = `${HTDOCS}${BASE_PATH}`;

const revLogger = new RevLogger({
    'style.css': `${DEST}/css/style.css`,
    'script.js': `${DEST}/js/script.js`
});


// css
gulp.task('sass', () => {
    const config = readConfig(`${CONFIG}/pleeease.json`);
    return gulp.src(`${SRC}/scss/style.scss`)
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(pleeease(config))
        .pipe(postcss([assets({
          basePath: `${DEST}`, // プロジェクトで公開するパス
          loadPaths: [`img/`], // basePathから見た画像フォルダの位置
          relative: `css/`, // img/とcss/の相対的な位置
          cachebuster: true,
          // baseUrl: '',
        })]))
        .pipe(gulp.dest(`${DEST}/css`));
});

gulp.task('css', gulp.series('sass'));

// sprite
gulp.task('sprite', () => {
    const spriteData = gulp.src(`${SRC}/img/sprite/**/*.png`)
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.scss',
            imgPath: '../img/sprite/sprite.png',
            cssFormat: 'scss',
            cssVarMap: function(sprite){
                sprite.name = 'sprite-' + sprite.name;
            }
        }));
    spriteData.img.pipe(gulp.dest(`${DEST}/img/sprite`));
    spriteData.css.pipe(gulp.dest(`${SRC}/scss/mixin`));
})

// js
gulp.task('browserify', () => {
    return browserify(`${SRC}/js/script.js`)
        .transform(babelify)
        .bundle()
        .pipe(source('script.js'))
        .pipe(gulp.dest(`${DEST}/js`));
});

gulp.task('js', gulp.parallel('browserify'));

// html
gulp.task('pug', () => {
    const locals = readConfig(`${CONFIG}/meta.yml`);
    locals.versions = revLogger.versions();
    locals.basePath = BASE_PATH;

    return gulp.src(`${SRC}/pug/**/[!_]*.pug`)
        .pipe(pug({
            locals: locals,
            pretty: true,
            basedir: `${SRC}/pug`
        }))
        .pipe(gulp.dest(`${DEST}`));
});

gulp.task('html', gulp.series('pug'));


// serve
gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: HTDOCS
        },
        startPath: `${BASE_PATH}/`,
        ghostMode: false
    });

    watch([`${SRC}/scss/**/*.scss`], gulp.series('sass', browserSync.reload));
    watch([`${SRC}/js/**/*.js`], gulp.series('browserify', browserSync.reload));
    watch([
        `${SRC}/pug/**/*.pug`,
        `${SRC}/config/meta.yml`
    ], gulp.series('pug', browserSync.reload));

    revLogger.watch((changed) => {
        gulp.series('pug', browserSync.reload)();
    });
});

gulp.task('serve', gulp.series('browser-sync'));


// default
gulp.task('build', gulp.parallel('css', 'js', 'html'));
gulp.task('default', gulp.series('build', 'serve'));
