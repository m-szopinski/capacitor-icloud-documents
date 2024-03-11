import { WebPlugin } from '@capacitor/core';

import type { ICloudDocsPlugin } from './definitions';

import {
  readFile,
  unlink,
  writeFile,
  exists,
  mkdir,
  stat,
  readdir
} from '@browserfs/core/emulation/callbacks';

export class ICloudDocsWeb extends WebPlugin implements ICloudDocsPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
  async readFile(options: {
    filePath: string;
  }): Promise<{ fileStream: string }> {
    console.log('Read iCloud file', options);
    return new Promise((resolve, reject) => {
      readFile(options.filePath, 'utf-8' ,(err, content: any) => {
        if (err) {
          reject(err);
        }
        resolve({
          fileStream: content,
        });
      });
    });
  }
  async readFileB64(options: {
    filePath: string;
  }): Promise<{ fileStream: string }> {
    console.log('Read Base64 iCloud file', options);
    return new Promise((resolve, reject) => {
      readFile(options.filePath, (err, content) => {
        if (err) {
          reject(err);
        }
        resolve({
          fileStream: content?.toString() || '',
        });
      });
    });
  }
  async removeFile(options: {
    filePath: string;
  }): Promise<{ result: string; url: string }> {
    console.log('Remove iCloud file', options);
    return new Promise((resolve, reject) => {
      unlink(options.filePath, err => {
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
  async writeFile(options: {
    filePath: string;
    data: string;
  }): Promise<{ result: string; url: string }> {
    console.log('Write iCloud file', options);
    return new Promise((resolve, reject) => {
      writeFile(options.filePath, options.data, err => {
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
  async fileExist(options: { path: string }): Promise<{ result: boolean }> {
    console.log('Check if iCloud file exist', options);
    return new Promise(resolve => {
      exists(options.path, exist => {
        resolve({
          result: exist,
        });
      });
    });
  }
  async mkdir(options: {
    path: string;
  }): Promise<{ result: string; url: string }> {
    console.log('Create iCloud directory', options);
    return new Promise((resolve, reject) => {
      mkdir(options.path, undefined, err => {
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
  async stat(options: { path: string }): Promise<{
    type: 'Directory' | 'File';
    size: number;
    modificationDate: string;
    creationDate: string;
  }> {
    console.log('Stat of iCloud file', options);
    return new Promise((resolve, reject) => {
      stat(options.path, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve({
          type: result!.isDirectory() ? 'Directory' : 'File',
          size: result!.size,
          modificationDate: result?.mtime.toString() || new Date().toString(),
          creationDate: result?.ctime.toString() || new Date().toString(),
        });
      });
    });
  }
  async readdir(options: { path: string }): Promise<{ result: string[] }> {
    console.log('List iCloud files', options);
    return new Promise((resolve, reject) => {
      readdir(options.path, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve({
          result: result || [],
        });
      });
    });
  }
  async initUbiquitousContainer(): Promise<void> {
    console.log('Init iCloud container');
    return new Promise(resolve => {
      resolve();
    });
  }
  async syncToCloud(options: {
    filePath: string;
    destinationFolder: string;
  }): Promise<{ url: string }> {
    console.log('Sync iCloud file', options);
    return { url: '' };
  }
}
