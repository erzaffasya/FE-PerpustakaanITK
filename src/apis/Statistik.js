import { Api, url } from '../apis/Api'

export default {
    jumlahDokumen() {
        return Api.get(url + '/api/jumlah-dokumen');
    },
    jumlahPeminjamanDokumen() {
        return Api.get(url + '/api/jumlah-peminjaman-dokumen');
    },
    jumlahRuangan() {
        return Api.get(url + '/api/jumlah-ruangan');
    },
    jumlahPeminjamanRuangan() {
        return Api.get(url + '/api/jumlah-peminjaman-ruangan');
    },
    jumlahPengunjung() {
        return Api.get(url + '/api/jumlah-pengunjung');
    },
    pengunjungTerakhir() {
        return Api.get(url + '/api/pengunjung-terakhir');
    },
    peminjamanDokumenPopuler() {
        return Api.get(url + '/api/peminjaman-dokumen-populer');
    },
    peminjamanRuanganPopuler() {
        return Api.get(url + '/api/peminjaman-ruangan-populer');
    },
    grafikPerpustakaan(){
        return Api.get(url + '/api/grafik-perpustakaan');
    }
}