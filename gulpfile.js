const { src, dest, series, watch } = require("gulp");

const sass         = require("gulp-sass");
const minify       = require("gulp-minify");
const terser       = require("gulp-terser");
const autoprefixer = require("gulp-autoprefixer");
const livereload   = require("gulp-livereload");

sass.compiler      = require("node-sass");

function styles () {
    console.log("Compiling styles...");
    return src("src/scss/index.scss")
        .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(dest("dist/css"))
        .pipe(livereload());
}
exports.styles = styles;

function watcher () {
    console.log("Starting watch...");
    livereload.listen();
    watch("src/scss/*.scss", styles);
    watch("src/js/*.js", javascript);
    watch("src/*.html", html);
}
exports.watcher = watcher;

function html () {
    console.log("Moving html...");
    return src("src/index.html")
        .pipe(dest("dist/"))
        .pipe(livereload());
}
exports.html = html;

function fonts () {
    console.log("Moving fonts...");
    return src("src/fonts/*.*", {base: "./src"})
        .pipe(dest("dist/"))
        .pipe(livereload());
}
exports.fonts = fonts;

function javascript () {
    console.log("Moving js...");
    return src("src/js/*.*", {base: "./src"})
        .pipe(minify({
            noSource: true
        }))
        .pipe(terser())
        .pipe(dest("dist/"))
        .pipe(livereload());
}
exports.javascript = javascript;

function favicon () {
    console.log("Moving favicon...");
    return src("src/favicon.png")
        .pipe(dest("dist/"))
        .pipe(livereload());
}
exports.favicon = favicon;

exports.default = series(html, styles, fonts, javascript, favicon, watcher);
