import { Api, url } from "../apis/Api";

export default {
  tambahDokumen(form) {
    return Api.post(url + "/api/dokumen", form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  lihatDokumen(form) {
    if (form != null) {
      return Api.get(url + "/api/dokumen?status=" + form);
    } else {
      return Api.get(url + "/api/dokumen");
    }
  },
  simpelDokumen(form) {
    if (form != null) {
      return Api.get(url + "/api/data-dokumen?kategori=" + form);
    } else {
      return Api.get(url + "/api/data-dokumen");
    }
  },
  editDokumen(id, form) {
    return Api.post(url + "/api/dokumen/" + id + "?_method=PUT", form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  showDokumen(id) {
    return Api.get(url + "/api/dokumen/" + id);
  },
  cekDokumenJurusan() {
    return Api.get(url + "/api/cek-dokumen-perjurusan");
  },
  hapusDokumen(id) {
    return Api.delete(url + "/api/dokumen/" + id);
  },
  bacaDokumen(id, jenisFile) {
    return Api.get(url + "/api/cek-akses-dokumen/" + id + "/" + jenisFile);
  },
  revisiDokumen(id, form) {
    return Api.put(url + "/api/revisi-dokumen/" + id, form);
  },
  riwayatPeminjamanDokumen(id) {
    return Api.get(url + "/api/dokumen/riwayat-peminjaman/" + id);
  },
  downloadDokumen(id, detail) {
    return Api.get(url + "/api/download-dokumen/" + id + '/' + detail, { responseType: 'blob' });
  },
  cariDokumen(id) {
    return Api.get(url + "/api/cari-dokumen/" + id);
  },
};
