import {Api,url} from '../apis/Api'

export default {
    tambahUser(form) {
        return Api.post(url +'/api/user', form);
    },
    lihatUser() {
        return Api.get(url +'/api/user');
    },
    editUser(id, form) {
        return Api.put(url +'/api/user/' + id, form);
    }, 
    showUser(id) {
        return Api.get(url +'/api/user/' + id);
    },
    hapusUser(id) {
        return Api.delete(url +'/api/user/' + id);
    },
    searchRole(id) {
        return Api.get(url +'/api/user?role=' + id);
    },
}