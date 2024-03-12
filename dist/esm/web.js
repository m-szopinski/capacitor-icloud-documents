import { WebPlugin } from '@capacitor/core';
import * as fs from '@browserfs/core/emulation/callbacks';
import * as bfs from '@browserfs/core/index';
import { StorageFileSystem } from '@browserfs/dom/backends/Storage';
// import {
//   initialize,
// } from '@browserfs/core/emulation/shared'
export class ICloudDocsWeb extends WebPlugin {
    async echo(options) {
        console.log('ECHO', options);
        return options;
    }
    async readFile(options) {
        console.log('Read iCloud file', options);
        return new Promise((resolve, reject) => {
            fs.readFile(options.filePath, 'utf-8', (err, content) => {
                if (err) {
                    reject(err);
                }
                resolve({
                    fileStream: content,
                });
            });
        });
    }
    async readFileB64(options) {
        console.log('Read Base64 iCloud file', options);
        return new Promise((resolve, reject) => {
            fs.readFile(options.filePath, (err, content) => {
                if (err) {
                    reject(err);
                }
                resolve({
                    fileStream: (content === null || content === void 0 ? void 0 : content.toString()) || '',
                });
            });
        });
    }
    async removeFile(options) {
        console.log('Remove iCloud file', options);
        return new Promise((resolve, reject) => {
            fs.unlink(options.filePath, err => {
                if (err) {
                    reject(err);
                }
                resolve({
                    result: 'OK',
                    url: options.filePath,
                });
            });
        });
    }
    async writeFile(options) {
        console.log('Write iCloud file', options);
        return new Promise((resolve, reject) => {
            fs.writeFile(options.filePath, options.data, err => {
                if (err) {
                    reject(err);
                }
                resolve({
                    result: 'OK',
                    url: options.filePath,
                });
            });
        });
    }
    async fileExist(options) {
        console.log('Check if iCloud file exist', options);
        return new Promise(resolve => {
            fs.exists(options.path, exist => {
                resolve({
                    result: exist,
                });
            });
        });
    }
    async mkdir(options) {
        console.log('Create iCloud directory', options);
        return new Promise((resolve, reject) => {
            fs.mkdir(options.path, undefined, err => {
                if (err) {
                    reject(err);
                }
                resolve({
                    result: 'OK',
                    url: options.path,
                });
            });
        });
    }
    async stat(options) {
        console.log('Stat of iCloud file', options);
        return new Promise((resolve, reject) => {
            fs.stat(options.path, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve({
                    type: result.isDirectory() ? 'Directory' : 'File',
                    size: result.size,
                    modificationDate: (result === null || result === void 0 ? void 0 : result.mtime.toString()) || new Date().toString(),
                    creationDate: (result === null || result === void 0 ? void 0 : result.ctime.toString()) || new Date().toString(),
                });
            });
        });
    }
    async readdir(options) {
        console.log('List iCloud files', options);
        return new Promise((resolve, reject) => {
            fs.readdir(options.path, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve({
                    result: result || [],
                });
            });
        });
    }
    async initUbiquitousContainer() {
        console.log('Init iCloud container');
        bfs.registerBackend(StorageFileSystem);
        return bfs.configure({
            '/': { fs: 'AsyncMirror', options: { sync: { fs: 'InMemory' }, async: { fs: 'Storage' } } }
        });
    }
    async syncToCloud(options) {
        console.log('Sync iCloud file', options);
        return { url: '' };
    }
}
//# sourceMappingURL=web.js.map