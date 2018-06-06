/* ----------------------------------
 * frontend gulp file (derived from musterknabe)
 * ---------------------------------- */
'use strict'

// common
const gulp = require('gulp')

// css preprocessors
const sass = require('gulp-sass')

// css postprocessors
const cleanCSS = require('gulp-clean-css') // (gulp-minify-css is deprecated)
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer') // (used inside postcss), *not* gulp-autoprefixer

// pipe helpers
const plumber = require('gulp-plumber')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')

const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create()
const livereload = require('gulp-livereload') // poorer experience: browserSync.reload
const del = require('del')

//logging - stackoverflow.com/q/27975129
const gutil = require('gulp-util')
const through = require('through2');

// shorthands
const green = gutil.colors.green
const red = gutil.colors.red

const src = {
	cssTargetDir: 'app',
	sassOutputName: 'styles123.css',

	html: 'public/*.html'
}

// overriding gulp.src for (slightly) better error messages → www.timroes.de/2015/01/06/proper-error-handling-in-gulp-js/

var gulp_src = gulp.src

gulp.src = function() {
	return gulp_src.apply(gulp, arguments)
		.pipe(plumber(function(error) {
			// Output an error message
			gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message))
			gutil.log('line: ' + error.cause.line)
			gutil.log('col:  ' + error.cause.col)
			gutil.log('pos:  ' + error.cause.pos)
			// gutil.log( 'stack:' + error.cause.stack.replace(/\n/ig,'\n') )
			this.emit('end') // emit the end event, to properly end the task
		}))
}
// gulp.src override ----------------------------------------------------

// Compilation common code (sass and stylus) ==================================
function compile(sources, production, outputFolder, outputFile) {

	/**
	 * @param {array} sources
	 * @param {boolean} production
	 * @param {string} outputFolder
	 * @param {string} outputFile
	 */

	const sassCmd = sass({ style: 'compact', sourcemap: true }).on('error', sass.logError) // ¹

	return gulp.src(sources)
			.pipe(sass())
			.pipe(concat('banane123.css'))
			.pipe(gulp.dest('app'))

	console.log('UNREACHABLE ------------------------------')


	return gulp.src(sources)
		.pipe(sourcemaps.init({
			largeFile: true // TOTEST effect
		}))
		.pipe(plumber()) // prevent premature errors
		// ¹ sass built-in plumber
		// - github.com/dlmanning/gulp-sass/issues/90#issuecomment-89066953
		// -> might make plumber superficious
		.pipe(sassCmd)

		// plugins __________________________________________________________________
		.pipe(postcss([autoprefixer({ // new autoprefixer (gulp-autoprefix broke sourcemaps)
			// see autoprefixer browser params: https://prepros.io/help/autoprefixer
			// see autofixer other params: https://github.com/postcss/autoprefixer
			browsers: ['iOS >= 5', 'ie 7', 'safari 7', 'Firefox >= 46'],
			cascade: true, // nicer browser-prefix indentation
			remove: true
		})]))

		.pipe(
			(production) ?
			cleanCSS({ // REF:   stackoverflow.com/a/39688471/444255
					debug: true, // REF github.com/jakubpawlowicz/clean-css#using-api
					removeDuplicateMediaQueries: true,
					mergeMediaQueries: true,
					advanced: true
				},
				(details) => {
					console.log(green(
						'    ' + details.name + ': ' + details.stats.minifiedSize +
						' (original: ' + details.stats.originalSize + ')'))
				}) :
			gutil.noop() // https://github.com/gulpjs/gulp-util#noop

		)

		// output _____________________________________________________________________
		.pipe(concat(outputFile)) // covers rename
		.pipe(sourcemaps.write('../maps', {
			includeContent: false,
			sourceRoot: '../'
		}))

		.pipe(gulp.dest(outputFolder))
		.pipe(livereload()) // OLD: .pipe(reload({stream: true}))
		.on('end',
			() => gutil.log('sass done ' +
				green(outputFolder + '/' + outputFile))
		)

} // compile()

// Compile sass into CSS ==================================
gulp.task('sass', function() {

	gulp.src('./app/sass/main.sass')
	.pipe(sass().on('error', sass.logError))
	.pipe(concat('styles.css'))
	.pipe(gulp.dest('./app'))


	// compile(
    //     [
	// 		'app/sass/_main.sass'
    //         // 'more/stuff/**/*.sass',
    //         // '!but/not/thisone/*.sass'
    //     ],
	// 	false,
	// 	src.cssTargetDir,
	// 	src.sassOutputName
	// )
	// return

}) // task: sass


gulp.task('watch-sass', ['sass'], function() { // (ensure one initial compilation)

	livereload.listen()
	gulp.watch(src.stylusDir, ['sass'])

})

// static server + watching sass/html files ===============
gulp.task('serve', function() {

	browserSync.init({
		server: "./public"
	})

	gulp.watch(src.sassDir, ['sass'])

	gulp.watch(src.html).on('change', () => reload({})) // not yet working: stream: true

})

// TODO gulp.task('default', ['watch-sass'])
gulp.task('default', ['sass'])