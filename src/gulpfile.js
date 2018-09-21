// 在nodejs环境下运行的js文件
// 按照nodejs的语法使用

// 引用模块: require();  得到一个对象/函数
// gulp,gulp-sass

let gulp = require('gulp');//{task(),}
let babel = require('gulp-babel');
let rename =require('gulp-rename');
let minifyCss = require("gulp-minify-css");
let imagemin = require('gulp-imagemin');

gulp.task('es6',function(){
	gulp.src('./js/*.js')
	.pipe(babel({
		'presets':['es2015']
	}))
	.pipe(gulp.dest('./dist/js/'))
});
var uglify = require("gulp-uglify");

gulp.task('minify-js', function () {
    gulp.src('dist/js/*.js')
    .pipe(uglify())
    .pipe(rename({
			suffix: ".min"
		}))
    .pipe(gulp.dest('dist/js')); //压缩后的路径
});
    

gulp.task('minify-css', function () {
    gulp.src('css/*.css') // 要压缩的css文件
    .pipe(minifyCss()) //压缩css
    .pipe(rename({
			suffix: ".min"
		}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-img', function () {
    return gulp.src('images/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/img/'));
});
