<script>
// import Swal from "sweetalert2";
import apiRuanganBaca from "../../apis/RuanganBaca.js";
import apiPeminjamanRuangan from "../../apis/PeminjamanRuangan.js";
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import Swal from "sweetalert2";
import moment from "moment";
export default {
  page: {
    title: "Layouts",
    meta: [{ name: "description", content: appConfig.description }],
  },
  created: function () {
    this.moment = moment;
  },
  data() {
    return {
      title: "Peminjaman Ruangan",
      peminjamanRuangan: {},
      ruanganBaca: {},
      kursiBaca: {},
      cekKursi: {},
      error: {},
      items: [
        {
          text: "Forms",
          href: "/",
        },
        {
          text: "Peminjaman Ruangan",
          active: true,
        },
      ],
    };
  },
  methods: {
    getRuanganBaca() {
      apiRuanganBaca.lihatRuanganBaca().then((response) => {
        this.ruanganBaca = response.data.data;
        console.log(this.ruanganBaca);
      });
    },
    cekRuangan() {
      if (
        this.peminjamanRuangan.tanggal &&
        this.peminjamanRuangan.waktu_awal &&
        this.peminjamanRuangan.waktu_akhir
      ) {
        apiPeminjamanRuangan
          .cekRuangan(
            this.peminjamanRuangan.tanggal,
            this.peminjamanRuangan.waktu_awal,
            this.peminjamanRuangan.waktu_akhir
          )
          .then((response) => {
            this.cekKursi = response.data.data;
            console.log(response);
            if (response.data.status == "error") {
              this.error = response.data.message;
              // console.log(this.error);
            }
            // console.log(this.cekKursi);
          });
      }
    },

    store(id) {
      // this.peminjamanRuangan = Object.assign({'kursi_baca_id' : id}, this.peminjamanRuangan);
      console.log(id);
      apiPeminjamanRuangan
        .tambahPeminjamanRuangan(
          Object.assign({ ruangan: id }, this.peminjamanRuangan)
        )
        .then((response) => {
          if (response.data.code == 200) {
            // console.log(this.peminjamanRuangan);
            Swal.fire(
              "Berhasil!",
              "Data Ruang Baca Berhasil Ditambah!",
              "success"
            ).then((result) => {
              console.log(result);
              this.cekRuangan();
              // if (result.value) {
              //   this.$router.push("lihat");
              // }
            });
          } else {
            console.log(response.data.message.message);
            Swal.fire("Error!", response.data.message.message, "error");
          }
        });
    },
  },

  components: {
    Layout,
    PageHeader,
  },

  mounted() {
    this.getRuanganBaca();
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
            <h4 class="card-title mb-0 flex-grow-1">Ruangan</h4>
          </div>
          <!-- end card header -->
          <div class="card-body">
            <p class="text-muted">
              Form tambah peminjaman ruangan untuk perpustakaan ITK.
            </p>
            <div class="live-preview">
              <form>
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label">Tanggal</label>
                  </div>
                  <div class="col-lg-9">
                    <input
                      type="date"
                      :min="moment(new Date()).format('YYYY-MM-DD')"
                      v-model="peminjamanRuangan.tanggal"
                      @change="cekRuangan()"
                      class="form-control"
                      placeholder="Masukkan Detail Kategori"
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label">Waktu Awal</label>
                  </div>
                  <div class="col-lg-9">
                    <input
                      type="time"
                      v-model="peminjamanRuangan.waktu_awal"
                      @change="cekRuangan()"
                      class="form-control"
                      placeholder="Masukkan Jumlah Orang"
                      required
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label"
                      >Waktu Akhir</label
                    >
                  </div>
                  <div class="col-lg-9">
                    <input
                      type="time"
                      v-model="peminjamanRuangan.waktu_akhir"
                      @change="cekRuangan()"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          peminjamanRuangan.waktu_awal >
                          peminjamanRuangan.waktu_akhir,
                      }"
                      placeholder="Masukkan Jumlah Orang"
                      required
                    />
                    <div class="invalid-feedback"> Masukkan waktu akhir dengan benar. </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label">Keperluan</label>
                  </div>
                  <div class="col-lg-9">
                    <input
                      type="text"
                      v-model="peminjamanRuangan.keperluan"
                      class="form-control"
                      placeholder="Masukkan Keperluan Pinjam"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
            <div class="d-none code-view"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div
        class="col-xl-3 col-lg-6"
        v-for="(item, index) of cekKursi"
        :key="index"
      >
        <div class="card ribbon-box right overflow-hidden">
          <div class="card-body text-center p-4">
            <div
              class="ribbon ribbon-info ribbon-shape trending-ribbon"
              v-if="item.isTrending == true"
            >
              <i class="ri-flashlight-fill text-white align-bottom"></i>
              <span class="trending-ribbon-text">Trending</span>
            </div>
            <img src="@/assets/images/meeting.png" alt="" height="45" />
            <h5 class="mb-1 mt-4">
              <router-link
                to="/ecommerce/seller-details"
                class="link-primary"
                >{{ item.label }}</router-link
              >
            </h5>
            <p class="text-muted mb-4">{{ item.nama_kursi }}</p>
            <div class="row justify-content-center">
              <div class="col-lg-8">
                <!-- <apexchart class="apex-charts" dir="ltr" height="50" :series="item.series" :options="chartOptions">
                </apexchart> -->
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-lg-6 border-end-dashed border-end">
                <h5>{{ item.nama_ruangan }}</h5>
                <span class="text-muted">Ruangan</span>
              </div>
              <div class="col-lg-6">
                <h5>{{ item.lokasi }}</h5>
                <span class="text-muted">Lokasi</span>
              </div>
            </div>
            <form @submit.prevent="store(item.id)">
              <div class="mt-4">
                <button
                  v-if="item.status_kursi === true"
                  type="submit"
                  class="btn btn-success w-100"
                >
                  Pesan Ruangan {{ item.id }}
                </button>
                <button
                  v-if="item.status_kursi === false"
                  disabled
                  type="submit"
                  class="btn btn-danger w-100"
                >
                  Tidak Tersedia
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!--end col-->
    </div>
  </Layout>
</template>
