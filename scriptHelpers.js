const fs = require('fs').promises;
const path = require('path');

async function buildFileStoreIndex() {
    async function readDirectoryRecursively(directoryPath, children) {
        const items = [];
        index[directoryPath.substring(16)] = items;
        for (const file of children) {
            const filePath = path.join(directoryPath, file);
            const stats = await fs.stat(filePath);
            if (stats.isDirectory()) {
                const nextLevelChildren = await fs.readdir(filePath);
                items.push({ childCount: nextLevelChildren.length, path: file, typeId: 'folder' });
                await readDirectoryRecursively(filePath, nextLevelChildren);
            } else {
                items.push({ lastModifiedAt: stats.mtimeMs, path: file, size: stats.size, typeId: 'object' });
            }
        }
    }

    const index = {};
    const toplevelChildren = await fs.readdir('public/fileStore/');
    await readDirectoryRecursively('public/fileStore/', toplevelChildren);
    fs.writeFile('./public/fileStoreIndex.json', JSON.stringify(index, undefined, 4), (error) => {
        if (error) return console.error(error);
    });
}

module.exports = { buildFileStoreIndex };
