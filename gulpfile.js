/* ----------------------------------
 * MUSTERKNABE Frontend Gulp File
 * ---------------------------------- */
'use strict';

// TODO const browserify    = require('gulp-browserify');
// TODO release mode   const argv = require('yargs').argv;
//          or if(process.env.NODE_ENV === 'Release'){

// common
const gulp          = require('gulp');

// css preprocessors
const sass          = require('gulp-sass');
const less          = require('gulp-less');
const stylus        = require('gulp-stylus');

// css postprocessors
const cleanCSS      = require('gulp-clean-css');  // (gulp-minify-css is deprecated)
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer'); // (used inside postcss), *not* gulp-autoprefixer

// pipe helpers
const plumber       = require('gulp-plumber');
const uglify        = require('gulp-uglify');
// not needed: const rename        = require('gulp-rename');
const concat        = require('gulp-concat');

const sourcemaps = require('gulp-sourcemaps');
const browserSync   = require('browser-sync').create();
const livereload = require('gulp-livereload'); // poorer experience: browserSync.reload;
const del = require('del');

//logging - stackoverflow.com/q/27975129
const gutil = require('gulp-util');
// shorthands
const green = gutil.colors.green;
const red = gutil.colors.red;

const src = {
    vendorCss:        'app/vendor/**/*.css',

    stylusMaster:     'app/stylus/master.styl',
    stylusOutputName: 'stylus.css',
    stylusDir:        'app/stylus/**/*.styl', // only needed for watch

    scssMaster:       'app/scss/master.scss',
    scssOutputName:   'scss.css',
    scssDir:          'app/scss/**/*.styl', // only needed for watch

    cssTargetDir:     'public/css',

    html:             'public/*.html'
    //COULDO: jade compilation
};

// overriding gulp.src for (slightly) better error messages → www.timroes.de/2015/01/06/proper-error-handling-in-gulp-js/
var gulp_src = gulp.src;
gulp.src = function() {
  return gulp_src.apply(gulp, arguments)
    .pipe(plumber(function(error) {
			// Output an error message
			gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
			gutil.log( 'line: ' + error.cause.line );
			gutil.log( 'col:  ' + error.cause.col );
			gutil.log( 'pos:  ' + error.cause.pos );
			// gutil.log( 'stack:' + error.cause.stack.replace(/\n/ig,'\n') );
			this.emit('end'); // emit the end event, to properly end the task
    })
  );
};
// gulp.src override ----------------------------------------------------


// TODO:
// // Compile javascript ==================================
// gulp.task('script', function() {

//     gutil.log('starting scripts');
//     return gulp.src(src.js)
//         // TODO: source map support...
//         .pipe(browserify())

//         .pipe(gulp.dest( src.jsTargetDir ))
//         // reload
//         .pipe(reload({stream: true}))
//         .on('end', () => gutil.log('[script] done'));
// });


// REF browserSync through proxy (to deliver .jsp pages, from Apache, ...)
// browser-sync task for starting the server.
// gulp.task('sync', function() {
//
//     browserSync.init({
//         port: 8000,        // the port where to deliver the page including reload snippet
//         proxy: 'localhost' // proxy reading FROM (use localhost:1234 if that's where the original is served)
//     });
//
// });


// Compilation common code (scss and stylus) ==================================
function compile(sources, precompiler, production, outputFolder, outputFile) {

    /**
     * @param {array} sources
     * @param {string} precompiler
     * @param {boolean} production
     * @param {string} outputFolder
     * @param {string} outputFile
     */

    // determine precompiler
    let precompileFn;
    switch (precompiler) {
        case 'scss':
            precompileFn = sass(
                            {style: 'compact', sourcemap: true}
                            ).on('error', sass.logError) // ¹
            // ¹ sass built-in plumber
            // - github.com/dlmanning/gulp-sass/issues/90#issuecomment-89066953
            // -> might make plumber superficious
            break;
        case 'stylus':
            precompileFn = stylus({ use: [] })
            break;
        default:
            console.log(red('unknown precompiler'));
            exit(-1);
    }


    return gulp.src( sources )
        .pipe(sourcemaps.init({
            largeFile: true // TOTEST effect
        }))
        .pipe(plumber())  // prevent premature errors
        .pipe(precompileFn)

        // plugins __________________________________________________________________
        .pipe(postcss([ autoprefixer({ // new autoprefixer (gulp-autoprefix broke sourcemaps)
            // see autoprefixer browser params: https://prepros.io/help/autoprefixer
            // see autofixer other params: https://github.com/postcss/autoprefixer
            browsers: ['iOS >= 5', 'ie 7', 'safari 7', 'Firefox >= 46'],
            cascade: true, // nicer browser-prefix indentation
            remove: true
        })]))

        .pipe(
            (production) ?
                cleanCSS({  // REF:   stackoverflow.com/a/39688471/444255
                    debug: true, // REF github.com/jakubpawlowicz/clean-css#using-api
                    removeDuplicateMediaQueries: true,
                    mergeMediaQueries: true,
                    advanced: true
                },
                (details) => {
                    console.log( green(
                        '    ' + details.name + ': ' + details.stats.minifiedSize
                        + ' (original: ' + details.stats.originalSize + ')' ));
                })
            :
                gutil.noop()  // https://github.com/gulpjs/gulp-util#noop

        )

        // output _____________________________________________________________________
        .pipe(concat(outputFile)) // covers rename
        .pipe(sourcemaps.write('../maps', {
            includeContent: false,
            sourceRoot: '../'
        }))

        .pipe(gulp.dest(outputFolder))
        .pipe(livereload())   // OLD: .pipe(reload({stream: true}))
        .on('end',
                () => gutil.log('['+precompiler+'] done '+
                green( outputFolder+'/'+outputFile))
        );
}


// Compile sass into CSS ==================================
gulp.task('scss', function() {

    compile(
        [
            src.vendorCss,
            src.scssMaster
            // 'more/stuff/**/*.scss',
            // '!but/not/thisone/*.scss'
        ],
        'scss',
        false,
        src.cssTargetDir,
        src.scssOutputName
    );
    return;

}); // task: scss


// Compile stylus into CSS ===============================
gulp.task('stylus', function () {

    // use
    // gulp --type production
    // to minify

    compile(
        [
            src.vendorCss,
            src.stylusMaster
            // 'more/stuff/**/*.scss',
            // '!but/not/thisone/*.scss'
        ],
        'stylus',
        gutil.env.type === 'production',
        src.cssTargetDir,
        src.stylusOutputName
    );
    return;

});  // task: stylus


gulp.task('watch-stylus', ['stylus'], function() { // (ensure one initial compilation)

    livereload.listen();
    gulp.watch( src.stylusDir, ['stylus'] );

    // // watch for targetfile deletion?
    // gulp.watch(['public/css/stylus.css'], function(file) {
    //     console.log( `file.type ${file.type}` );
    //     // if (file.type == 'deleted') { // or !== ?
    //     //     console.log('wipe detected.');
    //     //     livereload.changed(file);
    //     // };
    // });

});

gulp.task('watch-scss', ['scss'], function() { // (ensure one initial compilation)

    livereload.listen();
    gulp.watch( src.stylusDir, ['scss'] );

});


// static server + watching sass/html files ===============
gulp.task('serve', function() {

    browserSync.init({
        server: "./public"
    });

    // gulp.watch( src.stylusDir, ['stylus'] );
     gulp.watch( src.stylusDir, ['sass'] );
    // gulp.watch( src.stylusDir, ['less'] );

    // nb: only watching stylus/sass/less sources, not any other css files
    // gulp.watch(src.css).on('change', reload);

    gulp.watch(src.html).on('change', () => reload({}) ); // not yet working: stream: true

});


// default target
gulp.task('default', ['stylus', 'serve']);
