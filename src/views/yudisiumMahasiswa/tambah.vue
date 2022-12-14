<script>
import Swal from "sweetalert2";
import apiYudisiumMahasiswa from "../../apis/YudisiumMahasiswa.js";
import apiYudisium from "../../apis/Yudisium.js";
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
      Yudisium: {},
      YudisiumMahasiswa: {}
    };
  },
  mounted() {
    this.getYudisium()
  },
  methods: {
    getYudisium() {
      apiYudisium.lihatYudisium().then((response) => {
        this.Yudisium = response.data.data;
        console.log(this.Yudisium);
      });
    },
    store() {
      apiYudisiumMahasiswa
        .tambahYudisiumMahasiswa(this.YudisiumMahasiswa)
        .then((response) => {
          if (response.data.code == 200) {
            Swal.fire(
              "Berhasil!",
              "Data YudisiumMahasiswa Berhasil Ditambah!",
              "success"
            ).then((result) => {
              if (result.value) {
                // router.push("lihat");
              }
            });
          } else {
            Swal.fire("Error!", response.data.message, "error");
          }
        })
    }
  }
}
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-xxl-6">
        <div class="card">
          <div class="card-header align-items-center d-flex">
            <h4 class="card-title mb-0 flex-grow-1">Pengajuan Yudisium</h4>
          </div>
          <!-- end card header -->
          <div class="card-body">
            <p class="text-muted">Form Pengajuan Yudisium Perpustakaan ITK.</p>
            <div class="live-preview">
              <form @submit.prevent="store()">
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label">Periode</label>
                  </div>
                  <div class="col-lg-9">
                    <select
                      class="form-select mb-2"
                      v-model="YudisiumMahasiswa.yudisium_id"
                      aria-label="Default select example"
                    >
                      <option
                        v-for="(item, index) in Yudisium"
                        :key="index"
                        selected=""
                        :value="item.id"
                      >
                        {{ item.periode }} - Tahun {{ item.tahun }}
                      </option>
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
