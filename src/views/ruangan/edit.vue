<script>
import apiRuanganBaca from "../../apis/RuanganBaca.js";
import Swal from "sweetalert2";

import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";

export default {
  page: {
    title: "Layouts",
    meta: [{ name: "description", content: appConfig.description }],
  },

  components: {
    Layout,
    PageHeader,
  },

  data() {
    return {
      RuanganBaca: {},
      message: "",
    };
  },

  methods: {
    store() {
      apiRuanganBaca
        .editRuanganBaca(this.$route.params.id, this.RuanganBaca)
        .then(() => {
          Swal.fire(
            "Berhasil!",
            "Data Ruangan Berhasil Diubah!",
            "success"
          ).then((result) => {
            if (result.value) {
              this.$router.push({ name: "lihat-ruangan"})
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRuanganBaca(id) {
      apiRuanganBaca
        .showRuanganBaca(id)
        .then((response) => {
          this.RuanganBaca = response.data.data;
          console.log(this.RuanganBaca);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getRuanganBaca(this.$route.params.id);
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
            <h4 class="card-title mb-0 flex-grow-1">Ubah Ruangan</h4>
          </div>
          <!-- end card header -->
          <div class="card-body">
            <p class="text-muted">
              Form edit RuanganBaca untuk perpustakaan ITK.
            </p>
            <div class="live-preview">
              <form @submit.prevent="store()">
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label">Nama Ruangan</label>
                  </div>
                  <div class="col-lg-9">
                    <input type="text" v-model="RuanganBaca.nama_ruangan" class="form-control" placeholder="Masukkan Nama Ruangan" required/>
                  </div>
                </div>
                 <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label">Deskripsi</label>
                  </div>
                  <div class="col-lg-9">
                    <input type="text" v-model="RuanganBaca.deskripsi" class="form-control" placeholder="Masukkan Deskripsi" required/>
                  </div>
                </div>
                 <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label">Jumlah Orang</label>
                  </div>
                  <div class="col-lg-9">
                    <input type="number" v-model="RuanganBaca.jumlah_orang" class="form-control" placeholder="Masukkan Jumlah Orang" required/>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label">Lokasi</label>
                  </div>
                  <div class="col-lg-9">
                    <input type="text" v-model="RuanganBaca.lokasi" class="form-control"
                      placeholder="Masukkan Lokasi Ruangan" required/>
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
