(function () {
    'use strict';

    var __createBinding = (undefined && undefined.__createBinding) || (Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }));
    var __exportStar = (undefined && undefined.__exportStar) || function(m, exports) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ICloudDocs = void 0;
    const core_1$1 = require("@capacitor/core");
    const ICloudDocs = (0, core_1$1.registerPlugin)('ICloudDocs', {
        web: () => Promise.resolve().then(function () { return web; }).then(m => new m.ICloudDocsWeb()),
    });
    exports.ICloudDocs = ICloudDocs;
    __exportStar(require("./definitions"), exports);

    var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ICloudDocsWeb = void 0;
    const core_1 = require("@capacitor/core");
    const indexeddb_fs_1 = __importDefault(require("indexeddb-fs"));
    class ICloudDocsWeb extends core_1.WebPlugin {
        async echo(options) {
            console.log('ECHO', options);
            return options;
        }
        async readFile(options) {
            console.log('Read iCloud file', options);
            return indexeddb_fs_1.default.readFile(options.filePath).then((res) => {
                return {
                    fileStream: res
                };
            });
        }
        async readFileB64(options) {
            console.log('Read Base64 iCloud file', options);
            return indexeddb_fs_1.default.readFile(options.filePath).then((res) => {
                return {
                    fileStream: res
                };
            });
        }
        async removeFile(options) {
            console.log('Remove iCloud file', options);
            return indexeddb_fs_1.default.removeFile(options.filePath).then(() => {
                return {
                    result: 'OK',
                    url: options.filePath
                };
            });
        }
        async writeFile(options) {
            console.log('Write iCloud file', options);
            return indexeddb_fs_1.default.writeFile(options.filePath, options.data).then(() => {
                return {
                    result: 'OK',
                    url: options.filePath
                };
            });
        }
        async fileExist(options) {
            console.log('Check if iCloud file exist', options);
            return indexeddb_fs_1.default.exists(options.path).then((res) => {
                return {
                    result: res,
                };
            });
        }
        async mkdir(options) {
            console.log('Create iCloud directory', options);
            return indexeddb_fs_1.default.createDirectory(options.path).then(() => {
                return {
                    result: 'OK',
                    url: options.path
                };
            });
        }
        async stat(options) {
            console.log('Stat of iCloud file', options);
            return indexeddb_fs_1.default.details(options.path).then((res) => {
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
            return indexeddb_fs_1.default.readDirectory(options.path).then((res) => {
                return {
                    result: [...res.directories.map((d) => d.name), ...res.files.map((f) => f.name)]
                };
            });
        }
        async initUbiquitousContainer() {
            console.log('Init iCloud container');
            return new Promise((resolve) => {
                // BrowserFS.install(window);
                // Configures BrowserFS to use the LocalStorage file system.
                resolve();
            });
        }
        async syncToCloud(options) {
            console.log('Sync iCloud file', options);
            return { url: '' };
        }
    }
    exports.ICloudDocsWeb = ICloudDocsWeb;

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null
    });

})();
//# sourceMappingURL=plugin.js.map
