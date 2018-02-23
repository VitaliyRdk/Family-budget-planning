import config from './config';
import req from './req';

const apiRoute = 'users';
const fullApiPath = config.apiHost + apiRoute;

class authorization{
    static login(email, password){
        return req.post(fullApiPath + '/login', {email, password});
    }

    static registration(email, password, name){
        return req.post(fullApiPath + '/registration', {email, password, name});
    }
}

export default authorization;