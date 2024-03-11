import { WebPlugin } from '@capacitor/core';
import type { ICloudDocsPlugin } from './definitions';
export declare class ICloudDocsWeb extends WebPlugin implements ICloudDocsPlugin {
    echo(options: {
        value: string;
    }): Promise<{
        value: string;
    }>;
    readFile(options: {
        filePath: string;
    }): Promise<{
        fileStream: string;
    }>;
    readFileB64(options: {
        filePath: string;
    }): Promise<{
        fileStream: string;
    }>;
    removeFile(options: {
        filePath: string;
    }): Promise<{
        result: string;
        url: string;
    }>;
    writeFile(options: {
        filePath: string;
        data: string;
    }): Promise<{
        result: string;
        url: string;
    }>;
    fileExist(options: {
        path: string;
    }): Promise<{
        result: boolean;
    }>;
    mkdir(options: {
        path: string;
    }): Promise<{
        result: string;
        url: string;
    }>;
    stat(options: {
        path: string;
    }): Promise<{
        type: 'Directory' | 'File';
        size: number;
        modificationDate: string;
        creationDate: string;
    }>;
    readdir(options: {
        path: string;
    }): Promise<{
        result: string[];
    }>;
    initUbiquitousContainer(): Promise<void>;
    syncToCloud(options: {
        filePath: string;
        destinationFolder: string;
    }): Promise<{
        url: string;
    }>;
}
