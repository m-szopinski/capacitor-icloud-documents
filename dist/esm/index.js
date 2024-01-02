import { registerPlugin } from '@capacitor/core';
const ICloudDocs = registerPlugin('ICloudDocs', {
    web: () => import('./web').then(m => new m.ICloudDocsWeb()),
});
export * from './definitions';
export { ICloudDocs };
//# sourceMappingURL=index.js.map