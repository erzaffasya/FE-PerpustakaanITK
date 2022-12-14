import {Api,url} from '../apis/Api'

export default {
    tambahRuanganBaca(form) {
        return Api.post(url +'/api/ruangan', form);
    },
    lihatRuanganBaca() {
        return Api.get(url +'/api/ruangan');
    },
    editRuanganBaca(id, form) {
        return Api.put(url +'/api/ruangan/' + id, form);
    }, 
    showRuanganBaca(id) {
        return Api.get(url +'/api/ruangan/' + id);
    },
    hapusRuanganBaca(id) {
        return Api.delete(url +'/api/ruangan/' + id);
    },
}