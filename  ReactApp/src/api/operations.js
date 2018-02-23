import config from './config';
import req from './req';

const apiRoute = 'operations';
const fullApiPath = config.apiHost + apiRoute;

class operations {

    static get(){
        return req.get(fullApiPath);
    }

    static getById(id){
        return req.get(fullApiPath + '/' + id);
    }

    static getStatistic(){
        return req.get(fullApiPath + '/statistic');
    }

    static add(operation){
        return req.post(fullApiPath, operation);
    }

    static modify(id, operation){
        return req.put(fullApiPath + '/' + id, operation);
    }

    static delete(id){
        return req.delete(fullApiPath + '/' + id);
    }
}

export default operations;