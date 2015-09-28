'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the totally wicked-hot ' + chalk.red('Strong D3') + ' generator!'
    ));

    var prompts = [
      {
        name: 'appName',
        message: 'What is your app\'s name ?',
        default : this.appname
      },
      {
        name: 'transpiler',
        message: 'How do you want to do type checking?',
        type: 'list',
        choices: [
          {name: 'ES2015 via Babel using Flow', value: 'babel'},
          {name: 'TypeScript 1.5', value: 'typescript'}
        ],
        default : 'babel'
      },
      {
        name: 'abstraction',
        message: 'Do you want to use a fancy-pants D3 abstraction?',
        type: 'list',
        choices: [
          {name: 'None — let\'s do this using vanilla D3!', value: 'vanilla'},
          {name: 'C3 — because I want super easy basic charts!', value: 'c3'},
          {name: 'Vega — because I like declarative formats and writing code is for chumps!', value: 'vega'},
          {name: 'NVD3 — because I want to create reusable models', value: 'nvd3'},
          {name: 'D4 — because I want something between Vega and NVD3', value: 'd4'}
        ],
        default: 'vanilla'
      }
    ];

    this.prompt(prompts, function (props) {
      // To access props later use this.props.someOption;
      this.appName = props.appName;
      this.transpiler = props.transpiler;
      this.abstraction = props.abstraction;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var context = {
        _: require('underscore.string'),
        appName: this.appName,
        abstraction: this.abstraction,
        transpiler: this.transpiler
      };

      switch(this.transpiler) {
        case 'typescript':
          this.fs.copyTpl(
            this.templatePath('typescript/_index.module.ts'),
            this.destinationPath('src/app/index.module.ts'),
            context
          );

          this.fs.copy(
            this.templatePath('typescript/charting.ts'),
            this.destinationPath('src/app/charting.ts')
          );
        break;

        case 'babel':
          this.fs.copy(
            this.templatePath('babel/charting.js'),
            this.destinationPath('src/app/charting.js'),
            context
          );

          this.fs.copyTpl(
            this.templatePath('babel/_index.module.js'),
            this.destinationPath('src/app/index.module.js'),
            context
          );
        break;
      }

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

      this.fs.copy(
        this.templatePath('index.scss'),
        this.destinationPath('src/app/index.scss')
      );
    },

    projectfiles: function () {
      var context = {
        _: require('underscore.string'),
        appName: this.appName,
        abstraction: this.abstraction,
        transpiler: this.transpiler
      };

      // Copy the whole gulp directory.
      this.fs.copy(
        this.templatePath('gulp/*'),
        this.destinationPath('gulp')
      );

      switch(this.transpiler) {
        case 'typescript':

        this.fs.copy(
          this.templatePath('typescript/tsconfig'),
          this.destinationPath('tsconfig.json')
        );
        this.fs.copyTpl(
          this.templatePath('typescript/_tsd'),
          this.destinationPath('tsd.json'),
          context
        );
        this.fs.copy(
          this.templatePath('typescript/tslint'),
          this.destinationPath('tslint.json')
        );

        break;
        case 'babel':
          this.fs.copy(
            this.templatePath('babel/.babelrc'),
            this.destinationPath('.babelrc')
          );
          this.fs.copy(
            this.templatePath('babel/.flowconfig'),
            this.destinationPath('.flowconfig')
          );
        break;
      }

      this.fs.copyTpl(
        this.templatePath('_scripts.js'),
        this.destinationPath('gulp/scripts.js'),
        context
      );

      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );

      this.fs.copyTpl(
        this.templatePath('_eslintrc'),
        this.destinationPath('.eslintrc'),
        context
      );

      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copyTpl(
        this.templatePath('gulpfile'),
        this.destinationPath('gulpfile.js'),
        context
      );
      this.fs.copy(
        this.templatePath('karma'),
        this.destinationPath('karma.conf.js')
      );
    }
  },

  install: function () {
    var self = this;
    this.installDependencies({
      callback: function(){
        if (self.transpiler === 'typescript') {
          self.spawnCommand('tsd', ['install']); // Install TypeScript defs.
        }
      }
    });
  }
});
