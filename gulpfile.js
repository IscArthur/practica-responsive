const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    log = require('./logger'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    stylus = require('gulp-stylus'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    purgecss = require('gulp-purgecss');

const $vendors = './node_modules',
    $cssVendorsFolder = './public/css/vendors',
    $bootstrap = `${$vendors}/bootstrap/dist/css/bootstrap.css`,
    // $notyf = `${$vendors}/notyf/notyf.min.css`,
    $cssVendors = [$bootstrap],
    $jsVendorsFolder = './public/js/vendors',
    $notyfJS = `${$vendors}/notyf/notyf.min.js`,
    $jsVendors = [$notyfJS];

////////////////////
// Error FUNCTION //
////////////////////
function displayError(error) {
    log(error.toString(), 'red');
    this.emit('end');
}
////////////
// Stylus //
////////////
gulp.task('stylus', () => {
    return gulp
        .src('./src/stylus/main.styl')
        .pipe(sourcemaps.init())
        .pipe(
            stylus({
                compress: true
            })
        )
        .on('error', displayError)
        .pipe(autoprefixer())
        .pipe(rename('main.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'))
        .on('end', () => {
            log('Stylus Compilado', 'green');
        });
});
////////////////
// CSS Vendors//
////////////////
gulp.task('css-vendors', () => {
    return gulp
        .src($cssVendors, { base: $vendors })
        .pipe(concat('cssVendors.min.css'))
        .pipe(cleanCSS({ compatibility: 'ie10' }))
        .pipe(gulp.dest($cssVendorsFolder))
        .on('end', () => {
            log('Vendors (CSS) Concatenados y minificados', 'blue');
        });
});
////////////////
// PURGAR CSS //
////////////////
gulp.task('purgecss', () => {
    return gulp
        .src('public/css/**/*.css', { base: './' })
        .pipe(
            purgecss({
                content: ['src/views/**/*.pug'],
                whitelist: [
                    'no-scroll',
                    'active',
                    'right-shadow',
                    'left-shadow'
                ]
            })
        )
        .pipe(gulp.dest('./'))
        .on('end', () => {
            log('Purga de CSS', 'blue');
        });
});
////////////
// DEV JS //
////////////
gulp.task('js', function() {
    return gulp
        .src('./src/scripts/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .on('error', displayError)
        .pipe(concat('main.min.js'))
        .pipe(
            uglify({
                mangle: {
                    eval: true
                }
            })
        )
        .on('error', displayError)
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/js'))
        .on('end', () => {
            log('JS Compilado', 'yellow');
        });
});
////////////
// VENDORS//
////////////
gulp.task('js-vendors', function() {
    return gulp
        .src($jsVendors)
        .pipe(concat('vendors.min.js'))
        .pipe(gulp.dest($jsVendorsFolder))
        .on('end', () => {
            log('Vendors JS Compilados', 'blue');
        });
});
//////////////
// WATCHERS //
//////////////
gulp.task('watchers', done => {
    log('Watchers Corriendo', 'yellow');
    gulp.watch('./src/stylus/**/*.styl', gulp.series('stylus', 'purgecss'));
    gulp.watch('./src/scripts/**/*.js', gulp.series('js'));
    // gulp.watch('./dev-js-vendors/**/*.js', gulp.series('vendors'));
    done();
});

gulp.task(
    'dev',
    gulp.series(
        'stylus',
        'css-vendors',
        'purgecss',
        'js',
        'js-vendors',
        gulp.parallel('watchers')
    )
);
