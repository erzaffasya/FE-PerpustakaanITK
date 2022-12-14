import { Api, url } from "../apis/Api";

export default {
  getByDokumenId(id) {
    return Api.get(url + "/api/pembimbing/" + id + "/dokumen");
  },
  hapusDosenPembimbing(id) {
    return Api.delete(url + "/api/pembimbing/" + id);
  },
  filterTanggalPembimbing(form) {
    if (form.tanggal_awal && form.tanggal_akhir) {
      return Api.get(url + "/api/pembimbing?tanggal_awal=" + form.tanggal_awal + "&tanggal_akhir=" + form.tanggal_akhir);
    } else {
      return Api.get(url + "/api/pembimbing?tanggal_awal=" + form.tanggal_awal);
    }
  },
  lihatPembimbing() {
    return Api.get(url + "/api/pembimbing/");
  },
};
