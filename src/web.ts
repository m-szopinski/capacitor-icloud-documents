import { WebPlugin } from '@capacitor/core';

import type { ICloudDocsPlugin } from './definitions';

import fs from 'indexeddb-fs';


export class ICloudDocsWeb extends WebPlugin implements ICloudDocsPlugin {


  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
  async readFile(options: {
    filePath: string;
  }): Promise<{ fileStream: string }> {
    console.log('Read iCloud file', options);
    return fs.readFile(options.filePath).then((res) => {
      return {
        fileStream: res as string
      }
    });
  }
  async readFileB64(options: {
    filePath: string;
  }): Promise<{ fileStream: string }> {
    console.log('Read Base64 iCloud file', options);
    return fs.readFile(options.filePath).then((res) => {
      return {
        fileStream: res as string
      }
    });
  }
  async removeFile(options: {
    filePath: string;
  }): Promise<{ result: string; url: string }> {
    console.log('Remove iCloud file', options);
    return fs.removeFile(options.filePath).then(() => {
      return {
        result: 'OK',
        url: options.filePath
      }
    });
  }
  async writeFile(options: {
    filePath: string;
    data: string;
  }): Promise<{ result: string; url: string }> {
    console.log('Write iCloud file', options);
    return fs.writeFile(options.filePath, options.data).then(() => {
      return {
        result: 'OK',
        url: options.filePath
      }
    });
  }
  async fileExist(options: { path: string }): Promise<{ result: boolean }> {
    console.log('Check if iCloud file exist', options);
    return fs.exists(options.path).then((res) => {
      return {
        result: res,
      }
    });
  }
  async mkdir(options: {
    path: string;
  }): Promise<{ result: string; url: string }> {
    console.log('Create iCloud directory', options);
    return fs.createDirectory(options.path).then(() => {
      return {
        result: 'OK',
        url: options.path
      }
    });
  }
  async stat(options: { path: string }): Promise<{
    type: 'Directory' | 'File';
    size: number;
    modificationDate: string;
    creationDate: string;
  }> {
    console.log('Stat of iCloud file', options);
    return fs.details(options.path).then((res) => {
      return {
        type: res.directory ? 'Directory' : 'File',
        size: 0,
        modificationDate: res.createdAt.toString(),
        creationDate: res.createdAt.toString()
      }
    });
  }
  async readdir(options: { path: string }): Promise<{ result: string[] }> {
    console.log('List iCloud files', options);
    return fs.readDirectory(options.path).then((res) => {
      return {
        result: [...res.directories.map((d) => d.name), ...res.files.map((f) => f.name)]
      }
    });
  }
  async initUbiquitousContainer(): Promise<void> {
    console.log('Init iCloud container');
    return new Promise((resolve) => {
      // BrowserFS.install(window);
      // Configures BrowserFS to use the LocalStorage file system.
      resolve();
    })
    
  }
  async syncToCloud(options: {
    filePath: string;
    destinationFolder: string;
  }): Promise<{ url: string }> {
    console.log('Sync iCloud file', options);
    return { url: '' };
  }
}
