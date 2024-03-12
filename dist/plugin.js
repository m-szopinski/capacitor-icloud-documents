var capacitorICloudDocs = (function (exports, core, fs, bfs, Storage) {
    'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var fs__namespace = /*#__PURE__*/_interopNamespace(fs);
    var bfs__namespace = /*#__PURE__*/_interopNamespace(bfs);

    const ICloudDocs = core.registerPlugin('ICloudDocs', {
        web: () => Promise.resolve().then(function () { return web; }).then(m => new m.ICloudDocsWeb()),
    });

    // import {
    //   initialize,
    // } from '@browserfs/core/emulation/shared'
    class ICloudDocsWeb extends core.WebPlugin {
        async echo(options) {
            console.log('ECHO', options);
            return options;
        }
        async readFile(options) {
            console.log('Read iCloud file', options);
            return new Promise((resolve, reject) => {
                fs__namespace.readFile(options.filePath, 'utf-8', (err, content) => {
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
                fs__namespace.readFile(options.filePath, (err, content) => {
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
                fs__namespace.unlink(options.filePath, err => {
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
                fs__namespace.writeFile(options.filePath, options.data, err => {
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
                fs__namespace.exists(options.path, exist => {
                    resolve({
                        result: exist,
                    });
                });
            });
        }
        async mkdir(options) {
            console.log('Create iCloud directory', options);
            return new Promise((resolve, reject) => {
                fs__namespace.mkdir(options.path, undefined, err => {
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
                fs__namespace.stat(options.path, (err, result) => {
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
                fs__namespace.readdir(options.path, (err, result) => {
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
            bfs__namespace.registerBackend(Storage.StorageFileSystem);
            return bfs__namespace.configure({ fs: 'Storage', options: { storage: localStorage } });
        }
        async syncToCloud(options) {
            console.log('Sync iCloud file', options);
            return { url: '' };
        }
    }

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        ICloudDocsWeb: ICloudDocsWeb
    });

    exports.ICloudDocs = ICloudDocs;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, capacitorExports, fs, bfs, Storage);
//# sourceMappingURL=plugin.js.map
