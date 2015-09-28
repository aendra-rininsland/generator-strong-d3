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
          this.fs.copyTpl(
            this.templatePath('typescript/charting.ts'),
            this.destinationPath('src/app/charting.ts'),
            context
          );
        break;
        case 'babel':
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
        appName: this.appName,
        abstraction: this.abstraction,
        transpiler: this.transpiler
      };
      switch(this.transpiler) {
        case 'typescript':

        this.fs.copy(
          this.templatePath('typescript/tsconfig'),
          this.destinationPath('tsconfig.json')
        );
        this.fs.copyTpl(
          this.templatePath('typescript/_tsd'),
          this.destinationPath('tsd.json')
        );
        this.fs.copy(
          this.templatePath('typescript/tslint'),
          this.destinationPath('tslint.json')
        );

        break;
        case 'babel':
          this.fs.copyTpl(
            this.templatePath('babel/.babelrc'),
            this.destinationPath('.babelrc')
          );
        break;
      }
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
        if (this.transpiler === 'typescript') {
          self.spawnCommand('tsd', ['install']); // Install TypeScript defs.
        }
      }
    });
  }
});
