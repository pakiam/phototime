module.exports=function(grunt){
    grunt.initConfig({
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'stylesheets/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'stylesheets/',
                    ext: '.min.css'
                }]
            }
        },
        imagemin:{
            options: {
                cache: false
            },

            dist: {
                files: [{
                    expand: true,
                    cwd: 'img',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img-min'
                }]
            }
        },
        uglify:{
            my_target: {
                files: {
                    'js/main.min.js': ['js/main.js']
                }
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-imagemin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks('grunt-newer');

    grunt.registerTask("default",["newer:uglify","newer:imagemin","newer:cssmin"]);
};