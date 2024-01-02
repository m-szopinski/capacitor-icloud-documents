import { WebPlugin } from '@capacitor/core';
export class ICloudDocsWeb extends WebPlugin {
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
//# sourceMappingURL=web.js.map