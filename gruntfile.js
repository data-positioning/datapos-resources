/**
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2022 Jonathan Terrell
 * @license "ISC"
 */

const firebaseStorageUrl = 'gs://dataposapp-v00-dev-alpha.appspot.com/';

module.exports = function init(grunt) {
    // Initialise configuration.
    grunt.initConfig({
        bump: {
            options: {
                commitFiles: ['-a'],
                commitMessage: '<%if(grunt.config("commitMessage")){%><%=grunt.config("commitMessage")%><%}else{%>Release v%VERSION%<%}%>',
                pushTo: 'origin'
            }
        },

        run: {
            audit: { args: ['npm', 'audit'], cmd: 'npx' },
            build: { args: ['WARNING: Build is NOT implemented.'], cmd: 'echo' },
            copyDocumentationToFirebase: { args: ['cp', '-r', 'public/documentation/*', `${firebaseStorageUrl}documentation/`], cmd: 'gsutil' },
            copyEmulatorsToFirebase: { args: ['cp', '-r', 'public/emulators/*', `${firebaseStorageUrl}emulators/`], cmd: 'gsutil' },
            copyFileStoreToFirebase: { args: ['cp', '-r', 'public/fileStore/*', `${firebaseStorageUrl}fileStore/`], cmd: 'gsutil' },
            copyPresentationBooksToFirebase: { args: ['cp', '-r', 'public/presentationBooks/*', `${firebaseStorageUrl}presentationBooks/`], cmd: 'gsutil' },
            identifyLicensesUsingLicenseChecker: { args: ['license-checker', '--production', '--json', '--out', 'LICENSES.json'], cmd: 'npx' },
            identifyLicensesUsingNLF: { args: ['nlf', '-d'], cmd: 'npx' },
            lint: { args: ['WARNING: Lint is NOT implemented.'], cmd: 'echo' },
            outdated: { args: ['npm', 'outdated'], cmd: 'npx' },
            publish: { args: ['WARNING: Publish is NOT implemented.'], cmd: 'echo' },
            test: { args: ['WARNING: No tests implemented.'], cmd: 'echo' }
        }
    });

    // Load external tasks.
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-run');

    // Register local tasks.
    grunt.registerTask('audit', ['run:audit']); // cmd+shift+a.
    grunt.registerTask('build', ['run:build']); // cmd+shift+b.
    grunt.registerTask('identifyLicenses', ['run:identifyLicensesUsingLicenseChecker', 'run:identifyLicensesUsingNLF']); // cmd+shift+i.
    grunt.registerTask('lint', ['run:lint']); // cmd+shift+l.
    grunt.registerTask('outdated', ['run:outdated']); // cmd+shift+o.
    grunt.registerTask('publish', ['run:publish']); // cmd+shift+u.
    grunt.registerTask('release', ['bump', 'run:copyDocumentationToFirebase', 'run:copyEmulatorsToFirebase', 'run:copyFileStoreToFirebase', 'run:copyPresentationBooksToFirebase']); // cmd+shift+r.
    grunt.registerTask('synchronise', ['bump']); // cmd+shift+s.
    grunt.registerTask('test', ['run:test']); // cmd+shift+t.
};
