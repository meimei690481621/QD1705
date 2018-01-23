const gulp =require("gulp");
gulp.task("hello",function(){
    console.log("hello");
})

//html
gulp.task("copy-html",function(){
    return gulp.src("html/*.html")
    .pipe(gulp.dest("dist/html"))
    .pipe(connect.reload());
})
//images拷贝图片
gulp.task("images",function(){
    return gulp.src("images/**/*")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})

//拷贝js文件
gulp.task("scripts",function(){
    return gulp.src("js/*.js")
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})
gulp.task("icon",function(){
    return gulp.src("icon/*.css")
    .pipe(gulp.dest("dist/icon"))
    .pipe(connect.reload());
})

//将scss文件转化成css文件
//生成两部分 min.css   .css
//gulp-scss giulp-minify-css gulp-rename

const scss =require("gulp-sass-china");
const minify = require("gulp-minify-css");
const rename =require("gulp-rename");

//css
gulp.task("scss-index",function(){
    return gulp.src("scss/index.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minify())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})


//拷贝data文件 整理数据源

gulp.task("data",function(){
    return  gulp.src("data/*.json")
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
})

//上述操作都是整理文件的，作为整体，建立项目的整体，让他们一起来执行

gulp.task("build",["copy-html","images","scripts","data","scss-index","icon"],function(){
    console.log("编译成功");
})

//gulp的监听

gulp.task("watch",function(){
    /*
        两个参数
        第一个参数我们要监听文件路径
        第二个参数我们监听到变化以后，要去执行的任务

    */
    gulp.watch("html/*.html",["copy-html"]);
    gulp.watch("images/**/*",["images"]);
    gulp.watch("js/*.js",["scripts"]);
    gulp.watch("data/*.json",["data"]);
    gulp.watch("scss/*.scss",["scss-index"]);
})

//启动服务器
// gulp-connect

var connect = require("gulp-connect");


gulp.task("server",function(){
    connect.server({
        root:"dist",
        port:8888,
        livereload:true //自动刷新
    })
})

gulp.task("default",["watch","server"]);