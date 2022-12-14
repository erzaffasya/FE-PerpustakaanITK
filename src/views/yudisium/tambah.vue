<script>
import Swal from "sweetalert2";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import apiYudisium from "../../apis/Yudisium.js";
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

  setup() {
    const Yudisium = reactive({});

    const validation = ref([]);
    const router = useRouter();
    function store() {
      apiYudisium.tambahYudisium(Yudisium).then((response) => {
        if (response.data.code == 200) {
          Swal.fire(
            "Berhasil!",
            "Data Yudisium Berhasil Ditambah!",
            "success"
          ).then((result) => {
            if (result.value) {
              router.push("lihat");
            }
          });
        } else {
          console.log(Yudisium);
          Swal.fire("Error!", "Data Yudisium Gagal Ditambah!", "error");
        }
      });
    }
    return {
      Yudisium,
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
            <h4 class="card-title mb-0 flex-grow-1">Tambah Yudisium</h4>
          </div>
          <!-- end card header -->
          <div class="card-body">
            <p class="text-muted">Form Tambah Yudisium Perpustakaan ITK.</p>
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
