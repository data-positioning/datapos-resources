module.exports = function init(_grunt) {
    // Initialise configuration.
    _grunt.initConfig({
        bump: {
            options: {
                commitFiles: ['-a'],
                commitMessage: '<%if(grunt.config("commitMessage")){%><%=grunt.config("commitMessage")%><%}else{%>Release v%VERSION%<%}%>',
                pushTo: 'origin'
            }
        },

        run: {
            deploy: { args: ['deploy'], cmd: 'firebase' }
        }
    });

    // Load external tasks.
    _grunt.loadNpmTasks('grunt-bump');
    _grunt.loadNpmTasks('grunt-run');

    // Register local tasks.
    _grunt.registerTask('release', ['bump', 'run:deploy']);
};
