import config from './../api/config';
import authorization from './../api/authorization';

export async function login(email, password) {
    let res = await authorization.login(email, password);
    var data = await res.json(); 
    config.setToken(data.token);
}

export async function logout() {
    config.delToken();
}

export async function registration (email, password, name){
    let res = await authorization.registration(email, password, name);
    return await res.json(); 
}

export async function recoveryPassword (email){
    let res = await authorization.recovery(email);
    return await res.json(); 
}

export function IsExistToken (){
    return config.getToken() != null;
}