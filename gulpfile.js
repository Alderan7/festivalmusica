const {series, src, dest, watch, parallel} = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp')
const concat = require('gulp-concat')

function css(done){
    return src('src/scss/app.scss')
        .pipe( sass() )
        .pipe( dest('./build/css') )
}

function comprimido(done){
    return src('src/scss/app.scss')
        .pipe( sass({
            outputStyle:'compressed'
        }) )
        .pipe( dest('./build/css') )
}

function javascript(){
    return src('src/js/**/*.js')
    .pipe(concat('bundle.js'))
    .pipe(dest('./build/js'))
}

function imagenes(){
    return src('src/img/**/*')
    .pipe(imagemin())
    .pipe(dest('./build/img'))
    .pipe(notify({message:'Imagen Minificada'}))
}

function versionWebp(){
    return src('src/img/**/*')
    .pipe(webp())
    .pipe(dest('./build/img'))
    .pipe(notify({message: 'Versión webP lista'}))
}

function watchArchivos(){
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
}

exports.css = css;
exports.comprimido =  comprimido;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;
exports.default = series(css, javascript, imagenes, versionWebp, watchArchivos);



/*function css(done){
    console.log('Compilando....SASS');
    done();
}

function javascript(done){
    console.log('Compilando....JAVASCRIPT');
    done();
}


exports.css=css;
exports.javascript=javascript;
exports.tareas=series(css, javascript);*/
//Podemos definir también las tareas por defecto:
//exports.default = series(css, javascript);
//Y así se ejecutará en la terminal simplemente poniendo 'gulp'

//Y si usamos 'parallel' en vez de series, se ejecutarían en paralelo
//exports.default = parallel(css, javascript);

