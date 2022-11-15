/**
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2022 Jonathan Terrell
 * @file datapos-resources/gruntfile.js
 * @license ISC
 */

const firebaseStorageUrl = 'gs://datapos-v00-dev-alpha.appspot.com/';

module.exports = function init(grunt) {
    // Initialise configuration.
    grunt.initConfig({
        bump: { options: { commitFiles: ['-a'], commitMessage: 'Release v%VERSION%', pushTo: 'origin' } },
        run: {
            build: { args: ['WARNING: Build is NOT implemented.'], cmd: 'echo' },
            copyRoot: { args: ['cp', '-r', 'public/singlePixel.png', `${firebaseStorageUrl}`], cmd: 'gsutil' },
            copyContextModelsToFirebase: { args: ['cp', '-r', 'public/contextModels/*', `${firebaseStorageUrl}contextModels/`], cmd: 'gsutil' },
            copyDocumentationToFirebase: { args: ['cp', '-r', 'public/documentation/*', `${firebaseStorageUrl}documentation/`], cmd: 'gsutil' },
            copySandboxesToFirebase: { args: ['cp', '-r', 'public/sandboxes/*', `${firebaseStorageUrl}sandboxes/`], cmd: 'gsutil' },
            copyFileStoreToFirebase: { args: ['cp', '-r', 'public/fileStore/*', `${firebaseStorageUrl}fileStore/`], cmd: 'gsutil' },
            copyPresentationBooksToFirebase: { args: ['cp', '-r', 'public/presentationBooks/*', `${firebaseStorageUrl}presentationBooks/`], cmd: 'gsutil' },
            identifyLicensesUsingLicenseChecker: { args: ['license-checker', '--production', '--json', '--out', 'LICENSES.json'], cmd: 'npx' },
            identifyLicensesUsingNLF: { args: ['nlf', '-d'], cmd: 'npx' },
            lint: { args: ['WARNING: Lint is NOT implemented.'], cmd: 'echo' },
            npmPublish: { args: ['WARNING: Publish is NOT implemented.'], cmd: 'echo' },
            test: { args: ['WARNING: No tests implemented.'], cmd: 'echo' }
        }
    });

    // Load external tasks.
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-run');

    // Register local tasks.
    grunt.registerTask('build', ['run:build']); // cmd+shift+b.
    grunt.registerTask('identifyLicenses', ['run:identifyLicensesUsingLicenseChecker', 'run:identifyLicensesUsingNLF']); // cmd+shift+i.
    grunt.registerTask('lint', ['run:lint']); // cmd+shift+l.
    grunt.registerTask('npmPublish', ['run:npmPublish']); // cmd+shift+n.
    grunt.registerTask('release', [
        'bump',
        'run:copyRoot',
        'run:copyContextModelsToFirebase',
        'run:copyDocumentationToFirebase',
        'run:copySandboxesToFirebase',
        'run:copyFileStoreToFirebase',
        'run:copyPresentationBooksToFirebase'
    ]); // cmd+shift+r.
    grunt.registerTask('synchronise', ['bump']); // cmd+shift+s.
    grunt.registerTask('test', ['run:test']); // cmd+shift+t.
};
