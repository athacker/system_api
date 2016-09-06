var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    env = require('gulp-env'),
    supertest = require('supertest');

gulp.task('default',function(){
    nodemon({
        script:'app.js',
        ext: '*.js',
        env:{
            PORT:8000
        },
        ignore:['./node_modules/**']
    }) .on('restart',function(){
        console.log('Gulp-Nodemon has detected a change and is restarting')
    })
});

gulp.task('test', function(){
    process.env.ENV = 'test';
    env({vars:{ENV:'test'}});//prod dev local test
    gulp.src('tests/*.js', {read: false}).pipe(gulpMocha({reporter: 'nyan'}))
});