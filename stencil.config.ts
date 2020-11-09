import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
export const config: Config = {
  namespace: 'toast',
  globalStyle: './src/assets/toast.scss',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        { src: './assets/icons', dest: './assets/icons' }
      ]
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins:[
    sass({
      injectGlobalPaths: [
        './src/assets/toast.scss',
      ]
    })
  ]
};
