'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var TwoblokesStaticGenerator = module.exports = function TwoblokesStaticGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(TwoblokesStaticGenerator, yeoman.generators.Base);


TwoblokesStaticGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
  {
    name: 'siteName',
    message: 'What do you want to call your new static site?'
  },
  {
    name: 'clientNumber',
    message: 'Enter client number (eg. a150)...'
  }
  ];

  this.prompt(prompts, function (props) {
    this.siteName       = props.siteName;
    this.clientNumber   = props.clientNumber;

    cb();
  }.bind(this));
};


TwoblokesStaticGenerator.prototype.app = function app() {
  this.mkdir('public');
  this.mkdir('public/stylesheets');
  this.mkdir('public/javascripts');
  this.mkdir('public/images');

  this.mkdir('sass');
  
  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.copy('index.html', 'public/index.html');
  
  this.copy('_global.scss', 'sass/_global.scss');
  this.copy('_helpers.scss', 'sass/_helpers.scss');
  this.copy('_reset.scss', 'sass/_reset.scss');
  this.copy('application.scss', 'sass/application.scss');
};


TwoblokesStaticGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
