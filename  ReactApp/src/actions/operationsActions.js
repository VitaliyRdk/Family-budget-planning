import { store } from './../index';
import { OPERATIONS } from './../reducers/constants';
import operations from './../api/operations';

export async function get (){
    let res = await operations.get();
    let data = await res.json();
    store.dispatch({ type: OPERATIONS.SET, payload: data }); 
}

export async function getStatistic (){
    let res = await operations.getStatistic();
    let data = await res.json();
    store.dispatch({ type: OPERATIONS.STATISTIC, payload: data }); 
}

export async function getById (id){
    let res = await operations.getById(id);
    let data = await res.json();
    return data;
}

export async function add (operation){
    let res = await operations.add(operation);
    let data = await res.json();
    return data;
}

export async function modify (id, operation){
    let res = await operations.modify(id, operation);
    let data = await res.json();
    return data;
}