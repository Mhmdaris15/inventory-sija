import superagent from "superagent";
import {appConfig} from "../config/app";
import {store} from "./useStore";

export const http = {
    get: (url, opts = {}) => {
        let req = superagent.get(appConfig.apiUrl + url);
        if (store.authentication.accessToken) {
            console.log("masuk if")
            req = req.set('token', store.authentication.accessToken);
        }else {
            req = req.set('token', localStorage.getItem('id_token'));
        }
        console.log(JSON.stringify(req, null, 4), "http ")
        return req;
    },
    post: (url, opts) => {
        let req = superagent.post(appConfig.apiUrl + url, opts);
        if (store.token) {
            req = req.set('token', + store.authentication.accessToken);
        }else {
            req = req.set('token', localStorage.getItem('id_token'));
        }
        return req;
    },
    put: (url, opts) => {
        let req = superagent.put(appConfig.apiUrl + url, opts);
        if (store.authentication.accessToken) {
            req = req.set('token', + store.authentication.accessToken);
        }else {
            req = req.set('token', localStorage.getItem('id_token'));
        }
        return req;
    },
    del: (url, opts) => {
        let req = superagent.del(appConfig.apiUrl + url);
        if (store.token) {
            req = req.set('token', + store.authentication.accessToken);
        }else {
            req = req.set('token', localStorage.getItem('id_token'));
        }
        return req;
    },
    patch: (url, opts) => {
        let req = superagent.patch(appConfig.apiUrl + url, opts);
        if (store.authentication.accessToken) {
            req = req.set('token', + store.authentication.accessToken);
        }else {
            req = req.set('token', localStorage.getItem('id_token'));
        }
        return req;
    },
    upload: (file) => {
        const request = superagent
            .post(appConfig.apiUrl + '/files')
            .attach('file', file);

        return request;
    },
    uploadAntd: (args) => {
        const file = args.file;
        const request = http.upload(file);
        request
            .on('progress', event => {
                args.onProgress(event);
            })
            .then(it => {
                args.onSuccess(it);
            }).catch(err => {
            args.onError(err);
        });

        return request;
    }
};

// import superagent from "superagent";
// import appConfig from "../Config/StaticVar";
// import { TokenUtil } from './token'
// import { navigationService } from './NavigationService'
// import { Alert } from 'react-native'
// import StaticVar from '../Config/StaticVar'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import FirebaseLib from '../Lib/FirebaseLib'

// let AuthIntercept = require('superagent-intercept')((err, res) => {
//   if (res?.status === 403) {
//     console.log("masuk sini ya")
//     Alert.alert("Sesi Anda Telah Habis", "Sesi Anda Telah Habis, Harap Login Kembali.", [
//       { text: "Oke", onPress: async () =>  {
//           navigationService.reset('LoginScreen');
//           await AsyncStorage.removeItem(StaticVar.DB_PROFILE)
//           await FirebaseLib.signOut()
//         }}
//     ]);
//   }
// });

// export const http = {
//   get: (url, opts = {}) => {
//     try{
//       let req = superagent.get(appConfig.API_URL + url)
//         .use(AuthIntercept)
//         if (TokenUtil.accessToken) {
//             req = req.set('Authorization', 'Bearer ' + TokenUtil.accessToken);
//         }
//       return req;
//     }catch (e) {
//       console.log(e, "error get superagent")
//       throw e
//     }

//   },
//   post: (url, opts) => {
//     try{
//       let req = superagent.post(appConfig.API_URL + url)
//         .use(AuthIntercept)
//         if (TokenUtil.accessToken) {
//             req = req.set('Authorization', 'Bearer ' + TokenUtil.accessToken);
//         }
//       return req;
//     }catch (e) {
//       console.log(e, "error post superagent")
//       throw e
//     }
//   },
//   put: (url, opts) => {
//     try{
//       let req = superagent.put(appConfig.API_URL + url)
//         .use(AuthIntercept)
//         if (TokenUtil.accessToken) {
//             req = req.set('Authorization', 'Bearer ' + TokenUtil.accessToken);
//         }
//       return req;
//     }catch (e) {
//       console.log(e, "error put superagent")
//       throw e
//     }
//   },
//   del: (url, opts) => {
//     try{
//       let req = superagent.del(appConfig.API_URL + url)
//         .use(AuthIntercept)
//         if (TokenUtil.accessToken) {
//             req = req.set('Authorization', 'Bearer ' + TokenUtil.accessToken);
//         }
//       return req;
//     }catch (e) {
//       console.log(e, "error del superagent")
//       throw e
//     }
//   },
//   upload: (file) => {
//     try{
//       const request = superagent
//         .post(appConfig.API_URL + '/v1/files')
//         .use(AuthIntercept)
//         .attach('file', file);

//       return request;
//     }catch (e) {
//       console.log(e, "error upload superagent")
//       throw e
//     }
//   },
//   uploadAntd: (args) => {
//     try{
//       const file = args.file;
//       const request = http.upload(file)
//         .use(AuthIntercept)

//       request
//         .on('progress', event => {
//           args.onProgress(event);
//         })
//         .then(it => {
//           args.onSuccess(it);
//         }).catch(err => {
//         args.onError(err);
//       });
//       return request;
//     }catch (e) {
//       console.log(e, "error uploadAntd superagent")
//       throw e
//     }
//   }

// };
