import {Api,url} from '../apis/Api';

export default{
    async login(form) {
        return Api.post(url +'/api/login', form);
    },
    async getUser() {
        return Api.get(url +'/api/profil');
    },
    async logout() {
        return Api.get(url +'/api/logout');
    },
}