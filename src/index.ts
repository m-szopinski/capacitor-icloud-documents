import { registerPlugin } from '@capacitor/core';

import type { ICloudDocsPlugin } from './definitions';

const ICloudDocs = registerPlugin<ICloudDocsPlugin>('ICloudDocs', {
  web: () => import('./web').then(m => new m.ICloudDocsWeb()),
});

export * from './definitions';
export { ICloudDocs };
