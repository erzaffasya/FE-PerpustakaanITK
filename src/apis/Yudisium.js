import { Api, url } from "../apis/Api";

export default {
  tambahYudisium(form) {
    return Api.post(url + "/api/yudisium", form, {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      }
  });
  },
  lihatYudisium() {
    return Api.get(url + "/api/yudisium");
  },
  editYudisium(id, form) {
    return Api.put(url + "/api/yudisium/" + id, form);
  },
  showYudisium(id) {
    return Api.get(url + "/api/yudisium/" + id);
  },
  hapusYudisium(id) {
    return Api.delete(url + "/api/yudisium/" + id);
  },
};
