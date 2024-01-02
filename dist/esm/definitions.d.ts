export interface ICloudDocsPlugin {
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
        overwrite?: boolean;
    }): Promise<{
        result: string;
        url: string;
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
    fileExist(options: {
        path: string;
    }): Promise<{
        result: boolean;
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
