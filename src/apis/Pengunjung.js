import { Api, url } from '../apis/Api'

export default {
    tambahPengunjung(form) {
        return Api.post(url + '/api/pengunjung', form);
    },
    lihatPengunjung() {
        return Api.get(url + '/api/pengunjung');
    },
    filterTanggalPengunjung(form) {
        if (form.tanggal_awal && form.tanggal_akhir) {
            return Api.get(url + "/api/pengunjung?tanggal_awal=" + form.tanggal_awal + "&tanggal_akhir=" + form.tanggal_akhir);
        } else {
            return Api.get(url + "/api/pengunjung?tanggal_awal=" + form.tanggal_awal);
        }
    },
    editPengunjung(id, form) {
        return Api.put(url + '/api/pengunjung/' + id, form);
    },
    showPengunjung(id) {
        return Api.get(url + '/api/pengunjung/' + id);
    },
    hapusPengunjung(id) {
        return Api.delete(url + '/api/pengunjung/' + id);
    },
    qrcodePengunjung() {
        return Api.get(url + '/api/QRCode');
    },
}