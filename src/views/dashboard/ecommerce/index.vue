<script>
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";

SwiperCore.use([]);
// import flatPickr from "vue-flatpickr-component";
import { SimpleBar } from "simplebar-vue3";
import "flatpickr/dist/flatpickr.css";
// import { CountTo } from "vue3-count-to";
import apiStatistik from "../../../apis/Statistik.js";
import apiPeminjamanDokumen from "../../../apis/PeminjamanDokumen.js";
import Layout from "../../../layouts/main.vue";

import Revenue from "./revenue";

export default {
  components: {
    // CountTo,
    Layout,
    Swiper,
    SwiperSlide,
    // flatPickr,
    SimpleBar,
    Revenue,
  },
  inject: ["role"],
  data() {
    return {
      // title: "Dashboard",
      jumlah: {
        dokumen: null,
        peminjamanDokumen: null,
        ruangan: null,
        peminjamanRuangan: null,
        pengunjung: null,
      },
      data: {},
      date: null,
      config: {
        mode: "range",
      },
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        labels: ["Direct", "Social", "Email", "Other", "Referrals"],
        chart: {
          height: 333,
          type: "donut",
        },
        legend: {
          position: "bottom",
        },
        stroke: {
          show: false,
        },
        dataLabels: {
          dropShadow: {
            enabled: false,
          },
        },
        colors: ["#695eef", "#695eefd9", "#695eefb3", "#695eef99", "#695eef73"],
      },
    };
  },
  methods: {
    rightcolumn() {
      if (
        document
          .querySelector(".layout-rightside-col")
          .classList.contains("d-none")
      ) {
        document
          .querySelector(".layout-rightside-col")
          .classList.remove("d-none");
      } else {
        document.querySelector(".layout-rightside-col").classList.add("d-none");
      }
    },
    dokumen() {
      apiStatistik.jumlahDokumen().then((response) => {
        this.jumlah.dokumen = response.data.data;
      });
    },
    ruangan() {
      apiStatistik.jumlahRuangan().then((response) => {
        this.jumlah.ruangan = response.data.data;
      });
    },
    peminjamanDokumen() {
      apiStatistik.jumlahRuangan().then((response) => {
        this.jumlah.peminjamanDokumen = response.data.data;
      });
    },
    peminjamanRuangan() {
      apiStatistik.jumlahRuangan().then((response) => {
        this.jumlah.peminjamanRuangan = response.data.data;
      });
    },
    pengunjung() {
      apiStatistik.jumlahPengunjung().then((response) => {
        this.jumlah.pengunjung = response.data.data;
      });
    },
    pengunjungTerakhir() {
      apiStatistik.pengunjungTerakhir().then((response) => {
        this.data.pengunjungTerakhir = response.data.data;
      });
    },
    peminjamanDokumenPopuler() {
      apiStatistik.peminjamanDokumenPopuler().then((response) => {
        this.data.peminjamanDokumenPopuler = response.data.data;
      });
    },
    peminjamanRuanganPopuler() {
      apiStatistik.peminjamanRuanganPopuler().then((response) => {
        this.data.peminjamanRuanganPopuler = response.data.data;
      });
    },
    peminjamanDokumenAktif() {
      apiPeminjamanDokumen.peminjamanDokumenAktif().then((response) => {
        this.data.peminjamanDokumenAktif = response.data.data;
      });
    },
  },
  mounted() {
    this.dokumen();
    this.ruangan();
    this.pengunjung();
    this.peminjamanDokumen();
    this.peminjamanRuangan();
    this.pengunjungTerakhir();
    this.peminjamanDokumenPopuler();
    this.peminjamanRuanganPopuler();
    this.peminjamanDokumenAktif();
  },
};
</script>

<template>
  <Layout>
    <div class="row">
      <div class="col">
        <div class="h-100">
          <div class="row mb-3 pb-1">
            <div class="col-12">
              <div class="d-flex align-items-lg-center flex-lg-row flex-column">
                <div class="flex-grow-1">
                  <h4 class="fs-16 mb-1">Selamat Datang, {{ role }} !</h4>
                  <p class="text-muted mb-0">
                    <!-- Here's what's happening with your store today. {{ date }} -->
                  </p>
                </div>
                <div class="mt-3 mt-lg-0">
                  <form action="javascript:void(0);">
                    <div class="row g-3 mb-0 align-items-center">
                      <div class="col-sm-auto">
                        <!-- <div class="input-group">
                          <flat-pickr
                            v-model="date"
                            :config="config"
                            class="
                              form-control
                              border-0
                              dash-filter-picker
                              shadow
                            "
                          ></flat-pickr>

                          <div
                            class="
                              input-group-text
                              bg-primary
                              border-primary
                              text-white
                            "
                          >
                            <i class="ri-calendar-2-line"></i>
                          </div>
                        </div> -->
                      </div>
                      <!--end col-->
                      <!--end col-->
                      <div class="col-auto">
                        <button
                          type="button"
                          class="
                            btn btn-soft-info btn-icon
                            waves-effect waves-light
                            layout-rightside-btn
                          "
                          @click="rightcolumn"
                        >
                          <i class="ri-pulse-line"></i>
                        </button>
                      </div>
                      <!--end col-->
                    </div>
                    <!--end row-->
                  </form>
                </div>
              </div>
              <!-- end card header -->
            </div>
            <!--end col-->
          </div>
          <!--end row-->

          <div class="row">
            <div class="col-xl-3 col-md-6">
              <!-- card -->
              <div class="card card-animate">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <div class="flex-grow-1 overflow-hidden">
                      <p
                        class="
                          text-uppercase
                          fw-semibold
                          text-muted text-truncate
                          mb-0
                        "
                      >
                        Dokumen
                      </p>
                    </div>
                  </div>
                  <div
                    class="d-flex align-items-end justify-content-between mt-4"
                  >
                    <div>
                      <h4 class="fs-22 fw-semibold ff-secondary mb-4">
                        {{ this.jumlah.dokumen }}
                      </h4>
                      <router-link
                        :to="{
                          name: 'lihat-dokumen',
                        }"
                        class="text-decoration-underline"
                        >Lihat data</router-link
                      >
                    </div>
                    <div class="avatar-sm flex-shrink-0">
                      <span class="avatar-title bg-soft-primary rounded fs-3">
                        <i class=" bx bx-data text-primary"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <!-- end card body -->
              </div>
              <!-- end card -->
            </div>
            <!-- end col -->

            <div class="col-xl-3 col-md-6">
              <!-- card -->
              <div class="card card-animate">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <div class="flex-grow-1 overflow-hidden">
                      <p
                        class="
                          text-uppercase
                          fw-medium
                          text-muted text-truncate
                          mb-0
                        "
                      >
                        Peminjaman Dokumen
                      </p>
                    </div>
                  </div>
                  <div
                    class="d-flex align-items-end justify-content-between mt-4"
                  >
                    <div>
                      <h4 class="fs-22 fw-semibold ff-secondary mb-4">
                        {{ this.jumlah.peminjamanDokumen }}
                      </h4>
                      <router-link
                        :to="{
                          name: 'lihat-peminjaman-dokumen',
                        }"
                        class="text-decoration-underline"
                        >Lihat data</router-link
                      >
                    </div>
                    <div class="avatar-sm flex-shrink-0">
                      <span class="avatar-title bg-soft-info rounded fs-3">
                        <i class=" bx bx-data text-info"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <!-- end card body -->
              </div>
              <!-- end card -->
            </div>
            <!-- end col -->

            <div v-if="role == 'Admin'" class="col-xl-3 col-md-6">
              <!-- card -->
              <div  class="card card-animate">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <div class="flex-grow-1 overflow-hidden">
                      <p
                        class="
                          text-uppercase
                          fw-medium
                          text-muted text-truncate
                          mb-0
                        "
                      >
                        Ruangan
                      </p>
                    </div>
                  </div>
                  <div
                    class="d-flex align-items-end justify-content-between mt-4"
                  >
                    <div>
                      <h4 class="fs-22 fw-semibold ff-secondary mb-4">
                        {{ this.jumlah.ruangan }}
                      </h4>
                      <router-link
                        :to="{
                          name: 'lihat-ruangan',
                          params: { id: data.id },
                        }"
                        class="text-decoration-underline"
                        >Lihat data</router-link
                      >
                    </div>
                    <div class="avatar-sm flex-shrink-0">
                      <span class="avatar-title bg-soft-primary rounded fs-3">
                        <i class=" bx bx-data text-primary"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <!-- end card body -->
              </div>
              <!-- end card -->
            </div>
            <!-- end col -->

            <div class="col-xl-3 col-md-6">
              <div class="card card-animate">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <div class="flex-grow-1 overflow-hidden">
                      <p
                        class="
                          text-uppercase
                          fw-medium
                          text-muted text-truncate
                          mb-0
                        "
                      >
                        Peminjaman Ruangan
                      </p>
                    </div>
                  </div>
                  <div
                    class="d-flex align-items-end justify-content-between mt-4"
                  >
                    <div>
                      <h4 class="fs-22 fw-semibold ff-secondary mb-4">
                        {{ this.jumlah.peminjamanRuangan }}
                      </h4>
                      <router-link
                        :to="{
                          name: 'lihat-peminjamanRuangan',
                        }"
                        class="text-decoration-underline"
                        >Lihat data</router-link
                      >
                    </div>
                    <div class="avatar-sm flex-shrink-0">
                      <span class="avatar-title bg-soft-info rounded fs-3">
                        <i class=" bx bx-data text-info"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xl-6">
              <div class="card">
                <div class="card-header align-items-center d-flex">
                  <h4 class="card-title mb-0 flex-grow-1">
                    Peminjaman Dokumen Terpopuler
                  </h4>
                  <div class="flex-shrink-0">
                    <!-- <div class="dropdown card-header-dropdown">
                      <a
                        class="text-reset dropdown-btn"
                        href="#"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span class="fw-semibold text-uppercase fs-13"
                          >Sort by: </span
                        ><span class="text-muted"
                          >Today<i class="mdi mdi-chevron-down ms-1"></i
                        ></span>
                      </a>
                      <div class="dropdown-menu dropdown-menu-end">
                        <a class="dropdown-item" href="#">Today</a>
                        <a class="dropdown-item" href="#">Yesterday</a>
                        <a class="dropdown-item" href="#">Last 7 Days</a>
                        <a class="dropdown-item" href="#">Last 30 Days</a>
                        <a class="dropdown-item" href="#">This Month</a>
                        <a class="dropdown-item" href="#">Last Month</a>
                      </div>
                    </div> -->
                  </div>
                </div>
                <!-- end card header -->

                <div class="card-body">
                  <div class="table-responsive table-card">
                    <table
                      class="
                        table table-hover table-centered
                        align-middle
                        table-nowrap
                        mb-0
                      "
                    >
                      <tbody>
                        <tr
                          v-for="(item, index) in data.peminjamanDokumenPopuler"
                          :key="index"
                        >
                          <td>
                            <div class="d-flex align-items-center">
                              <div class="avatar-sm bg-light rounded p-1 me-2">
                                <img
                                  :src="item.gambar_dokumen"
                                  alt=""
                                  class="img-fluid d-block"
                                />
                              </div>
                              <div>
                                <h5 class="fs-15 my-1">
                                  <router-link
                                    to="/ecommerce/product-details"
                                    class="text-reset"
                                    >{{ item.judul }}</router-link
                                  >
                                </h5>
                                <span class="text-muted">{{
                                  item.nama_kategori
                                }}</span>
                              </div>
                            </div>
                          </td>
                          <td class="text-center">
                            <h5 class="fs-15 my-1 fw-normal">
                              {{ item.tahun_terbit }}
                            </h5>
                            <span class="text-muted">Tahun Terbit</span>
                          </td>
                          <td class="text-center">
                            <h5 class="fs-15 my-1 fw-normal">
                              {{ item.total_peminjaman }}
                            </h5>
                            <span class="text-muted">Total Peminjaman</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <!-- <div
                    class="
                      align-items-center
                      mt-4
                      pt-2
                      justify-content-between
                      d-flex
                    "
                  >
                    <div class="flex-shrink-0">
                      <div class="text-muted">
                        Showing <span class="fw-semibold">5</span> of
                        <span class="fw-semibold">25</span> Results
                      </div>
                    </div>
                    <ul
                      class="pagination pagination-separated pagination-sm mb-0"
                    >
                      <li class="page-item disabled">
                        <a href="#" class="page-link">←</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">1</a>
                      </li>
                      <li class="page-item active">
                        <a href="#" class="page-link">2</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">3</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">→</a>
                      </li>
                    </ul>
                  </div> -->
                </div>
              </div>
            </div>

            <div class="col-xl-6">
              <div class="card card-height-100">
                <div class="card-header align-items-center d-flex">
                  <h4 class="card-title mb-0 flex-grow-1">
                    Peminjaman Ruangan Terpopuler
                  </h4>
                  <div class="flex-shrink-0">
                    <!-- <div class="dropdown card-header-dropdown">
                      <a
                        class="text-reset dropdown-btn"
                        href="#"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span class="text-muted"
                          >Report<i class="mdi mdi-chevron-down ms-1"></i
                        ></span>
                      </a>
                      <div class="dropdown-menu dropdown-menu-end">
                        <a class="dropdown-item" href="#">Download Report</a>
                        <a class="dropdown-item" href="#">Export</a>
                        <a class="dropdown-item" href="#">Import</a>
                      </div>
                    </div> -->
                  </div>
                </div>
                <!-- end card header -->

                <div class="card-body">
                  <div class="table-responsive table-card">
                    <table
                      class="
                        table table-hover table-centered
                        align-middle
                        table-nowrap
                        mb-0
                      "
                    >
                      <tbody>
                        <tr
                          v-for="(item, index) in data.peminjamanRuanganPopuler"
                          :key="index"
                        >
                          <td>
                            <div class="d-flex align-items-center">
                              <div class="avatar-sm bg-light rounded p-1 me-2">
                                <img
                                  src="@/assets/images/meeting.png"
                                  alt=""
                                  class="img-fluid d-block"
                                />
                              </div>
                              <div
                                style="
                                  overflow-x: auto;
                                  width: 200px;
                                  height: 70px;
                                "
                              >
                                <h5 class="fs-15 my-1">
                                  <router-link
                                    to="/ecommerce/product-details"
                                    class="text-reset"
                                    >{{ item.nama_ruangan }}</router-link
                                  >
                                </h5>
                                <span class="text-muted">{{
                                  item.deskripsi
                                }}</span>
                              </div>
                            </div>
                          </td>
                          <td class="text-center">
                            <h5 class="fs-15 my-1 fw-normal">
                              {{ item.lokasi }}
                            </h5>
                            <span class="text-muted">Lokasi</span>
                          </td>
                          <td class="text-center">
                            <h5 class="fs-15 my-1 fw-normal">
                              {{ item.total_peminjaman }}
                            </h5>
                            <span class="text-muted">Total Peminjaman</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <!-- <div
                    class="
                      align-items-center
                      mt-4
                      pt-2
                      justify-content-between
                      d-flex
                    "
                  >
                    <div class="flex-shrink-0">
                      <div class="text-muted">
                        Showing <span class="fw-semibold">5</span> of
                        <span class="fw-semibold">25</span> Results
                      </div>
                    </div>
                    <ul
                      class="pagination pagination-separated pagination-sm mb-0"
                    >
                      <li class="page-item disabled">
                        <a href="#" class="page-link">←</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">1</a>
                      </li>
                      <li class="page-item active">
                        <a href="#" class="page-link">2</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">3</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">→</a>
                      </li>
                    </ul>
                  </div> -->
                </div>
                <!-- .card-body-->
              </div>
              <!-- .card-->
            </div>
            <!-- .col-->
          </div>

          <div class="row align-center center justify-content-center">
            <div class="col-xl-9">
              <Revenue />
            </div>
          </div>
          <!-- end row-->

          
          <!-- end row-->
        </div>
        <!-- end .h-100-->
      </div>
      <!-- end col -->

      <div class="col-auto layout-rightside-col">
        <div class="overlay"></div>
        <div class="layout-rightside">
          <div class="card h-100 rounded-0">
            <div class="card-body p-0">
              <div class="p-3">
                <h6 class="text-muted mb-0 text-uppercase fw-semibold">
                  Pengunjung Perpustakaan
                </h6>
              </div>
              <SimpleBar
                data-simplebar
                style="max-height: 410px"
                class="p-3 pt-0"
              >
                <div class="acitivity-timeline acitivity-main">
                  <div
                    v-for="(item, index) in data.pengunjungTerakhir"
                    :key="index"
                    class="acitivity-item py-3 d-flex"
                  >
                    <div class="flex-shrink-0">
                      <img
                        src="@/assets/images/users/avatar-2.jpg"
                        alt=""
                        class="avatar-xs rounded-circle acitivity-avatar"
                      />
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <h6 class="mb-1 lh-base">
                        {{ item.user.name }}
                      </h6>
                      <p class="text-muted mb-1">
                        Mengunjungi Perpustakaan ITK.
                      </p>
                      <small class="mb-0 text-muted">{{
                        item.created_at
                      }}</small>
                    </div>
                  </div>
                </div>
              </SimpleBar>

              <div class="p-3">
                <h6 class="text-muted mb-3 text-uppercase fw-semibold">
                  Peminjaman Dokumen
                  <span class="badge badge-soft-success">Aktif</span>
                </h6>
                <!-- Swiper -->
                <div>
                  <swiper
                    class="vertical-swiper"
                    :slidesPerView="2"
                    :spaceBetween="10"
                    :mousewheel="true"
                    :loop="false"
                    :direction="'vertical'"
                    :autoplay="{
                      delay: 2500,
                      disableOnInteraction: false,
                    }"
                    style="height: 250px"
                  >
                    <swiper-slide
                      v-for="(item, index) in data.peminjamanDokumenAktif"
                      :key="index"
                    >
                      <div class="swiper-slide">
                        <div class="card border border-dashed shadow-none">
                          <div class="card-body">
                            <div class="d-flex">
                              <div class="flex-shrink-0 avatar-sm">
                                <div class="avatar-title bg-light rounded">
                                  <img
                                    src="@/assets/images/companies/img-1.png"
                                    alt=""
                                    height="30"
                                  />
                                </div>
                              </div>
                              <div class="flex-grow-1 ms-3">
                                <div>
                                  <p
                                    class="
                                      text-muted
                                      mb-1
                                      fst-italic
                                      text-truncate-two-lines
                                    "
                                  >
                                    <b> {{ item.dokumen.judul }} </b>
                                  </p>
                                  <div class="fs-11 align-middle text-warning">
                                    {{ item.dokumen.nama_kategori }}
                                  </div>
                                </div>
                                <div class="text-end mb-0 text-muted">
                                  <p>{{ item.durasi_peminjaman }}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </swiper-slide>
                  </swiper>
                </div>
              </div>

              <!-- <div class="p-3">
                <h6 class="text-muted mb-3 text-uppercase fw-semibold">
                  Peminjaman Ruangan
                  <span class="badge badge-soft-success">Aktif</span>
                </h6>
                <div>
                  <swiper
                    class="vertical-swiper"
                    :slidesPerView="2"
                    :spaceBetween="10"
                    :mousewheel="true"
                    :loop="false"
                    :direction="'vertical'"
                    :autoplay="{
                      delay: 2500,
                      disableOnInteraction: false,
                    }"
                    style="height: 250px"
                  >
                    <swiper-slide>
                      <div class="swiper-slide">
                        <div class="card border border-dashed shadow-none">
                          <div class="card-body">
                            <div class="d-flex">
                              <div class="flex-shrink-0 avatar-sm">
                                <div class="avatar-title bg-light rounded">
                                  <img
                                    src="@/assets/images/companies/img-1.png"
                                    alt=""
                                    height="30"
                                  />
                                </div>
                              </div>
                              <div class="flex-grow-1 ms-3">
                                <div>
                                  <p
                                    class="
                                      text-muted
                                      mb-1
                                      fst-italic
                                      text-truncate-two-lines
                                    "
                                  >
                                    " Great product and looks great, lots of
                                    features. "
                                  </p>
                                  <div class="fs-11 align-middle text-warning">
                                    <i class="ri-star-fill"></i>
                                    <i class="ri-star-fill"></i>
                                    <i class="ri-star-fill"></i>
                                    <i class="ri-star-fill"></i>
                                    <i class="ri-star-fill"></i>
                                  </div>
                                </div>
                                <div class="text-end mb-0 text-muted">
                                  - by
                                  <cite title="Source Title"
                                    >Force Medicines</cite
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </swiper-slide>
                  </swiper>
                </div>
              </div> -->

              <div class="p-3 mt-2">
                <h6 class="text-muted mb-3 text-uppercase fw-semibold">
                  10 Pengunjung Teratas
                </h6>

                <ol class="ps-3 text-muted">
                  <li
                    class="py-1"
                    v-for="(item, index) in jumlah.pengunjung"
                    :key="index"
                  >
                    <a href="#" class="text-muted">
                      {{ item.name }}
                      <span class="float-end"
                        >({{ item.jumlah_kunjungan }})</span
                      ></a
                    >
                  </li>
                </ol>
                <div class="mt-3 text-center">
                  <!-- <a
                    href="javascript:void(0);"
                    class="text-muted text-decoration-underline"
                    >View all Categories</a
                  > -->
                </div>
              </div>
            </div>
          </div>
          <!-- end card-->
        </div>
        <!-- end .rightbar-->
      </div>
      <!-- end col -->
    </div>
  </Layout>
</template>
