<script>
import apiYudisiumMahasiswa from "../../apis/YudisiumMahasiswa.js";
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
      Yudisium: {
        user: {},
      },
      message: "",
    };
  },

  methods: {
    store() {
      apiYudisiumMahasiswa
        .editYudisiumMahasiswa(this.$route.params.id, this.Yudisium)
        .then(() => {
          Swal.fire(
            "Berhasil!",
            "Data Pengajuan Yudisium Berhasil Diubah!",
            "success"
          ).then((result) => {
            if (result.value) {
              this.$router.push({ name: "lihat-yudisium-mahasiswa" });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getYudisium(id) {
      apiYudisiumMahasiswa
        .showYudisiumMahasiswa(id)
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
            <h4 class="card-title mb-0 flex-grow-1">Ubah Yudisium Mahasiswa</h4>
          </div>
          <!-- end card header -->
          <div class="card-body">
            <p class="text-muted">Form edit Yudisium untuk perpustakaan ITK.</p>
            <div class="live-preview">
              <form @submit.prevent="store()">
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label"
                      >Nama</label
                    >
                  </div>
                  <div class="col-lg-9">
                    <input
                      type="text"
                      v-model="Yudisium.user.name"
                      class="form-control"
                      placeholder="Masukkan Periode"
                      readonly
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label"
                      >NIM</label
                    >
                  </div>
                  <div class="col-lg-9">
                    <input
                      type="text"
                      v-model="Yudisium.user.nim"
                      class="form-control"
                      placeholder="Masukkan Periode"
                      readonly
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label">Status Berkas</label>
                  </div>
                  <div class="col-lg-9">
                    <select
                      class="form-control"
                      v-model="Yudisium.status_berkas"
                    >
                      <option value="1">Terpenuhi</option>
                      <option value="0">Tidak Terpenuhi</option>
                    </select>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label">Status Peminjaman</label>
                  </div>
                  <div class="col-lg-9">
                    <select
                      class="form-control"
                      v-model="Yudisium.status_pinjam"
                    >
                      <option value="1">Terpenuhi</option>
                      <option value="0">Tidak Terpenuhi</option>
                    </select>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label">Status Final</label>
                  </div>
                  <div class="col-lg-9">
                    <select
                      class="form-control"
                      v-model="Yudisium.status_final"
                    >
                      <option value="1">Terpenuhi</option>
                      <option value="0">Tidak Terpenuhi</option>
                    </select>
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
