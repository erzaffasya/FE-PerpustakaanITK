import {Api,url} from '../apis/Api'

export default {
    tambahKursiBaca(form) {
        return Api.post(url +'/api/kursi-baca', form);
    },
    lihatKursiBaca() {
        return Api.get(url +'/api/kursi-baca');
    },
    editKursiBaca(id, form) {
        return Api.put(url +'/api/kursi-baca/' + id, form);
    }, 
    showKursiBaca(id) {
        return Api.get(url +'/api/kursi-baca/' + id);
    },
    hapusKursiBaca(id) {
        return Api.delete(url +'/api/kursi-baca/' + id);
    },
}