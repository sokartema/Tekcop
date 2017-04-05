module.exports = function (grunt) {


    grunt.initConfig({
        browserify: {
            dist: {
                options: {
                    transform: [['babelify', { presets: ['react'] }]],
                    browserifyOptions: {
                        ignoreMissing: true,
                        debug: true
                    }

                },
                files: [
                    {
                        expand: true,
                        cwd: 'src/js/',
                        src: ['login/index.js'],
                        dest: 'build/js/'
                    }
                ]

            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/scss/',
                    src: ['*.scss'],
                    dest: 'build/css',
                    ext: '.css'
                }]
            }
        }

    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('default', ['browserify', 'sass']);


};