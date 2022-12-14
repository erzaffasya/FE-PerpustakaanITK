import {Api,url} from '../apis/Api'

export default {
    tambahPeminjamanRuangan(form) {
        return Api.post(url +'/api/peminjaman-ruangan', form);
    },
    lihatPeminjamanRuangan() {
        return Api.get(url +'/api/peminjaman-ruangan');
    },
    editPeminjamanRuangan(id, form) {
        return Api.put(url +'/api/peminjaman-ruangan/' + id, form);
    }, 
    showPeminjamanRuangan(id) {
        return Api.get(url +'/api/peminjaman-ruangan/' + id);
    },
    hapusPeminjamanRuangan(id) {
        return Api.delete(url +'/api/peminjaman-ruangan/' + id);
    },
    cekRuangan(tanggal, waktu_awal, waktu_akhir) {
        return Api.get(url +'/api/ruang-kosong/' + tanggal + '/waktu_awal/' + waktu_awal + '/waktu_akhir/' + waktu_akhir);
    },
    // ruang-kosong/+tanggal+/waktu_awal/{waktu_awal}/waktu_akhir/{waktu_akhir}
}