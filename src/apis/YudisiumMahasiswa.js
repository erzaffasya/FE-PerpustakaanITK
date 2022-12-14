import { Api, url } from "../apis/Api";

export default {
  tambahYudisiumMahasiswa(form) {
    return Api.post(url + "/api/yudisium-mahasiswa", form, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
    });
  },
  lihatYudisiumMahasiswa() {
    return Api.get(url + "/api/yudisium-mahasiswa");
  },
  filterYudisiumMahasiswa(id) {
    return Api.get(url +'/api/yudisium-mahasiswa?filter='+id);
},
  editYudisiumMahasiswa(id,form) {
    return Api.put(url + "/api/yudisium-mahasiswa/" + id, form);
  },
  showYudisiumMahasiswa(id) {
    return Api.get(url + "/api/yudisium-mahasiswa/" + id);
  },
  hapusYudisiumMahasiswa(id) {
    return Api.delete(url + "/api/yudisium-mahasiswa/" + id);
  },
};
