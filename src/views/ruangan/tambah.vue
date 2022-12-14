<script>
import Swal from "sweetalert2";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import apiRuanganBaca from "../../apis/RuanganBaca.js";
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

  setup() {
    const RuanganBaca = reactive({});

    const validation = ref([]);
    const router = useRouter();
    function store() {
      apiRuanganBaca.tambahRuanganBaca(RuanganBaca).then((response) => {
        if (response.data.code == 200) {
          Swal.fire(
            "Berhasil!",
            "Data Ruangan Berhasil Ditambah!",
            "success"
          ).then((result) => {
            if (result.value) {
              router.push("lihat");
            }
          });
        } else {
          console.log(RuanganBaca);
          Swal.fire("Error!", "Data Ruangan Gagal Ditambah!", "error");
        }
      });
    }
    return {
      RuanganBaca,
      validation,
      router,
      store,
    };
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
            <h4 class="card-title mb-0 flex-grow-1">Tambah Ruangan</h4>
          </div>
          <!-- end card header -->
          <div class="card-body">
            <p class="text-muted">Form Tambah Ruangan Perpustakaan ITK.</p>
            <div class="live-preview">
              <form @submit.prevent="store()">
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label"
                      >Nama Ruangan</label
                    >
                  </div>
                  <div class="col-lg-9">
                    <input
                      type="text"
                      v-model="RuanganBaca.nama_ruangan"
                      class="form-control"
                      placeholder="Masukkan Nama Ruangan"
                      required
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label">Deskripsi</label>
                  </div>
                  <div class="col-lg-9">
                    <input
                      type="text"
                      v-model="RuanganBaca.deskripsi"
                      class="form-control"
                      placeholder="Masukkan Deskripsi"
                      required
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label"
                      >Jumlah Orang</label
                    >
                  </div>
                  <div class="col-lg-9">
                    <input
                      type="number"
                      v-model="RuanganBaca.jumlah_orang"
                      class="form-control"
                      placeholder="Masukkan Jumlah Orang"
                      required
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label">Lokasi</label>
                  </div>
                  <div class="col-lg-9">
                    <input
                      type="text"
                      v-model="RuanganBaca.lokasi"
                      class="form-control"
                      placeholder="Masukkan Lokasi Ruangan"
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
