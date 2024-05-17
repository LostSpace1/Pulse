import gulp       from 'gulp';
import browserSync from 'browser-sync';
import dartSass, { Version } from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import rename       from 'gulp-rename';
import cleanCSS    from 'gulp-clean-css';
import autoprefixer  from 'gulp-autoprefixer';

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });

});

gulp.task('styles', function() {outputStyle: 'compressed'
    return gulp.src("src/sass/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
			cascade: false
		}))
        .pipe(cleanCSS({camtability: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function(){
    gulp.watch("src/sass/*.+(scss|sass)", gulp.parallel("styles"));
    gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));