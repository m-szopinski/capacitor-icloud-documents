"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ICloudDocsWeb = void 0;
const core_1 = require("@capacitor/core");
require("@browserfs/core");
require("@browserfs/dom");
const bfs = require('@browserfs/core');
const bfs_dom = require('@browserfs/dom');
// import {
//   initialize,
// } from '@browserfs/core/emulation/shared'
class ICloudDocsWeb extends core_1.WebPlugin {
    async echo(options) {
        console.log('ECHO', options);
        return options;
    }
    async readFile(options) {
        console.log('Read iCloud file', options);
        return new Promise((resolve, reject) => {
            bfs.fs.readFile(options.filePath, 'utf-8', (err, content) => {
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
            bfs.fs.readFile(options.filePath, (err, content) => {
                if (err) {
                    reject(err);
                }
                resolve({
                    fileStream: content?.toString() || '',
                });
            });
        });
    }
    async removeFile(options) {
        console.log('Remove iCloud file', options);
        return new Promise((resolve, reject) => {
            bfs.fs.unlink(options.filePath, err => {
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
            bfs.fs.writeFile(options.filePath, options.data, err => {
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
            bfs.fs.exists(options.path, exist => {
                resolve({
                    result: exist,
                });
            });
        });
    }
    async mkdir(options) {
        console.log('Create iCloud directory', options);
        return new Promise((resolve, reject) => {
            bfs.fs.mkdir(options.path, undefined, err => {
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
            bfs.fs.stat(options.path, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve({
                    type: result.isDirectory() ? 'Directory' : 'File',
                    size: result.size,
                    modificationDate: result?.mtime.toString() || new Date().toString(),
                    creationDate: result?.ctime.toString() || new Date().toString(),
                });
            });
        });
    }
    async readdir(options) {
        console.log('List iCloud files', options);
        return new Promise((resolve, reject) => {
            bfs.fs.readdir(options.path, (err, result) => {
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
        bfs.registerBackend(bfs_dom.StorageFileSystem);
        return bfs.configure({ '/': 'Storage' });
    }
    async syncToCloud(options) {
        console.log('Sync iCloud file', options);
        return { url: '' };
    }
}
exports.ICloudDocsWeb = ICloudDocsWeb;
//# sourceMappingURL=web.js.map