module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            project:{
                expand: true,
                cws: ',',
                src: ['**', '!Gruntfile.js', '!package.json', '!bower.json'],
                dest: 'dist'
            }
        },
        clean:{
            dist:{
                src: 'dist'
            }
        },
        mochaTest: {
            test: {
                options: {
                reporter: 'spec',
                clearRequireCache: true
                },
                src: ['test/**/*.spec.js']
            },
        }
   
    })
    
    grunt.registerTask('default', ['mochaTest','dist']);
    grunt.registerTask('dist', ['clean', 'copy']);

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-test');

};