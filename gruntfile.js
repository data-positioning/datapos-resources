/**
 * @file datapos-resources/gruntfile.js
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2022 Jonathan Terrell
 */

// Constants
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

    grunt.registerTask('buildDataIndex', function (dataPath) {
        const folderPath = `public/${dataPath}`;
        const topLevelItem = buildFolderItem(folderPath, folderPath);
        processDirectory(folderPath, folderPath, topLevelItem);
        grunt.file.write(`public/${dataPath}Index.json`, JSON.stringify(topLevelItem));
    });

    function processDirectory(topLevelPath, path, parentItem) {
        const searchPath = `${path}/*`;
        for (const childPath of grunt.file.expand({ filter: 'isDirectory' }, searchPath)) {
            const childItem = buildFolderItem(topLevelPath, childPath);
            processDirectory(topLevelPath, childPath, childItem);
            parentItem.items.push(childItem);
        }
        for (const childPath of grunt.file.expand({ filter: 'isFile' }, searchPath)) {
            parentItem.items.push(buildFileItem(topLevelPath, childPath));
        }
        parentItem.childEntryCount = parentItem.items.length;
    }

    function buildFolderItem(topLevelPath, path) {
        const lastFolderName = extractLastFolderNameFromFolderPath(path);
        return {
            childEntryCount: 0,
            encodingId: null,
            extension: null,
            folderPath: path.substr(topLevelPath === topLevelPath ? 0 : topLevelPath.length + 1),
            handle: null,
            id: null,
            items: [],
            label: lastFolderName,
            lastModifiedAt: null,
            mimeType: null,
            name: null,
            referenceId: null,
            size: null,
            typeId: 'folder'
        };
    }

    function buildFileItem(topLevelPath, path) {
        const directoryPath = extractDirectoryPathFromEntryPath(path);
        const lastFolderName = extractLastFolderNameFromFolderPath(path);
        const extension = extractExtensionFromEntryPath(path);
        return {
            childEntryCount: null,
            encodingId: null,
            extension,
            folderPath: directoryPath.substr(topLevelPath.length + 1),
            handle: null,
            id: null,
            items: null,
            label: lastFolderName,
            lastModifiedAt: Date.parse('2022-01-03T23:33:00+00:00'),
            mimeType: lookupMimeTypeForFileExtension(extension),
            name: lastFolderName,
            referenceId: null,
            size: null,
            typeId: 'file'
        };
    }

    function extractDirectoryPathFromEntryPath(itemPath) {
        if (itemPath) {
            const lastIndex = itemPath.lastIndexOf('/');
            if (lastIndex > -1) return itemPath.substring(0, lastIndex);
        }
        return undefined;
    }

    function extractExtensionFromEntryPath(itemPath) {
        if (itemPath) {
            const lastExtensionIndex = itemPath.lastIndexOf('.');
            if (lastExtensionIndex > -1) return itemPath.substring(lastExtensionIndex + 1);
        }
        return undefined;
    }

    function extractLastFolderNameFromFolderPath(folderPath) {
        if (folderPath) {
            let lastSeparatorIndex;
            let lastCharacterIndex;
            if (folderPath.endsWith('/')) {
                lastSeparatorIndex = folderPath.lastIndexOf('/', folderPath.length - 2);
                lastCharacterIndex = folderPath.length - 1;
            } else {
                lastSeparatorIndex = folderPath.lastIndexOf('/');
                lastCharacterIndex = folderPath.length;
            }
            if (lastSeparatorIndex > -1) return folderPath.substring(lastSeparatorIndex + 1, lastCharacterIndex);
        }
        return undefined;
    }

    function lookupMimeTypeForFileExtension(extension) {
        switch (extension) {
            case 'csv':
                return 'text/csv';
            case 'tab':
            case 'tsv':
                return 'text/tab-separated-values';
            case 'xls':
                return 'application/vnd.ms-excel';
            case 'xlsx':
                return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            default:
                return 'application/octet-stream';
        }
    }

    // Register local tasks.
    grunt.registerTask('identifyLicenses', ['run:identifyLicensesUsingLicenseChecker', 'run:identifyLicensesUsingNLF']);
    // grunt.registerTask('release', [
    //     'bump',
    //     'run:copyRoot',
    //     'run:copyContextModelsToFirebase',
    //     'run:copyDocumentationToFirebase',
    //     'run:copySandboxesToFirebase',
    //     'run:copyFileStoreToFirebase',
    //     'run:copyPresentationBooksToFirebase'
    // ]); // cmd+shift+r.
    grunt.registerTask('synchronise', ['gitadd', 'bump']);
    grunt.registerTask('test', ['buildDataIndex:fileStore']);
};
