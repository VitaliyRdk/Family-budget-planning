import { USER } from './../reducers/constants';

const url = {
    baseHost: 'http://localhost:3017/',
    apiPrefix: 'api/'
};

export let selectedUserId = null;

const config = {
    baseHost: url.baseHost,
    apiHost: url.baseHost + url.apiPrefix,
    getToken: () => {
        return localStorage.getItem(USER.SET_USER_TOKEN);
    },
    setToken: (token) => {
        localStorage.setItem(USER.SET_USER_TOKEN, token);
        return token;
    },
    delToken: (token) => {
        localStorage.removeItem(USER.SET_USER_TOKEN);
    }
}

export default config;