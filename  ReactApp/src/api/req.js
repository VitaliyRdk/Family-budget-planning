import config from './config';
import { LOADER } from './../reducers/constants';
import { store } from './../index';

class req{

    static async get(url, headers = null, isJson = true, isShowLoader = true){
        return await this.request(url,"GET", null, headers, isJson, isShowLoader);
    }

    static async post(url, body, headers = null, isJson = true, isShowLoader = true){
        return await this.request(url,"POST", body, headers, isJson, isShowLoader);
    }

    static async put(url, body, headers = null, isJson = true, isShowLoader = true){
        return await this.request(url,"PUT", body, headers, isJson, isShowLoader);
    }

    static async delete(url, body, headers = null, isJson = true, isShowLoader = true){
        return await this.request(url,"DELETE", body, headers, isJson, isShowLoader);
    }

    static async request (url, method, body, headers, isJson, isShowLoader){
        try{
            if (isShowLoader){
                store.dispatch({ type: LOADER.SHOW_LOADER });
            }
            console.log('Req: ' + method + ':' + url);
            if (!headers){
                headers= { 'Content-Type': 'application/json' };
            }
            let data = {
                mode: 'cors',
                method: method,
                headers: headers,
            };

            if (body && isJson){
                body = JSON.stringify(body);
                headers['Content-Length'] = body.length;
            }

            var token = config.getToken();
            if (token){
                headers['Authorization'] = token;
            }
            
            if (body){
                data.body = body;
            }
            
            var r = await fetch(url, data);
            if (r.status !== 200 && r.status !== 201){
                let data = await r.text();
                return Promise.reject(data);
            }
            return r;
        }catch(e){
            console.error('Req: ' + method + ':' + url + ' ::' + e);
            throw e;
        }finally{
            if (isShowLoader){
                store.dispatch({ type: LOADER.HIDE_LOADER });
            }
        }
    }
}

export default req;