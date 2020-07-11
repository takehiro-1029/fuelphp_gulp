const gulp = require('gulp');
const browserSync = require('browser-sync');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const sassGlob = require('gulp-sass-glob');

gulp.task('browser-sync', function(done) {
  browserSync.init({
      proxy:"localhost/fuelphp_test/public/posts/action"
  })
  done();
});

gulp.task('bs-reload', function (done) {
  browserSync.reload();
  done();
});

gulp.task('sass', function(done) {
  // style.scssファイルを取得
    gulp.src("public/assets/scss/style.scss")
        .pipe(sourcemaps.init())
        .pipe(sassGlob()) // Sassの@importにおけるglobを有効にする
        // Sassのコンパイルを実行
        .pipe(sass({outputStyle: "expanded"}))
        //compressed 本番用
        //expanded 開発用
		.pipe(autoprefixer(['last 3 versions', 'ie >= 8', 'Android >= 4', 'iOS >= 8']))
		.pipe(sourcemaps.write())
        // cssフォルダー以下に保存
        .pipe(gulp.dest("public/assets/css/dist"));
        done();
});

// Gulpを使ったファイルの監視
gulp.task('default', gulp.series('sass','bs-reload','browser-sync', function(done){
  gulp.watch("./public/assets/scss/app/*.scss", gulp.task('sass'));
  gulp.watch("./public/assets/css/dist/*.css", gulp.task('bs-reload'));
  done();
}));