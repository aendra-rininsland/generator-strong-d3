'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the praiseworthy ' + chalk.red('StrongD3') + ' generator!'
    ));

    var prompts = [{
      name: 'appName',
      message: 'What is your app\'s name ?'
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var context = {
        appName: this.appName
      };

      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        context
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        context
      );
      this.fs.copyTpl(
        this.templatePath('_index.html'),
        this.destinationPath('src/index.html'),
        context
      );
      this.fs.copyTpl(
        this.templatePath('_index.module.ts'),
        this.destinationPath('src/app/index.module.ts'),
        context
      );
      this.fs.copyTpl(
        this.templatePath('chart.ts'),
        this.destinationPath('src/app/chart.ts'),
        context
      );
      this.fs.copy(
        this.templatePath('index.scss'),
        this.destinationPath('src/app/index.scss')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('eslintrc'),
        this.destinationPath('.eslintrc')
      );
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('gulpfile'),
        this.destinationPath('gulpfile.js')
      );
      this.fs.copy(
        this.templatePath('karma'),
        this.destinationPath('karma.conf.js')
      );
      this.fs.copy(
        this.templatePath('tsconfig'),
        this.destinationPath('tsconfig.json')
      );
      this.fs.copy(
        this.templatePath('tsconfig'),
        this.destinationPath('tsconfig.json')
      );
      this.fs.copy(
        this.templatePath('tsd'),
        this.destinationPath('tsd.json')
      );
      this.fs.copy(
        this.templatePath('tslint'),
        this.destinationPath('tslint.json')
      );

      // Copy the whole gulp directory.
      this.fs.copy(
        this.templatePath('gulp/*'),
        this.destinationPath('gulp')
      );
    }
  },

  install: function () {
    var self = this;
    this.installDependencies({
      callback: function(){
        self.spawnCommand('tsd', ['install']); // Install TypeScript defs.
      }
    });
  }
});
