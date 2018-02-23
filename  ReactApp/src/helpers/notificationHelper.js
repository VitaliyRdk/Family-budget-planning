import {NotificationManager} from 'react-notifications';

export async function success(message) {
    NotificationManager.success(message);
}

export async function error(obj){
    if (IsJsonString(obj)){
        obj = JSON.parse(obj);
    }

    if (typeof obj === 'object'){
        errorAsObject(obj)
    }else{
        errorAsMessage(obj);
    }
}

export async function errorAsObject(obj){
    if (obj.errors != null){
        var keyNames = Object.keys(obj.errors);
        for (var i in keyNames) {
            errorAsMessage(keyNames[i] + " - " + obj.errors[keyNames[i]].msg);
        }
    }
}

export async function errorAsMessage(message){
    NotificationManager.error(message);
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}