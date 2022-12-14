<script>
import SwiperCore, { Thumbs, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";

SwiperCore.use([Thumbs, Navigation, Pagination]);

import apiPengunjung from "../../apis/Pengunjung.js";
import Layout from "../../layouts/main.vue";
import appConfig from "../../../app.config";
import apiUser from "../../apis/Auth.js";
import apiPeminjamanDokumen from "../../apis/PeminjamanDokumen.js";
import apiPeminjamanRuangan from "../../apis/PeminjamanRuangan.js";

export default {
  page: {
    title: "Profile",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      title: "Profile",
      items: [
        {
          text: "Velzon",
          href: "/",
        },
        {
          text: "Profile",
          active: true,
        },
      ],
      thumbsSwiper: null,
      User: {},
      Pengunjung: {},
      PeminjamanDokumen: {},
      PeminjamanRuangan: {},
      peminjamanDokumenAktif: {},
    };
  },
  methods: {
    getUser() {
      apiUser.getUser().then((response) => {
        this.User = response.data.data;
        console.log(this.User);
      });
    },
    getPengunjung() {
      apiPengunjung.lihatPengunjung().then((response) => {
        this.Pengunjung = response.data.data;
      });
    },
    getPeminjamanDokumen() {
      apiPeminjamanDokumen.lihatPeminjamanDokumen().then((response) => {
        this.PeminjamanDokumen = response.data.data;
      });
    },
    getPeminjamanRuangan() {
      apiPeminjamanRuangan.lihatPeminjamanRuangan().then((response) => {
        this.PeminjamanRuangan = response.data.data;
      });
    },
    getPeminjamanDokumenAktif() {
      apiPeminjamanDokumen.peminjamanDokumenAktif().then((response) => {
        this.peminjamanDokumenAktif = response.data.data;
      });
    },
  },
  components: {
    Layout,
    Swiper,
    SwiperSlide,
  },
  mounted() {
    this.getPeminjamanDokumenAktif();
    this.getPengunjung();
    this.getUser();
  },
};
</script>

<template>
  <Layout>
    <div class="profile-foreground position-relative mx-n4 mt-n4">
      <div class="profile-wid-bg">
        <img
          src="@/assets/images/bg-perpustakaan.jpg"
          alt=""
          class="profile-wid-img"
        />
      </div>
    </div>
    <div class="pt-4 mb-4 mb-lg-3 pb-lg-4">
      <div class="row g-4">
        <div class="col-auto">
          <div class="avatar-lg">
            <img
              src="@/assets/images/user.png"
              alt="user-img"
              class="img-thumbnail rounded-circle"
            />
          </div>
        </div>
        <!--end col-->
        <div class="col">
          <div class="p-2">
            <h3 class="text-white mb-1">{{ User.name }}</h3>
            <p class="text-white-75">{{ User.role }}</p>
            <div class="hstack text-white-50 gap-1">
              <div class="me-2">
                <i
                  class="
                    ri-map-pin-user-line
                    me-1
                    text-white-75
                    fs-16
                    align-middle
                  "
                ></i
                >{{ User.jurusan }}
              </div>
              <div>
                <i
                  class="ri-building-line me-1 text-white-75 fs-16 align-middle"
                ></i
                >{{ User.prodi }}
              </div>
            </div>
          </div>
        </div>
        <!--end col-->
      </div>
      <!--end row-->
    </div>

    <div class="row">
      <div class="col-lg-12">
        <div>
          <div class="d-flex">
            <!-- Nav tabs -->
            <ul
              class="
                nav nav-pills
                animation-nav
                profile-nav
                gap-2 gap-lg-3
                flex-grow-1
              "
              role="tablist"
            >
              <li class="nav-item">
                <a
                  class="nav-link fs-15 active"
                  data-bs-toggle="tab"
                  href="#overview-tab"
                  role="tab"
                >
                  <i class="ri-airplay-fill d-inline-block d-md-none"></i>
                  <span class="d-none d-md-inline-block">Overview</span>
                </a>
              </li>
            </ul>
          </div>
          <!-- Tab panes -->
          <div class="tab-content pt-4 text-muted">
            <div class="tab-pane active" id="overview-tab" role="tabpanel">
              <div class="row">
                <div class="col-xxl-4">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title mb-3">Info</h5>
                      <div class="table-responsive">
                        <table class="table table-borderless mb-0">
                          <tbody>
                            <tr>
                              <th class="ps-0" scope="row">Nama Lengkap :</th>
                              <td class="text-muted">{{ User.name }}</td>
                            </tr>
                            <tr>
                              <th class="ps-0" scope="row">NIM :</th>
                              <td class="text-muted">{{ User.nim }}</td>
                            </tr>
                            <tr>
                              <th class="ps-0" scope="row">Nomor Telepon :</th>
                              <td class="text-muted">{{ User.no_telp }}</td>
                            </tr>
                            <tr>
                              <th class="ps-0" scope="row">E-mail :</th>
                              <td class="text-muted">{{ User.email }}</td>
                            </tr>
                            <!-- <tr>
                              <th class="ps-0" scope="row">Lokasi :</th>
                              <td class="text-muted">
                                California, United States
                              </td>
                            </tr> -->
                            <tr>
                              <th class="ps-0" scope="row">Tanggal Bergabung</th>
                              <td class="text-muted">{{ User.created_at }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <!-- end card body -->
                  </div>
                  <!-- end card -->

                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title mb-3">Peminjaman Dokumen</h5>
                      <hr />
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
                            v-for="(item, index) in peminjamanDokumenAktif"
                            :key="index"
                          >
                            <div class="swiper-slide">
                              <div
                                class="card border border-dashed shadow-none"
                              >
                                <div class="card-body">
                                  <div class="d-flex">
                                    <div class="flex-shrink-0 avatar-sm">
                                      <div
                                        class="avatar-title bg-light rounded"
                                      >
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
                                        <div
                                          class="
                                            fs-11
                                            align-middle
                                            text-warning
                                          "
                                        >
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
                    <!--end card-body-->
                  </div>
                  <!--end card-->
                </div>
                <!--end col-->
                <div class="col-xxl-8">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="card">
                        <div class="card-header align-items-center d-flex">
                          <h4 class="card-title mb-0 me-2">
                            Aktivitas Terbaru
                          </h4>
                          <div class="flex-shrink-0 ms-auto">
                            <ul
                              class="
                                nav
                                justify-content-end
                                nav-tabs-custom
                                rounded
                                card-header-tabs
                                border-bottom-0
                              "
                              role="tablist"
                            >
                              <li class="nav-item">
                                <a
                                  class="nav-link active"
                                  data-bs-toggle="tab"
                                  href="#today"
                                  role="tab"
                                >
                                  Kunjungan
                                </a>
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  data-bs-toggle="tab"
                                  href="#weekly"
                                  role="tab"
                                  @click="this.getPeminjamanDokumen()"
                                >
                                  Peminjaman Dokumen
                                </a>
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  data-bs-toggle="tab"
                                  href="#monthly"
                                  role="tab"
                                  @click="this.getPeminjamanRuangan()"
                                >
                                  Peminjaman Ruangan
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div class="card-body" style="height: 64vh; overflow-y: scroll;">
                          <div class="tab-content text-muted">
                            <div
                              class="tab-pane active"
                              id="today"
                              role="tabpanel"
                            >
                              <div class="profile-timeline">
                                <div
                                  v-for="(item, index) in Pengunjung"
                                  :key="index"
                                  class="accordion-item mb-3 border-0"
                                >
                                  <div
                                    class="accordion-header"
                                    id="heading{{index}}"
                                  >
                                    <a
                                      class="accordion-button p-2 shadow-none"
                                      data-bs-toggle="collapse"
                                      href="#collapse{{index}}"
                                      aria-expanded="false"
                                    >
                                      <div class="d-flex">
                                        <div class="flex-shrink-0">
                                          <img
                                            src="@/assets/images/users/avatar-6.jpg"
                                            alt=""
                                            class="avatar-xs rounded-circle"
                                          />
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                          <h6 class="fs-15 mb-1">
                                            {{ item.user.name }}
                                            <!-- <span
                                              class="
                                                badge
                                                bg-soft-info
                                                text-info
                                                align-middle
                                              "
                                              >Inprogress</span
                                            > -->
                                          </h6>
                                          <small class="text-muted mb-2"
                                            >Mengunjungi Perpustakaan ITK -
                                            {{ item.created_at }}</small
                                          >
                                        </div>
                                      </div>
                                    </a>
                                  </div>
                                </div>
                                <!--end accordion-->
                              </div>
                            </div>
                            <div class="tab-pane" id="weekly" role="tabpanel">
                              <div class="profile-timeline">
                                <div
                                  class="accordion accordion-flush"
                                  id="weeklyExample"
                                >
                                  <div
                                    v-for="(item, index) in PeminjamanDokumen"
                                    :key="index"
                                    class="accordion-item mb-3 border-0"
                                  >
                                    <div
                                      class="accordion-header"
                                      id="heading{{index}}"
                                    >
                                      <a
                                        class="accordion-button p-2 shadow-none"
                                        data-bs-toggle="collapse"
                                        href="#collapse{{index}}"
                                        aria-expanded="false"
                                      >
                                        <div class="d-flex">
                                          <div class="flex-shrink-0">
                                            <img
                                              src="@/assets/images/users/avatar-6.jpg"
                                              alt=""
                                              class="avatar-xs rounded-circle"
                                            />
                                          </div>
                                          <div class="flex-grow-1 ms-3">
                                            <h6 class="fs-15 mb-1">
                                              {{ item.user.name }}
                                              <!-- <span
                                              class="
                                                badge
                                                bg-soft-info
                                                text-info
                                                align-middle
                                              "
                                              >Inprogress</span 
                                            > -->
                                            </h6>
                                            <small class="text-muted mb-2"
                                              >Melakukan peminjaman dokumen
                                              <b> {{ item.dokumen.judul }} </b>
                                              pada
                                              <b>{{ item.tgl_peminjaman }}</b
                                              >. Berakhir
                                              <b>{{
                                                item.durasi_peminjaman
                                              }}</b>
                                              {{ item.created_at }}</small
                                            >
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <!--end accordion-->
                              </div>
                            </div>
                            <div class="tab-pane" id="monthly" role="tabpanel">
                              <div class="profile-timeline">
                                <div
                                  class="accordion accordion-flush"
                                  id="monthlyExample"
                                >
                                  <div
                                    v-for="(item, index) in PeminjamanRuangan"
                                    :key="index"
                                    class="accordion-item mb-3 border-0"
                                  >
                                    <div
                                      class="accordion-header"
                                      id="heading{{index}}"
                                    >
                                      <a
                                        class="accordion-button p-2 shadow-none"
                                        data-bs-toggle="collapse"
                                        href="#collapse{{index}}"
                                        aria-expanded="false"
                                      >
                                        <div class="d-flex">
                                          <div class="flex-shrink-0">
                                            <img
                                              src="@/assets/images/users/avatar-6.jpg"
                                              alt=""
                                              class="avatar-xs rounded-circle"
                                            />
                                          </div>
                                          <div class="flex-grow-1 ms-3">
                                            <h6 class="fs-15 mb-1">
                                              {{ item.user.name }}
                                              <span
                                                class="
                                                  badge
                                                  bg-soft-info
                                                  text-info
                                                  align-middle
                                                "
                                                >{{ item.status }}</span
                                              >
                                            </h6>
                                            <small class="text-muted mb-2"
                                              >Melakukan peminjaman ruangan
                                              <b>
                                                {{ item.ruangan.nama_ruangan }}
                                              </b>
                                              pada
                                              <b>{{ item.tanggal }}</b> pada
                                              pukul {{ item.waktu_awal }} dan
                                              berakhir pada pukul
                                              <b>{{
                                                item.waktu_akhir
                                              }}</b></small
                                            >
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <!--end accordion-->
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- end card body -->
                      </div>
                      <!-- end card -->
                    </div>
                    <!-- end col -->
                  </div>
                  <!-- end row -->

                  <!-- <div class="card">
                    <div class="card-body">
                      <h5 class="card-title mb-3">Dokumen</h5>
                      <div class="swiper project-swiper">
                        <swiper
                          :slides-per-view="3"
                          :space-between="50"
                          :thumbs="{ swiper: thumbsSwiper }"
                        >
                          <swiper-slide>
                            <div class="swiper-slide">
                              <div
                                class="
                                  card
                                  profile-project-card
                                  shadow-none
                                  profile-project-warning
                                  mb-0
                                "
                              >
                                <div class="card-body p-4">
                                  <div class="d-flex">
                                    <div
                                      class="
                                        flex-grow-1
                                        text-muted
                                        overflow-hidden
                                      "
                                    >
                                      <h5 class="fs-15 text-truncate mb-1">
                                        <a href="#" class="text-dark"
                                          >Chat App</a
                                        >
                                      </h5>
                                      <p class="text-muted text-truncate mb-0">
                                        Last Update :
                                        <span class="fw-semibold text-dark"
                                          >1 hr Ago</span
                                        >
                                      </p>
                                    </div>
                                    <div class="flex-shrink-0 ms-2">
                                      <div
                                        class="badge badge-soft-warning fs-10"
                                      >
                                        Inprogress
                                      </div>
                                    </div>
                                  </div>

                                  <div class="d-flex mt-4">
                                    <div class="flex-grow-1">
                                      <div
                                        class="d-flex align-items-center gap-2"
                                      >
                                        <div>
                                          <h5 class="fs-12 text-muted mb-0">
                                            Members :
                                          </h5>
                                        </div>
                                        <div class="avatar-group">
                                          <div class="avatar-group-item">
                                            <div class="avatar-xs">
                                              <img
                                                src="@/assets/images/users/avatar-4.jpg"
                                                alt=""
                                                class="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                          <div class="avatar-group-item">
                                            <div class="avatar-xs">
                                              <img
                                                src="@/assets/images/users/avatar-5.jpg"
                                                alt=""
                                                class="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                          <div class="avatar-group-item">
                                            <div class="avatar-xs">
                                              <div
                                                class="
                                                  avatar-title
                                                  rounded-circle
                                                  bg-light
                                                  text-primary
                                                "
                                              >
                                                A
                                              </div>
                                            </div>
                                          </div>
                                        </div>
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
                  </div> -->
                  <!-- end card -->
                </div>
                <!--end col-->
              </div>
              <!--end row-->
            </div>
            <!--end tab-pane-->
          </div>
          <!--end tab-content-->
        </div>
      </div>
      <!--end col-->
    </div>
    <!--end row-->
  </Layout>
</template>
