/**
 * @file datapos-resources/gruntfile.js
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2022 Jonathan Terrell
 */

// Constants
// const firebaseStorageUrl = 'gs://datapos-v00-dev-alpha.appspot.com/';

// Dependencies - Framework/Vendor
const {
    auditDependencies,
    checkDependencies,
    identifyLicenses,
    lintCode,
    logNotImplementedMessage,
    migrateDependencies,
    updateDataPosDependencies
} = require('@datapos/datapos-operations/commonHelpers');

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = function init(grunt) {
    // Set external task configuration.
    grunt.initConfig({
        bump: { options: { commitFiles: ['-a'], commitMessage: 'v%VERSION%', pushTo: 'origin' } },
        gitadd: { task: { options: { all: true } } }
        // run: {
        //     copyRoot: { args: ['cp', '-r', 'public/singlePixel.png', `${firebaseStorageUrl}`], cmd: 'gsutil' },
        //     copyContextModelsToFirebase: { args: ['cp', '-r', 'public/contextModels/*', `${firebaseStorageUrl}contextModels/`], cmd: 'gsutil' },
        //     copyDocumentationToFirebase: { args: ['cp', '-r', 'public/documentation/*', `${firebaseStorageUrl}documentation/`], cmd: 'gsutil' },
        //     copySandboxesToFirebase: { args: ['cp', '-r', 'public/sandboxes/*', `${firebaseStorageUrl}sandboxes/`], cmd: 'gsutil' },
        //     copyFileStoreToFirebase: { args: ['cp', '-r', 'public/fileStore/*', `${firebaseStorageUrl}fileStore/`], cmd: 'gsutil' },
        //     copyPresentationBooksToFirebase: { args: ['cp', '-r', 'public/presentationBooks/*', `${firebaseStorageUrl}presentationBooks/`], cmd: 'gsutil' },
        // }
    });

    // Load external tasks.
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-git');

    const index = {};

    grunt.registerTask('buildDataIndex', function (dataPath) {
        const folderPath = `public/${dataPath}`;
        processDirectory(folderPath, folderPath, []);
        grunt.file.write(`public/${dataPath}Index.json`, JSON.stringify(index));
    });

    function processDirectory(topLevelPath, path, parentItem) {
        const searchPath = `${path}/*`;
        for (const childPath of grunt.file.expand({ filter: 'isDirectory' }, searchPath)) {
            processDirectory(topLevelPath, childPath, []);
            parentItem.push({ path: childPath.substr(path.length + 1), typeId: 'folder' });
        }
        for (const childPath of grunt.file.expand({ filter: 'isFile' }, searchPath)) {
            parentItem.push({ path: childPath.substr(path.length + 1), typeId: 'file' });
        }
        index[path.substr(topLevelPath.length + 1)] = parentItem;
    }

    // // Register local tasks.
    // grunt.registerTask('release', ['bump', 'run:copyRoot', 'run:copyContextModelsToFirebase', 'run:copyDocumentationToFirebase', 'run:copySandboxesToFirebase', 'run:copyFileStoreToFirebase', 'run:copyPresentationBooksToFirebase']);

    // Register local tasks.
    grunt.registerTask('auditDependencies', function () {
        auditDependencies(grunt, this);
    });
    grunt.registerTask('checkDependencies', function () {
        checkDependencies(grunt, this);
    });
    grunt.registerTask('identifyLicenses', function () {
        identifyLicenses(grunt, this);
    });
    grunt.registerTask('lintCode', function () {
        lintCode(grunt, this, ['*.cjs', '*.js']);
    });
    grunt.registerTask('logNotImplementedMessage', (taskName) => logNotImplementedMessage(taskName));
    grunt.registerTask('migrateDependencies', function () {
        migrateDependencies(grunt, this);
    });
    grunt.registerTask('updateDataPosDependencies', function (updateTypeId) {
        updateDataPosDependencies(grunt, this, updateTypeId);
    });

    // Register common repository management tasks. These tasks are all invoked by VSCode keyboard shortcuts identified in the comments.
    grunt.registerTask('audit', ['auditDependencies']); // alt+ctrl+shift+a.
    grunt.registerTask('build', ['buildDataIndex:fileStore']); // alt+ctrl+shift+b.
    grunt.registerTask('check', ['checkDependencies']); // alt+ctrl+shift+c.≤
    grunt.registerTask('document', ['identifyLicenses']); // alt+ctrl+shift+d.
    grunt.registerTask('format', ['logNotImplementedMessage:Format']); // alt+ctrl+shift+f.
    grunt.registerTask('lint', ['lintCode']); // alt+ctrl+shift+l.
    grunt.registerTask('migrate', ['migrateDependencies']); // alt+ctrl+shift+m.
    grunt.registerTask('publish', ['logNotImplementedMessage:Publish']); // alt+ctrl+shift+p.
    grunt.registerTask('release', ['buildDataIndex:fileStore', 'gitadd', 'bump']); // alt+ctrl+shift+r.
    grunt.registerTask('synchronise', ['gitadd', 'bump']); // alt+ctrl+shift+s.
    grunt.registerTask('test', ['logNotImplementedMessage:Test']); // alt+ctrl+shift+t.
    grunt.registerTask('update', ['updateDataPosDependencies']); // alt+ctrl+shift+u.
};
