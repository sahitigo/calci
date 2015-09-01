module.exports=function(grunt){
  grunt.initConfig({
    sass: {
      dist:{
        files: {
          'assets/stylesheets/src/styles.css': 'assets/stylesheets/src/styles.scss'
        }
      }
    },
    watch: {
      css: {
        files: ['assets/stylesheets/src/*.scss'],
        tasks: ['sass','cssmin','autoprefixer']
      }
    },
    cssmin: {
      target: {
        files: {
         'assets/stylesheets/app.min.css':
         [
         'assets/stylesheets/src/bootstrap.css',
         'assets/stylesheets/src/styles.css'
         
         ]
       }
     }
   }
 });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.registerTask('default',['sass','cssmin','autoprefixer','watch:css']);
};  