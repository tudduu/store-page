var gulp = require('gulp');
var browserSync = require('browser-sync');
var vulcanize = require('gulp-vulcanize');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var image = require('gulp-image');

// watch files for changes and reload
gulp.task('serve', function(){
   browserSync({
      server: {
          baseDir: 'www'
      } 
   });
   gulp.watch(['*.html', '**/*.html', 'js/*.js', 'css/*.css'], {cwd: 'www'}, browserSync.reload);
});

// concatenate custom elements 
gulp.task('vulcanize', function(){
  return gulp.src('www/index.html')
  .pipe(vulcanize({
      stripComments: true,
      inlineCss: true
  }))
  .pipe(gulp.dest('dist'))
});

gulp.task('compress', function() {
  return gulp.src('www/assets/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/scripts'));
});

gulp.task('minify-css', function() {
  return gulp.src('www/assets/styles/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/assets/styles'));
});

gulp.task('image', function(){
   gulp.src('./www/assets/images/*') 
   .pipe(image())
   .pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('dist', ['vulcanize', 'compress', 'minify-css', 'image']);