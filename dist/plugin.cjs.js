'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@capacitor/core');

const ICloudDocs = core.registerPlugin('ICloudDocs', {
    web: () => Promise.resolve().then(function () { return web; }).then(m => new m.ICloudDocsWeb()),
});

class ICloudDocsWeb extends core.WebPlugin {
    async echo(options) {
        console.log('ECHO', options);
        return options;
    }
    async readFile(options) {
        console.log('Read iCloud file', options);
        return { fileStream: 'OK' };
    }
    async readFileB64(options) {
        console.log('Read Base64 iCloud file', options);
        return { fileStream: 'OK' };
    }
    async removeFile(options) {
        console.log('Remove iCloud file', options);
        return { result: 'OK', url: '' };
    }
    async writeFile(options) {
        console.log('Remove iCloud file', options);
        return { result: 'OK', url: '' };
    }
    async fileExist(options) {
        console.log('Check if iCloud file exist', options);
        return { result: false };
    }
    async mkdir(options) {
        console.log('Create iCloud directory', options);
        return { result: 'OK', url: '' };
    }
    async stat(options) {
        console.log('Stat of iCloud file', options);
        return { type: 'File', size: 0, modificationDate: '', creationDate: '' };
    }
    async readdir(options) {
        console.log('List iCloud files', options);
        return { result: [] };
    }
    async initUbiquitousContainer() {
        console.log('Init iCloud container');
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
//# sourceMappingURL=plugin.cjs.js.map
