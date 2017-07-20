/**
 * Created by Administrator on 2017/7/19.
 */
var path = require("path")
var gulp = require("gulp")
var sass = require("gulp-sass")
var fileinclude = require("gulp-file-include")

var projectMap = require('gulp-project-map');

var browserSync = require("browser-sync")
var reload = browserSync.reload;


gulp.task("sass", function () {
    gulp.src("./src/app/style.scss")
        .pipe(sass())
        .pipe(gulp.dest("./build/css/"))
})

gulp.task("html", function () {
    gulp.src(["./src/app/**/*.html"])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: path.join(__dirname, "./src"),
            context:{
                web:"//localhost:8090"
            }
        }))
        .pipe(gulp.dest("./build/html"))
})

gulp.task("copy", function () {
    gulp.src("./src/static/**/*")
        .pipe(gulp.dest("./build/static"))

})

gulp.task("map",function () {
    projectMap({
        path: './build',
        name:"index"
    });
})

gulp.task("default", ['sass', 'html'], function () {
    browserSync.init({
        server:"./build",
        port:8090,
        open:"local",
        browser: "google chrome"
    })


    gulp.watch("./src/**/*.scss", ['sass'])
    gulp.watch("./src/**/*.html", ['html'])

    gulp.watch("./build/**/*").on("change",reload)
})


