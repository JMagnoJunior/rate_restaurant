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
        // mocha: {
        //     all: {
        //         src: ['test/testrunner.html'],
        //     },
        //     options: {
        //         run: true
        //     }
        // }
        // usemin : {
        //   html: 'dist/src/views/**/*.ejs'
        // },
        // useminPrepare: {
        //    options: {
        //         root: 'dist/public',
        //         dest: 'dist/public'
        //     },
        //     html: 'dist/src/views/**/*.ejs'
        // },
        // ngAnnotate:{
        //     options:{

        //     },
        //     scripts:{
        //         files:[{
        //             expand: true,
        //             src: ['dist/public/js/**/*.js']
        //         }]
        //     }
        // }
    })

    
    grunt.registerTask('default', ['mochaTest','dist']);
    grunt.registerTask('dist', ['clean', 'copy']);
    // grunt.registerTask('minifica', [ 'concat', 'uglify', 'cssmin']);
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-test');
    // grunt.loadNpmTasks('grunt-ng-annotate');
    // grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-usemin');

};