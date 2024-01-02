import { WebPlugin } from '@capacitor/core';

import type { ICloudDocsPlugin } from './definitions';

export class ICloudDocsWeb extends WebPlugin implements ICloudDocsPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
  async readFile(options: {
    filePath: string;
  }): Promise<{ fileStream: string }> {
    console.log('Read iCloud file', options);
    return { fileStream: 'OK' };
  }
  async readFileB64(options: {
    filePath: string;
  }): Promise<{ fileStream: string }> {
    console.log('Read Base64 iCloud file', options);
    return { fileStream: 'OK' };
  }
  async removeFile(options: {
    filePath: string;
  }): Promise<{ result: string; url: '' }> {
    console.log('Remove iCloud file', options);
    return { result: 'OK', url: '' };
  }
  async writeFile(options: {
    filePath: string;
    data: string;
  }): Promise<{ result: string; url: '' }> {
    console.log('Remove iCloud file', options);
    return { result: 'OK', url: '' };
  }
  async fileExist(options: { path: string }): Promise<{ result: boolean }> {
    console.log('Check if iCloud file exist', options);
    return { result: false };
  }
  async mkdir(options: { path: string }): Promise<{ result: string; url: '' }> {
    console.log('Create iCloud directory', options);
    return { result: 'OK', url: '' };
  }
  async stat(options: { path: string }): Promise<{
    type: 'Directory' | 'File';
    size: number;
    modificationDate: string;
    creationDate: string;
  }> {
    console.log('Stat of iCloud file', options);
    return { type: 'File', size: 0, modificationDate: '', creationDate: '' };
  }
  async readdir(options: { path: string }): Promise<{ result: string[] }> {
    console.log('List iCloud files', options);
    return { result: [] };
  }
  async initUbiquitousContainer(): Promise<void> {
    console.log('Init iCloud container');
  }
  async syncToCloud(options: {
    filePath: string;
    destinationFolder: string;
  }): Promise<{ url: string }> {
    console.log('Sync iCloud file', options);
    return { url: '' };
  }
}
