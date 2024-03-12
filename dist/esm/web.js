import { WebPlugin } from '@capacitor/core';
import fs from 'indexeddb-fs';
export class ICloudDocsWeb extends WebPlugin {
    async echo(options) {
        console.log('ECHO', options);
        return options;
    }
    async readFile(options) {
        console.log('Read iCloud file', options);
        return fs.readFile(options.filePath).then((res) => {
            return {
                fileStream: res
            };
        });
    }
    async readFileB64(options) {
        console.log('Read Base64 iCloud file', options);
        return fs.readFile(options.filePath).then((res) => {
            return {
                fileStream: res
            };
        });
    }
    async removeFile(options) {
        console.log('Remove iCloud file', options);
        return fs.removeFile(options.filePath).then(() => {
            return {
                result: 'OK',
                url: options.filePath
            };
        });
    }
    async writeFile(options) {
        console.log('Write iCloud file', options);
        return fs.writeFile(options.filePath, options.data).then(() => {
            return {
                result: 'OK',
                url: options.filePath
            };
        });
    }
    async fileExist(options) {
        console.log('Check if iCloud file exist', options);
        return fs.exists(options.path).then((res) => {
            return {
                result: res,
            };
        });
    }
    async mkdir(options) {
        console.log('Create iCloud directory', options);
        return fs.createDirectory(options.path).then(() => {
            return {
                result: 'OK',
                url: options.path
            };
        });
    }
    async stat(options) {
        console.log('Stat of iCloud file', options);
        return fs.details(options.path).then((res) => {
            return {
                type: res.directory ? 'Directory' : 'File',
                size: 0,
                modificationDate: res.createdAt.toString(),
                creationDate: res.createdAt.toString()
            };
        });
    }
    async readdir(options) {
        console.log('List iCloud files', options);
        return fs.readDirectory(options.path).then((res) => {
            return {
                result: [...res.directories.map((d) => d.name), ...res.files.map((f) => f.name)]
            };
        });
    }
    async initUbiquitousContainer() {
        console.log('Init iCloud container');
        return new Promise((resolve) => {
            resolve();
        });
    }
    async syncToCloud(options) {
        console.log('Sync iCloud file', options);
        return { url: '' };
    }
}
//# sourceMappingURL=web.js.map