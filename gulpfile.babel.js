import gulp from "gulp";
import gpug from "gulp-pug";

const routes = {
    pug : {
        watch : "src/**/*.pug",
        src : "src/*.pug",
        dest : "build"
    }
}

const pug = () => gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest))


const assets = gulp.series([pug]);

export const dev = gulp.series([assets])