'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the smashing ' + chalk.red('strongly-typed D3') + ' generator!'
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
          {name: 'ES2015 via Babel using FlowType', value: 'babel'},
          {name: 'TypeScript 1.8', value: 'typescript'}
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
      },
      {
        name: 'testing',
        message: 'What testing framework do you want? (More to come!)',
        type: 'list',
        choices: [
          {name: 'Mocha + Chai — Because it\'s choco-licious!', value: 'mocha'},
          {name: 'None — Testing?! Ain\'t nobody got time for THAT', value: 'none'},
        ],
        default: 'none'
      },
      {
        name: 'testingChai',
        type: 'list',
        message: 'What would you like to write Chai assertions with?',
        choices: ['Should', 'Expect'],
        default: 'should',
        filter: val => val.toLowerCase(),
        when: answers => answers.testing === 'mocha'
      }
    ];

    this.prompt(prompts, function (props) {
      // To access props later use this.props.someOption;
      this.appName = props.appName;
      this.transpiler = props.transpiler;
      this.abstraction = props.abstraction;
      this.testing = props.testing;
      this.testingChai = props.testingChai;
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
          try {
            this.fs.copyTpl(
              this.templatePath('typescript/_index.module.ts'),
              this.destinationPath('src/app/index.module.ts'),
              context
            );
          } catch (e) {
            throw 'Issue with index.module template.';
          }

          this.fs.copy(
            this.templatePath('typescript/charting.ts'),
            this.destinationPath('src/app/charting.ts')
          );

          if (this.testing !== 'none') {
            switch(this.testing) {
              case 'mocha':
              try {
                this.fs.copyTpl(
                  this.templatePath('typescript/_charting.spec.ts'),
                  this.destinationPath('src/app/charting.spec.ts'),
                  context
                );
              } catch (e) {
                throw 'Issue with charting spec template.';
              }
              break;
            }
          }
        break;

        case 'babel':
          this.fs.copy(
            this.templatePath('babel/charting.js'),
            this.destinationPath('src/app/charting.js'),
            context
          );

          if (this.testing !== 'none') {
            switch(this.testing) {
              case 'mocha':
              try {
                this.fs.copyTpl(
                  this.templatePath('babel/_charting.spec.js'),
                  this.destinationPath('src/app/charting.spec.js'),
                  context
                );
              } catch (e) {
                throw 'Issue with charting spec template.';
              }
              break;
            }
          }

          try {
            this.fs.copyTpl(
              this.templatePath('babel/_index.module.js'),
              this.destinationPath('src/app/index.module.js'),
              context
            );
          } catch (e) {
            throw 'Issue with index.module template.';
          }
        break;
      }

      try {
        this.fs.copyTpl(
          this.templatePath('_package.json'),
          this.destinationPath('package.json'),
          context
        );
      } catch(e) {
        throw 'Issue with package.json template.';
      }

      try {
        this.fs.copyTpl(
          this.templatePath('_index.html'),
          this.destinationPath('src/index.html'),
          context
        );
      } catch (e) {
        throw 'Problem with index.html template.';
      }


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
        this.templatePath('tasks/*'),
        this.destinationPath('tasks')
      );

      switch(this.transpiler) {
        case 'typescript':

        this.fs.copy(
          this.templatePath('typescript/tsconfig'),
          this.destinationPath('tsconfig.json')
        );

        try {
          this.fs.copyTpl(
            this.templatePath('typescript/_typings'),
            this.destinationPath('typings.json'),
            context
          );
        } catch(e) {
          throw 'Issue with typings.json template.';
        }

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

          try {
            this.fs.copyTpl(
              this.templatePath('_eslintrc'),
              this.destinationPath('.eslintrc'),
              context
            );
          } catch(e) {
            throw 'Issue with .eslintrc template';
          }
        break;
      }

      try {
        this.fs.copyTpl(
          this.templatePath('_scripts.js'),
          this.destinationPath('tasks/scripts.js'),
          context
        );
      } catch(e) {
        throw 'Issue with scripts.js template.';
      }


      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );


      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );

      try {
        this.fs.copyTpl(
          this.templatePath('gulpfile'),
          this.destinationPath('gulpfile.js'),
          context
        );
      } catch(e) {
        throw 'Issue with gulpfile template.';
      }

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
          try {
            self.spawnCommand('typings', ['install']); // Install TypeScript defs.
          } catch(e) {
            throw 'You need to install typings: npm install -g typings';
          }

        }
      }
    });
  }
});
