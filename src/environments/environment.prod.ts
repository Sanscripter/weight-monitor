import { EnvProd as env } from './env-prod.enum';

export const environment = {
  production: true,
  firebase: {
    apiKey: env.FIREBASE_APIKEY,
    authDomain: env.FIREBASE_AUTHDOMAIN,
    databaseURL: env.FIREBASE_DATABASEURL,
    projectId: env.FIREBASE_PROJECTID,
    storageBucket: env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: env.FIREBASE_MESSAGINGSENDERID,
    appId: env.FIREBASE_APPID,
    measurementId: env.FIREBASE_MEASUREMENTID,
  }
};
