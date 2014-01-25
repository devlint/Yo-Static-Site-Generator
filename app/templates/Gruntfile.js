module.exports = function(grunt) {

  grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

      sass: {
        dist: {
          options: {
            style: 'compressed'
          },
          files: {
            'public/stylesheets/application.css': 'sass/application.scss'
          }
        } 
      },
      
      concat: {   
        dist: {
          src: [
            'public/javascripts/libs/*.js',
            'public/javascripts/application.js'
          ],
          dest: 'public/javascripts/live/live.min.js'
        }
      },

      uglify: {
        build: {
          src: [
            'public/javascripts/libs/*.js',
            'public/javascripts/application.js'
          ],
          dest: 'public/javascripts/live/live.min.js'
        }
      },

      imagemin: {
        dynamic: {
          files: [{
            expand: true,
            cwd: 'public/images/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'public/images/live/'
          }]
        }
      },

      watch: {
        scripts: {
          files: [
            'public/javascripts/libs/*.js',
            'public/javascripts/application.js'
          ],
          tasks: ['concat', 'uglify'],
          options: {
            spawn: false,
          },
        },
        css: {
          files: ['sass/*.scss', 'sass/sections/*.scss'],
          tasks: ['sass'],
          options: {
            spawn: false,
          }
        }
      }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['concat', 'uglify', 'sass', 'imagemin']);

  grunt.registerTask('dev', ['watch']);

};