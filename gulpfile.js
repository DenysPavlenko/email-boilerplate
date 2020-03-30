// Modules
const gulp        = require('gulp');
const HubRegistry = require('gulp-hub');
const gulpConfig  = require('./gulp.config.js');

// Hub tasks
const hub = new HubRegistry(['gulp/**/*.js']);
gulp.registry(hub);

// Main dev task
const devTask = () => gulpConfig.lang === 'pug' ? gulp.parallel('pug-dev') : gulp.parallel('html-dev');
gulp.task('default', devTask());

// Main build task
gulp.task('build', gulp.parallel('sr', 'mc', 'html', 'cm'));

// Main themeforest production task
gulp.task('prod', gulp.parallel('html:prod', 'stampready:prod', 'mailchimp:prod', 'campaignmonitor:prod', 'assets:prod'));