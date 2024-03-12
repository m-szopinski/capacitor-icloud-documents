"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ICloudDocsWeb = void 0;
const core_1 = require("@capacitor/core");
const fs = __importStar(require("fs-web"));
class ICloudDocsWeb extends core_1.WebPlugin {
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
                    fileStream: content?.toString() || '',
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
                    modificationDate: result?.mtime.toString() || new Date().toString(),
                    creationDate: result?.ctime.toString() || new Date().toString(),
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
//# sourceMappingURL=web.js.map