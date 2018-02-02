(function() {
    "use strict";

    var path = require("path");
    var gulp = require("gulp");
    var conf = require("./conf");
    var imagemin = require('gulp-imagemin');

// images task
    gulp.task("images", function() {
        return gulp.src(path.join(conf.paths.src, "/assets/images/**/*"), {addRootSlash: true})
            .pipe(imagemin({
                interlaced: true,
                progressive: true,
                optimizationLevel: 5,
                verbose: true,
                svgoPlugins: [{removeViewBox: true}]
            }))
            .pipe(gulp.dest(path.join(conf.paths.tmp, "/serve/images")))
            .pipe(gulp.dest(path.join(conf.paths.dist, "/images")));
    });

})();