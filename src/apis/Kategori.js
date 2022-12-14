import { Api, url } from '../apis/Api'

export default {
    tambahKategori(form) {
        return Api.post(url + '/api/kategori', form, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
    },
    lihatKategori() {
        return Api.get(url + '/api/kategori');
    },
    editKategori(id, form) {
        return Api.put(url + '/api/kategori/' + id, form);
    },
    showKategori(id) {
        return Api.get(url + '/api/kategori/' + id);
    },
    hapusKategori(id) {
        return Api.delete(url + '/api/kategori/' + id);
    },
}