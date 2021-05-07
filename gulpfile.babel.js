import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import img from "gulp-image";
import sass from "gulp-sass";
import autoP from "gulp-autoprefixer";
import minify from "gulp-csso";
import ghPages from "gulp-gh-pages"

sass.compiler = require('node-sass');

const routes = {
    pug : {
        watch : "src/**/*.pug",
        src : "src/*.pug",
        dest : "build"
    },
    img : {
        src : "src/img/*",
        dest : "build/img"
    },
    scss : {
        watch: "src/scss/**/*.scss",
        src : "src/scss/style.scss",
        dest: "build/css"
    }
}

const pug = () => gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest))

const image = () => gulp.src(routes.img.src).pipe(img()).pipe(gulp.dest(routes.img.dest))

const styles = () => gulp.src(routes.scss.src).pipe(sass().on('error', sass.logError)).pipe(autoP()).pipe(minify()).pipe(gulp.dest(routes.scss.dest))

const watch = () => {
    gulp.watch(routes.pug.watch, pug);
    gulp.watch(routes.img.src, image);
    gulp.watch(routes.scss.watch, styles)
}

const webserver = () => gulp.src("build").pipe(ws({
    livereload: true,
    open: true
}))

const clean = () => del(["build",".publish"])

const publish = () => gulp.src("build/**/*").pipe(ghPages())

const prepare = gulp.series([clean])

const live = gulp.parallel([webserver, watch])


const assets = gulp.series([pug, image, styles]);


export const build = gulp.series([prepare, assets])
export const dev = gulp.series([build,live])
export const deploy = gulp.series([build, publish, clean])