/**
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2022 Jonathan Terrell
 * @file datapos-resources/gruntfile.js
 * @license ISC
 */

// Vendor Dependencies
// const firebaseStorageUrl = 'gs://datapos-v00-dev-alpha.appspot.com/';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Initialisation
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = function init(grunt) {
    // Initialise configuration.
    grunt.initConfig({
        bump: { options: { commitFiles: ['-a'], commitMessage: 'Release v%VERSION%', pushTo: 'origin' } },
        gitadd: { task: { options: { all: true } } },
        run: {
            // copyRoot: { args: ['cp', '-r', 'public/singlePixel.png', `${firebaseStorageUrl}`], cmd: 'gsutil' },
            // copyContextModelsToFirebase: { args: ['cp', '-r', 'public/contextModels/*', `${firebaseStorageUrl}contextModels/`], cmd: 'gsutil' },
            // copyDocumentationToFirebase: { args: ['cp', '-r', 'public/documentation/*', `${firebaseStorageUrl}documentation/`], cmd: 'gsutil' },
            // copySandboxesToFirebase: { args: ['cp', '-r', 'public/sandboxes/*', `${firebaseStorageUrl}sandboxes/`], cmd: 'gsutil' },
            // copyFileStoreToFirebase: { args: ['cp', '-r', 'public/fileStore/*', `${firebaseStorageUrl}fileStore/`], cmd: 'gsutil' },
            // copyPresentationBooksToFirebase: { args: ['cp', '-r', 'public/presentationBooks/*', `${firebaseStorageUrl}presentationBooks/`], cmd: 'gsutil' },
            identifyLicensesUsingLicenseChecker: { args: ['license-checker', '--production', '--json', '--out', 'LICENSES.json'], cmd: 'npx' },
            identifyLicensesUsingNLF: { args: ['nlf', '-d'], cmd: 'npx' }
        }
    });

    // Load external tasks.
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-git');
    grunt.loadNpmTasks('grunt-run');

    // Register local tasks.
    grunt.registerTask('identifyLicenses', ['run:identifyLicensesUsingLicenseChecker', 'run:identifyLicensesUsingNLF']); // cmd+shift+i.
    // grunt.registerTask('release', [
    //     'bump',
    //     'run:copyRoot',
    //     'run:copyContextModelsToFirebase',
    //     'run:copyDocumentationToFirebase',
    //     'run:copySandboxesToFirebase',
    //     'run:copyFileStoreToFirebase',
    //     'run:copyPresentationBooksToFirebase'
    // ]); // cmd+shift+r.
    grunt.registerTask('synchronise', ['gitadd', 'bump']); // cmd+shift+s.
};
