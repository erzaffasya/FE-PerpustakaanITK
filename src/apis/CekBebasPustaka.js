import { Api, url } from '../apis/Api'

export default {
    cekBebasPustaka(form) {
        return Api.post(url + '/api/bebas-pustaka', form);
    },
}