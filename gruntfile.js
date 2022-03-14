/**
 * @author Jonathan Terrell <jonathan.terrell@springbrook.es>
 * @copyright Copyright (c) 2019-2021 Springbrook S.L.
 * @license "ISC"
 */

const firebaseStorageUrl = 'gs://nectis-app-v00-dev-alpha.appspot.com/';

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
            copyBuildKitsToFirebase: { args: ['cp', '-r', 'public/buildKits/*', `${firebaseStorageUrl}buildKits`], cmd: 'gsutil' },
            copyDocumentationToFirebase: { args: ['cp', '-r', 'public/documentation/*', `${firebaseStorageUrl}documentation`], cmd: 'gsutil' },
            copyEmulatorsToFirebase: { args: ['cp', '-r', 'public/emulators/*', `${firebaseStorageUrl}emulators`], cmd: 'gsutil' },
            copyFileStoreToFirebase: { args: ['cp', '-r', 'public/fileStore/*', `${firebaseStorageUrl}fileStore`], cmd: 'gsutil' },
            copyPresentationBooksToFirebase: { args: ['cp', '-r', 'public/presentationBooks/*', `${firebaseStorageUrl}presentationBooks`], cmd: 'gsutil' },
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
    grunt.registerTask('audit', ['run:audit']);
    grunt.registerTask('build', ['run:build']);
    grunt.registerTask('identifyLicenses', ['run:identifyLicensesUsingLicenseChecker', 'run:identifyLicensesUsingNLF']);
    grunt.registerTask('lint', ['run:lint']);
    grunt.registerTask('outdated', ['run:outdated']);
    grunt.registerTask('publish', ['run:publish']);
    grunt.registerTask('release', [
        'bump',
        'run:copyBuildKitsToFirebase',
        'run:copyDocumentationToFirebase',
        'run:copyEmulatorsToFirebase',
        'run:copyFileStoreToFirebase',
        'run:copyPresentationBooksToFirebase'
    ]);
    grunt.registerTask('synchronise', ['bump']);
    grunt.registerTask('test', ['run:test']);
};
