var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var minifyCSS = require("gulp-minify-css");
var minifyHTML = require("gulp-minify-html");
var runSequence = require('run-sequence');
var templateCache = require('gulp-angular-templatecache');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');

var _dist = "./public/dist";
var _src = "./public/app";

/* Clean the build directory */
gulp.task('clean', function(cb) {
    del([_dist + "/**"], cb);
});


gulp.task('deps', function() {
    return gulp.src([
            "./public/vendor/jquery/jquery.js",
            "./public/vendor/jquery.appear/jquery.appear.js",
            "./public/vendor/jquery.easing/jquery.easing.js",
            "./public/vendor/jquery-cookie/jquery-cookie.js",
            "./public/vendor/bootstrap/bootstrap.js",
            "./public/vendor/common/common.js",
            "./public/vendor/jquery.validation/jquery.validation.js",
            "./public/vendor/jquery.stellar/jquery.stellar.js",
            "./public/vendor/jquery.easy-pie-chart/jquery.easy-pie-chart.js",
            "./public/vendor/jquery.gmap/jquery.gmap.js",
            "./public/vendor/isotope/jquery.isotope.js",
            "./public/vendor/owlcarousel/owl.carousel.js",
            "./public/vendor/jflickrfeed/jflickrfeed.js",
            "./public/vendor/magnific-popup/jquery.magnific-popup.js",
            "./public/vendor/vide/vide.js",
            "./public/vendor/rs-plugin/js/jquery.themepunch.tools.min.js",
            "./public/vendor/rs-plugin/js/jquery.themepunch.revolution.min.js",
            "./public/vendor/circle-flip-slideshow/js/jquery.flipshow.js",
            "./public/js/theme.js",
            "./public/js/views/view.home.js",
            "./public/js/custom.js",
            "./public/js/theme.init.js",
            "./public/vendor/angular/angular.min.js",
            "./public/vendor/angular-cookies/angular-cookies.min.js",
            "./public/vendor/angular-route/angular-route.min.js",
            "./public/vendor/angular-resource/angular-resource.min.js",
            "./public/vendor/a0-angular-storage/dist/angular-storage.js",
            "./public/vendor/angular-bootstrap/ui-bootstrap-tpls-0.13.0.min.js",
            "./public/vendor/sweetalert/dist/sweetalert.min.js",
            "./public/vendor/angular-sweetalert/SweetAlert.min.js",
            "./public/vendor/nouislider/jquery.nouislider.js",
            "./public/vendor/nouislider/Link.js",
            "./public/vendor/angular-nouislider/src/nouislider.js"
        ])
        .pipe(uglify())
        .pipe(concat("dep.min.js"))
        .pipe(gulp.dest(_dist + "/"));
});

/* Build the javascripts */
gulp.task('jshint', function() {
    return gulp.src(_src + "/**/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', ['jshint'], function() {
    return browserify(_src + "/app.js")
        .bundle()
        .pipe(source("app.min.js"))
        .pipe(buffer())
        //        .pipe(uglify())
        .pipe(gulp.dest(_dist));
});

/* Build the Angular templates */
gulp.task('templates', function() {
    return gulp.src(_src + "/templates/**/*.html")
        .pipe(minifyHTML({
            empty: true,
            quotes: true,
            spare: true
        }))
        .pipe(templateCache("app.templates.min.js", {
            module: "ht.templates",
            standalone: true
        }))
        .pipe(uglify())
        .pipe(gulp.dest(_dist + "/"));
});


gulp.task('mincss', function() {

    console.log("SOURCE", './public/css/*.css');

    return gulp.src([
            './public/vendor/bootstrap/bootstrap.css',
            './public/vendor/fontawesome/css/font-awesome.css',
            './public/vendor/owlcarousel/owl.carousel.min.css',
            './public/vendor/owlcarousel/owl.theme.default.min.css',
            './public/vendor/magnific-popup/magnific-popup.css',
            './public/css/theme.css',
            './public/css/theme-elements.css',
            './public/css/theme-blog.css',
            './public/css/theme-shop.css',
            './public/css/theme-animate.css',
            './public/vendor/rs-plugin/css/settings.css',
            './public/vendor/circle-flip-slideshow/css/component.css',
            './public/css/skins/default.css',
            './public/css/custom.css',
            './public/vendor/sweetalert/dist/sweetalert.css',
            './public/vendor/nouislider/jquery.nouislider.css'
        ])
        .pipe(minifyCSS({
            compatibility: 'ie8'
        }))
        .pipe(sourcemaps.write())
        .pipe(concat("min.css"))
        .pipe(gulp.dest(_dist));
});

/* watch the files changing */
gulp.task('watch', function() {
    gulp.watch(_src + "/templates/**/*.html", ['templates']);
    gulp.watch(_src + "/**/*.js", ['scripts']);
    gulp.watch("./public/css/*.css", ['mincss']);
});

/* Build the whole app */
gulp.task('build', ['deps', 'scripts', 'templates', 'mincss']);

/* Task for development */
gulp.task('dev', function(cb) {
    runSequence('build', 'watch', cb);
});

/* Task for make a clean build */
gulp.task('default', function(cb) {
    runSequence('clean', 'build', cb);
});