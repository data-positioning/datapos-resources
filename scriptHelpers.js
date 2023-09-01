const fs = require('fs').promises;
const path = require('path');

async function buildFileStoreIndex() {
    async function readDirectoryRecursively(directoryPath, itemNames) {
        const items = [];
        index[directoryPath.substring(16)] = items;
        for (const itemName of itemNames) {
            const itemPath = path.join(directoryPath, itemName);
            const stats = await fs.stat(itemPath);
            if (stats.isDirectory()) {
                const nextLevelChildren = await fs.readdir(itemPath);
                items.push({ childCount: nextLevelChildren.length, itemName, typeId: 'folder' });
                await readDirectoryRecursively(itemPath, nextLevelChildren);
            } else {
                items.push({ lastModifiedAt: stats.mtimeMs, itemName, size: stats.size, typeId: 'object' });
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
