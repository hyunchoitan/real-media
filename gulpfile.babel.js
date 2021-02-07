import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";

const routes = {
    pug : {
        watch : "src/**/*.pug",
        src : "src/*.pug",
        dest : "build"
    }
}

const pug = () => gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest))

const watch = () => gulp.watch(routes.pug.watch, pug);

const webserver = () => gulp.src("build").pipe(ws({
    livereload: true,
    open: true
}))

const clean = () => del(["build"])

const prepare = gulp.series([clean])

const live = gulp.parallel([webserver, watch])


const assets = gulp.series([pug]);

export const dev = gulp.series([prepare,assets,live])