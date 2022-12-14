import {Api,url} from '../apis/Api'

export default {
    tambahPeminjamanDokumen(form) {
        return Api.post(url +'/api/peminjaman-dokumen', form);
    },
    lihatPeminjamanDokumen() {
        return Api.get(url +'/api/peminjaman-dokumen');
    },
    editPeminjamanDokumen(id, form) {
        return Api.put(url +'/api/peminjaman-dokumen/' + id, form);
    }, 
    showPeminjamanDokumen(id) {
        return Api.get(url +'/api/peminjaman-dokumen/' + id);
    },
    hapusPeminjamanDokumen(id) {
        return Api.delete(url +'/api/peminjaman-dokumen/' + id);
    },
    filterPeminjamanDokumen(id) {
        return Api.get(url +'/api/peminjaman-dokumen?filter='+id);
    },
    peminjamanDokumenAktif(){
        return Api.get(url + '/api/peminjaman-dokumen-aktif')
    }
    // ruang-kosong/+tanggal+/waktu_awal/{waktu_awal}/waktu_akhir/{waktu_akhir}
}