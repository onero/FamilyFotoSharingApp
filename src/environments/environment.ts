// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBH4Khl_qDiaD5IQ98HCDrNizuOLz3xdMY',
    authDomain: 'adamino-family-photo-sharing.firebaseapp.com',
    databaseURL: 'https://adamino-family-photo-sharing.firebaseio.com',
    projectId: 'adamino-family-photo-sharing',
    storageBucket: 'adamino-family-photo-sharing.appspot.com',
    messagingSenderId: '445556601272'
  }
};
