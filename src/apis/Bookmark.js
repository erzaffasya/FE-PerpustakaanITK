import { Api, url } from "../apis/Api";

export default {
  tambahBookmark(form) {
    return Api.post(url + "/api/bookmark", form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  lihatBookmark() {
    return Api.get(url + "/api/bookmark");
  },
  editBookmark(id) {
    return Api.put(url + "/api/bookmark/" + id);
  },
  showBookmark(id) {
    return Api.get(url + "/api/bookmark/" + id);
  },
  hapusBookmark(id) {
    return Api.delete(url + "/api/bookmark/" + id);
  },
};
