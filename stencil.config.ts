import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'x-ckeditor',
  outputTargets: [
    { type: 'dist' },
    { type: 'docs' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  copy: [
    { src: 'editor-manager.js' }
  ]
};
