'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('strong-d3:app', function () {
  var commonFiles = [
    'bower.json',
    'package.json',
    '.editorconfig',
    '.gitignore',
    'gulpfile.js',
    'karma.conf.js',
    'gulp/scripts.js',
    'gulp/build.js',
    'gulp/conf.js',
    'gulp/inject.js',
    'gulp/server.js',
    'gulp/styles.js',
    'gulp/unit-tests.js',
    'gulp/watch.js',
    'src/index.html',
    'src/app/index.scss'
  ];

  describe('it should work with TypeScript', function() {
    var tsFiles = [
      'src/app/index.module.ts',
      'src/app/charting.ts',
      'tsconfig.json',
      'tsd.json',
      'tslint.json'
    ];

    it('should work with vanilla', function(){
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({ skipInstall: true })
          .withPrompts({
            appName: 'mock app',
            transpiler: 'typescript',
            abstraction: 'vanilla'
          })
          .on('end', done);
      });

      it('creates files', function () {
        assert.file(commonFiles.concat(tsFiles));
      });
    });

    it('should work with C3', function(){
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({ skipInstall: true })
          .withPrompts({
            appName: 'mock app',
            transpiler: 'typescript',
            abstraction: 'c3'
          })
          .on('end', done);
      });

      it('creates files', function () {
        assert.file(commonFiles.concat(tsFiles));
      });
    });

    it('should work with NVD3', function(){
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({ skipInstall: true })
          .withPrompts({
            appName: 'mock app',
            transpiler: 'typescript',
            abstraction: 'nvd3'
          })
          .on('end', done);
      });

      it('creates files', function () {
        assert.file(commonFiles.concat(tsFiles));
      });
    });

    it('should work with Vega', function(){
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({ skipInstall: true })
          .withPrompts({
            appName: 'mock app',
            transpiler: 'typescript',
            abstraction: 'vega'
          })
          .on('end', done);
      });

      it('creates files', function () {
        assert.file(commonFiles.concat(tsFiles));
      });
    });

    it('should work with D4', function(){
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({ skipInstall: true })
          .withPrompts({
            appName: 'mock app',
            transpiler: 'typescript',
            abstraction: 'd4'
          })
          .on('end', done);
      });

      it('creates files', function () {
        assert.file(commonFiles.concat(tsFiles));
      });
    });
  });

  describe('it should work with Babel + Flow', function() {
    var babelFiles = [
      'src/app/charting.js',
      'src/app/index.module.js',
      '.babelrc',
      '.flowconfig',
      '.eslintrc'
    ];

    it('should work with vanilla', function(){
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({ skipInstall: true })
          .withPrompts({
            appName: 'mock app',
            transpiler: 'babel',
            abstraction: 'vanilla'
          })
          .on('end', done);
      });

      it('creates files', function () {
        assert.file(commonFiles.concat(babelFiles));
      });
    });

    it('should work with C3', function(){
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({ skipInstall: true })
          .withPrompts({
            appName: 'mock app',
            transpiler: 'babel',
            abstraction: 'c3'
          })
          .on('end', done);
      });

      it('creates files', function () {
        assert.file(commonFiles.concat(babelFiles));
      });
    });

    it('should work with NVD3', function(){
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({ skipInstall: true })
          .withPrompts({
            appName: 'mock app',
            transpiler: 'babel',
            abstraction: 'nvd3'
          })
          .on('end', done);
      });

      it('creates files', function () {
        assert.file(commonFiles.concat(babelFiles));
      });
    });

    it('should work with Vega', function(){
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({ skipInstall: true })
          .withPrompts({
            appName: 'mock app',
            transpiler: 'babel',
            abstraction: 'vega'
          })
          .on('end', done);
      });

      it('creates files', function () {
        assert.file(commonFiles.concat(babelFiles));
      });
    });

    it('should work with D4', function(){
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({ skipInstall: true })
          .withPrompts({
            appName: 'mock app',
            transpiler: 'babel',
            abstraction: 'd4'
          })
          .on('end', done);
      });

      it('creates files', function () {
        assert.file(commonFiles.concat(babelFiles));
      });
    });
  });
});
