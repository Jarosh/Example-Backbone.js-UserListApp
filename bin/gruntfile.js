module.exports = function(grunt) {
    grunt.initConfig({
        
        coffee: {
            compile: {
              files: {
                '../app/app.js': [
                    '../src/App*.coffee',
                    '../src/M*.coffee',
                    '../src/C*.coffee',
                    '../src/V*.coffee',
                    '../src/*.coffee'
                ]
              }
            }
        },
        
        uglify: {
            files: { 
                src: [
                    '../app/app.js'
                ],
                dest: '../app',
                expand: true,    // allow dynamic building
                flatten: true,   // remove all unnecessary nesting
                ext: '.min.js'   // replace .js to .min.js
            }
        }
        
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [ 'coffee', 'uglify' ]);
    
};
