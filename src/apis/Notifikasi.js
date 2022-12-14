import {Api,url} from '../apis/Api'

export default {
    lihatNotifikasi() {
        return Api.get(url +'/api/notifikasi');
    },
    bacaNotifikasi() {
        return Api.get(url +'/api/baca-notifikasi');
    },
}