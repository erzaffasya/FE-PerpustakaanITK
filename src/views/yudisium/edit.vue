<script>
import apiYudisium from "../../apis/Yudisium.js";
import Swal from "sweetalert2";

import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import moment from "moment";

export default {
  page: {
    title: "Layouts",
    meta: [{ name: "description", content: appConfig.description }],
  },

  components: {
    Layout,
    PageHeader,
  },
  created: function () {
    this.moment = moment;
  },


  data() {
    return {
      Yudisium: {},
      message: "",
    };
  },

  methods: {
    store() {
      apiYudisium
        .editYudisium(this.$route.params.id, this.Yudisium)
        .then(() => {
          Swal.fire(
            "Berhasil!",
            "Data yudisium Berhasil Diubah!",
            "success"
          ).then((result) => {
            if (result.value) {
              this.$router.push({ name: "lihat-yudisium"})
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getYudisium(id) {
      apiYudisium
        .showYudisium(id)
        .then((response) => {
          this.Yudisium = response.data.data;
          console.log(this.Yudisium);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getYudisium(this.$route.params.id);
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-xxl-6">
        <div class="card">
          <div class="card-header align-items-center d-flex">
            <h4 class="card-title mb-0 flex-grow-1">Ubah yudisium</h4>
          </div>
          <!-- end card header -->
          <div class="card-body">
            <p class="text-muted">
              Form edit Yudisium untuk perpustakaan ITK.
            </p>
            <div class="live-preview">
              <form @submit.prevent="store()">
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label">Periode</label>
                  </div>
                  <div class="col-lg-9">
                    <input
                      type="text"
                      v-model="Yudisium.periode"
                      class="form-control"
                      placeholder="Masukkan Periode"
                      required
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label">Tahun</label>
                  </div>
                  <div class="col-lg-9">
                    <input
                      type="number"
                      v-model="Yudisium.tahun"
                      class="form-control"
                      placeholder="Masukkan Tahun"
                      required
                    />
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label"
                      >Tanggal Expired</label
                    >
                  </div>
                  <div class="col-lg-9">
                    <input
                      type="date"
                      :min="moment(new Date()).format('YYYY-MM-DD')"
                      v-model="Yudisium.expired_at"
                      class="form-control"
                      placeholder="Masukkan Lokasi Yudisium"
                      required
                    />
                  </div>
                </div>
                <div class="text-end">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
            <div class="d-none code-view"></div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
