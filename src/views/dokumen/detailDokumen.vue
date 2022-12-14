<script>
import Swal from "sweetalert2";
import Layout from "../../layouts/main.vue";
import appConfig from "../../../app.config";
import apiDokumen from "../../apis/Dokumen";
import apiPeminjamanDokumen from "../../apis/PeminjamanDokumen";
import Multiselect from "@vueform/multiselect";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@vueform/multiselect/themes/default.css";
export default {
  props: {
    id: Object,
  },
  methods: {
    toggleFavourite(ele) {
      ele.target.closest(".favourite-btn").classList.toggle("active");
    },
    pinjamDokumen() {
      console.log("terPinjam");
      apiPeminjamanDokumen
        .tambahPeminjamanDokumen({ dokumen_id: this.$route.params.id })
        .then((response) => {
          if (response.data.code == 200) {
            Swal.fire(
              "Berhasil!",
              "Peminjaman Dokumen Berhasil Ditambah!",
              "success"
            ).then((result) => {
              if (result.value) {
                this.$router.push("lihat");
              }
            });
          } else {
            Swal.fire("Error!", "Peminjaman Dokumen Gagal Ditambah!", "error");
          }
        });
    },
    async getDokumen() {
      await apiDokumen.showDokumen(this.$route.params.id).then((response) => {
        this.dokumen = response.data.data;
      });
      // console.log(this.dokumen)
    },
    revisiDokumen() {
      apiDokumen
        .revisiDokumen(this.$route.params.id, {
          status: this.dokumen.status,
          catatan: this.dokumen.catatan,
        })
        .then((response) => {
          if (response.data.code == 200) {
            Swal.fire(
              "Berhasil!",
              "Data Dokumen Berhasil Direvisi!",
              "success"
            ).then((result) => {
              if (result.value) {
                this.$router.push("lihat");
              }
            });
          }
        });
    },
    riwayatPeminjamanDokumen() {
      apiDokumen
        .riwayatPeminjamanDokumen(this.$route.params.id)
        .then((response) => {
          this.riwayatPeminjaman = response.data.data;
        });
    },
    downloadDokumen(detail) {
      apiDokumen
        .downloadDokumen(this.$route.params.id, detail)
        .then((response) => {
          console.log("clicked");
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", detail + ".pdf");
          document.body.appendChild(link);
          link.click();
        });
    },
  },
  page: {
    title: "Overview",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  inject: ["role"],
  data() {
    return {
      title: "Overview",
      items: [
        {
          text: "Pages",
          href: "/",
        },
        {
          text: "Overview",
          active: true,
        },
      ],
      dokumen: {
        kategori: {},
      },
      riwayatPeminjaman: {},
      settingDokumen: {},
      editor: ClassicEditor,
      editorData:
        "<p>Tommy Hilfiger men striped pink sweatshirt. Crafted with cotton. Material composition is 100% organic cotton. This is one of the world’s leading designer lifestyle brands and is internationally recognized for celebrating the essence of classic American cool style, featuring preppy with a twist designs.</p><ul><li>Full Sleeve</li><li>Cotton</li><li>All Sizes available</li><li>4 Different Color</li></ul>",
      content: "<h1>Some initial content</h1>",
    };
  },
  components: {
    Layout,
    Multiselect,
    ckeditor: CKEditor.component,
  },

  mounted() {
    this.getDokumen();
  },
  // created() {
  //     this.getDokumen();
  // },
};
</script>

<template>
  <Layout>
    <div class="row">
      <div class="col-lg-12">
        <div class="card mt-n4 mx-n4">
          <div class="bg-soft-info">
            <div class="card-body pb-0 px-4">
              <div class="row mb-3">
                <div class="col-md">
                  <div class="row align-items-center g-3">
                    <div class="col-md-auto">
                      <div class="avatar-md">
                        <div class="avatar-title bg-white rounded-circle">
                          <img
                            :src="dokumen.gambar_dokumen"
                            alt=""
                            class="avatar-xs"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md">
                      <div>
                        <h4 class="fw-bold">{{ this.dokumen.judul }}</h4>
                        <div class="hstack gap-3 flex-wrap">
                          <div>
                            <i class="ri-building-line align-bottom me-1"></i>
                            {{ this.dokumen.kategori.nama_kategori }}
                          </div>
                          <div class="vr"></div>
                          <div>
                            Create Date :
                            <span class="fw-semibold fs-15">{{
                              this.dokumen.tanggal_dibuat
                            }}</span>
                          </div>
                          <div class="vr"></div>
                          <div>
                            <i class="ri-eye-line"></i>
                            {{ this.dokumen.jumlah_kunjungan }}
                          </div>
                          <div class="vr"></div>
                          <div class="badge rounded-pill bg-info fs-12">
                            New
                          </div>
                          <div class="badge rounded-pill bg-danger fs-12">
                            High
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-auto">
                  <div class="hstack gap-1 flex-wrap">
                    <button
                      type="button"
                      class="btn py-0 fs-16 favourite-btn active"
                    >
                      <i class="ri-star-fill" @click="toggleFavourite"></i>
                    </button>
                    <button type="button" class="btn py-0 fs-16 text-body">
                      <i class="ri-share-line"></i>
                    </button>
                    <button type="button" class="btn py-0 fs-16 text-body">
                      <i class="ri-flag-line"></i>
                    </button>
                  </div>
                  <div class="hstack gap-3 flex-wrap">
                    <div class="flex-shrink-0">
                      <button
                        v-if="
                          this.dokumen.status === 'Diterima' &&
                          this.dokumen.isPinjam == false
                        "
                        type="button"
                        @click="pinjamDokumen(this.$route.params.id)"
                        class="btn btn-success add-btn"
                      >
                        <i class="ri-add-line align-bottom me-1"></i> Pinjam
                        Dokumen
                      </button>
                      <button
                        v-if="
                          this.dokumen.status === 'Diterima' &&
                          this.dokumen.isPinjam == true
                        "
                        type="button"
                        class="btn btn-success add-btn"
                      >
                        <i class="ri-check-fill align-bottom me-1"></i>
                        Dokumen Sudah Dipinjam
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <ul class="nav nav-tabs-custom border-bottom-0" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link active fw-semibold"
                    data-bs-toggle="tab"
                    href="#project-overview"
                    role="tab"
                  >
                    Ringkasan
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link fw-semibold"
                    data-bs-toggle="tab"
                    href="#project-documents"
                    role="tab"
                  >
                    Berkas
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link fw-semibold"
                    data-bs-toggle="tab"
                    href="#riwayat-peminjaman"
                    role="tab"
                    @click="riwayatPeminjamanDokumen()"
                  >
                    Riwayat Peminjaman
                  </a>
                </li>
                <li
                  class="nav-item"
                  v-if="
                    role === 'Admin' &&
                    this.dokumen.status != 'Diterima' &&
                    this.dokumen.status != 'Ditolak'
                  "
                >
                  <a
                    class="nav-link fw-semibold"
                    data-bs-toggle="tab"
                    href="#setting-dokumen"
                    role="tab"
                  >
                    Revisi Dokumen
                  </a>
                </li>
              </ul>
            </div>
            <!-- end card body -->
          </div>
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
    <div class="row">
      <div class="col-lg-12">
        <div class="tab-content text-muted">
          <div
            class="tab-pane fade show active"
            id="project-overview"
            role="tabpanel"
          >
            <div class="row">
              <div class="col-xl-12 col-lg-12">
                <div class="card">
                  <div class="card-body">
                    <div class="text-muted">
                      <h6 class="mb-3 fw-semibold text-uppercase">
                        <b>Ringkasan</b>
                      </h6>
                      <!-- <p>It will be as simple as occidental in fact, it will be Occidental. To an
                                            English person, it will seem like simplified English, as a skeptical
                                            Cambridge friend of mine told me what Occidental is. The European
                                            languages are members of the same family. Their separate existence is a
                                            myth. For science, music, sport, etc, Europe uses the same vocabulary.
                                            The languages only differ in their grammar, their pronunciation and
                                            their most common words.</p>

                                        <ul class="ps-4 vstack gap-2">
                                            <li>Product Design, Figma (Software), Prototype</li>
                                            <li>Four Dashboards : Ecommerce, Analytics, Project,etc.</li>
                                            <li>Create calendar, chat and email app pages.</li>
                                            <li>Add authentication pages.</li>
                                            <li>Content listing.</li>
                                        </ul> -->
                      <p v-html="dokumen.deskripsi"></p>
                      <!-- <div>
                                            <button type="button" class="btn btn-link link-success p-0">Read
                                                more</button>
                                        </div> -->

                      <div class="pt-3 border-top border-top-dashed mt-4">
                        <div class="row">
                          <div class="col-lg-3 col-sm-6">
                            <div>
                              <p class="mb-2 text-uppercase fw-semibold fs-13">
                                Nama Pengarang :
                              </p>
                              <h5 class="fs-15 mb-0">
                                {{ this.dokumen.nama_pengarang }}
                              </h5>
                            </div>
                          </div>
                          <div class="col-lg-3 col-sm-6">
                            <div>
                              <p class="mb-2 text-uppercase fw-semibold fs-13">
                                Tahun Terbit :
                              </p>
                              <h5 class="fs-15 mb-0">
                                {{ this.dokumen.tahun_terbit }}
                              </h5>
                            </div>
                          </div>
                          <div class="col-lg-3 col-sm-6">
                            <div>
                              <p class="mb-2 text-uppercase fw-semibold fs-13">
                                Penerbit :
                              </p>
                              <h5 class="fs-15 mb-0">
                                {{ this.dokumen.penerbit }}
                              </h5>
                            </div>
                          </div>
                          <div class="col-lg-3 col-sm-6">
                            <div>
                              <p class="mb-2 text-uppercase fw-semibold fs-13">
                                Status :
                              </p>
                              <div
                                v-if="this.dokumen.status === 'Diterima'"
                                class="badge bg-success fs-12"
                              >
                                Diterima
                              </div>
                              <div
                                v-if="this.dokumen.status === 'Diproses'"
                                class="badge bg-warning fs-12"
                              >
                                Diproses
                              </div>
                              <div
                                v-if="this.dokumen.status === 'Revisi'"
                                class="badge bg-warning fs-12"
                              >
                                Revisi
                              </div>
                              <div
                                v-if="this.dokumen.status === 'Ditolak'"
                                class="badge bg-danger fs-12"
                              >
                                Ditolak
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        v-if="this.dokumen.pembimbing"
                        class="pt-3 border-top border-top-dashed mt-4"
                      >
                        <h6 class="mb-3 fw-semibold text-uppercase">
                          Dosen Pembimbing
                        </h6>
                        <div class="row g-3">
                          <div
                            v-for="(item, index) in dokumen.pembimbing"
                            :key="index"
                            class="col-xxl-4 col-lg-6"
                          >
                            <div class="border rounded border-dashed p-2">
                              <div class="d-flex align-items-center">
                                <div class="d-flex align-items-center">
                                  <div class="flex-shrink-0">
                                    <img
                                      src="@/assets/images/user.png"
                                      alt=""
                                      class="avatar-sm rounded"
                                    />
                                  </div>
                                  <div class="flex-grow-1 ms-3">
                                    <h6 class="fs-15 mb-1">{{ item.name }}</h6>
                                    <p class="text-muted mb-0">
                                      Dosen Pembimbing
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- end row -->
                      </div>
                    </div>
                  </div>
                  <!-- end card body -->
                </div>
                <!-- end card -->

                <!-- end card -->
              </div>
              <!-- ene col -->

              <!-- end col -->
            </div>
            <!-- end row -->
          </div>
          <!-- end tab pane -->
          <div class="tab-pane fade" id="project-documents" role="tabpanel">
            <div class="card">
              <div class="card-body">
                <div class="d-flex align-items-center mb-4">
                  <h5 class="card-title flex-grow-1">Documents</h5>
                </div>
                <div class="row">
                  <div class="col-lg-12">
                    <div class="table-responsive table-card">
                      <table class="table table-borderless align-middle mb-0">
                        <thead class="table-light">
                          <tr>
                            <th scope="col">File Name</th>
                            <th scope="col">Type</th>
                            <th scope="col">Size</th>
                            <th scope="col">Upload Date</th>
                            <th scope="col" style="width: 120px">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-if="this.dokumen.cover">
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="
                                      avatar-title
                                      bg-light
                                      text-danger
                                      rounded
                                      fs-24
                                    "
                                  >
                                    <i class="ri-file-pdf-fill"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <router-link
                                      :to="{
                                        name: 'baca-dokumen',
                                        params: { id: id, jenisFile: 'cover' },
                                      }"
                                      class="text-dark"
                                      >Cover
                                    </router-link>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>PDF File</td>
                            <td>{{ this.dokumen.cover.size }}</td>
                            <td>24 Nov 2021</td>
                            <td>
                              <div class="dropdown">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <router-link
                                      :to="{
                                        name: 'baca-dokumen',
                                        params: { id: id, jenisFile: 'cover' },
                                      }"
                                      class="dropdown-item"
                                      ><i
                                        class="
                                          ri-eye-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >View</router-link
                                    >
                                  </li>
                                  <li v-if="role == 'Admin' || role == 'Dosen'">
                                    <a
                                      @click="downloadDokumen('cover')"
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-download-2-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr v-if="this.dokumen.lembar_pengesahan">
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="
                                      avatar-title
                                      bg-light
                                      text-danger
                                      rounded
                                      fs-24
                                    "
                                  >
                                    <i class="ri-file-pdf-fill"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <router-link
                                      :to="{
                                        name: 'baca-dokumen',
                                        params: {
                                          id: id,
                                          jenisFile: 'lembar_pengesahan',
                                        },
                                      }"
                                      class="text-dark"
                                      >Lembar Pengesahan
                                    </router-link>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>PDF File</td>
                            <td>{{ this.dokumen.lembar_pengesahan.size }}</td>
                            <td>24 Nov 2021</td>
                            <td>
                              <div class="dropdown">
                                <router-link
                                  :to="{
                                    name: 'baca-dokumen',
                                    params: {
                                      id: id,
                                      jenisFile: 'lembar_pengesahan',
                                    },
                                  }"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill">View</i>
                                </router-link>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <router-link
                                      :to="{
                                        name: 'baca-dokumen',
                                        params: {
                                          id: id,
                                          jenisFile: 'lembar_pengesahan',
                                        },
                                      }"
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-eye-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >View</router-link
                                    >
                                  </li>
                                  <li v-if="role == 'Admin' || role == 'Dosen'">
                                    <a
                                      @click="
                                        downloadDokumen('lembar_pengesahan')
                                      "
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-download-2-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr v-if="this.dokumen.kata_pengantar">
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="
                                      avatar-title
                                      bg-light
                                      text-danger
                                      rounded
                                      fs-24
                                    "
                                  >
                                    <i class="ri-file-pdf-fill"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <router-link
                                      :to="{
                                        name: 'baca-dokumen',
                                        params: {
                                          id: id,
                                          jenisFile: 'kata_pengantar',
                                        },
                                      }"
                                      class="text-dark"
                                      >Kata Pengantar
                                    </router-link>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>PDF File</td>
                            <td>{{ this.dokumen.kata_pengantar.size }}</td>
                            <td>24 Nov 2021</td>
                            <td>
                              <div class="dropdown">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-eye-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li v-if="role == 'Admin' || role == 'Dosen'">
                                    <a
                                      @click="downloadDokumen('kata_pengantar')"
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-download-2-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr v-if="this.dokumen.ringkasan">
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="
                                      avatar-title
                                      bg-light
                                      text-danger
                                      rounded
                                      fs-24
                                    "
                                  >
                                    <i class="ri-file-pdf-fill"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <router-link
                                      :to="{
                                        name: 'baca-dokumen',
                                        params: {
                                          id: id,
                                          jenisFile: 'ringkasan',
                                        },
                                      }"
                                      class="text-dark"
                                      >Ringkasan
                                    </router-link>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>PDF File</td>
                            <td>{{ this.dokumen.ringkasan.size }}</td>
                            <td>24 Nov 2021</td>
                            <td>
                              <div class="dropdown">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-eye-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li v-if="role == 'Admin' || role == 'Dosen'">
                                    <a
                                      @click="downloadDokumen('ringkasan')"
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-download-2-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr v-if="this.dokumen.daftar_isi">
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="
                                      avatar-title
                                      bg-light
                                      text-danger
                                      rounded
                                      fs-24
                                    "
                                  >
                                    <i class="ri-file-pdf-fill"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <router-link
                                      :to="{
                                        name: 'baca-dokumen',
                                        params: {
                                          id: id,
                                          jenisFile: 'daftar_isi',
                                        },
                                      }"
                                      class="text-dark"
                                      >Daftar Isi
                                    </router-link>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>PDF File</td>
                            <td>{{ this.dokumen.daftar_isi.size }}</td>
                            <td>24 Nov 2021</td>
                            <td>
                              <div class="dropdown">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-eye-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li v-if="role == 'Admin' || role == 'Dosen'">
                                    <a
                                      @click="downloadDokumen('daftar_isi')"
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-download-2-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr v-if="this.dokumen.daftar_gambar">
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="
                                      avatar-title
                                      bg-light
                                      text-danger
                                      rounded
                                      fs-24
                                    "
                                  >
                                    <i class="ri-file-pdf-fill"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <router-link
                                      :to="{
                                        name: 'baca-dokumen',
                                        params: {
                                          id: id,
                                          jenisFile: 'daftar_gambar',
                                        },
                                      }"
                                      class="text-dark"
                                      >Daftar Gambar
                                    </router-link>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>PDF File</td>
                            <td>{{ this.dokumen.daftar_gambar.size }}</td>
                            <td>24 Nov 2021</td>
                            <td>
                              <div class="dropdown">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-eye-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li v-if="role == 'Admin' || role == 'Dosen'">
                                    <a
                                      @click="downloadDokumen('daftar_gambar')"
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-download-2-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr v-if="this.dokumen.daftar_tabel">
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="
                                      avatar-title
                                      bg-light
                                      text-danger
                                      rounded
                                      fs-24
                                    "
                                  >
                                    <i class="ri-file-pdf-fill"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <router-link
                                      :to="{
                                        name: 'baca-dokumen',
                                        params: {
                                          id: id,
                                          jenisFile: 'daftar_tabel',
                                        },
                                      }"
                                      class="text-dark"
                                      >Daftar Tabel
                                    </router-link>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>PDF File</td>
                            <td>{{ this.dokumen.daftar_tabel.size }}</td>
                            <td>24 Nov 2021</td>
                            <td>
                              <div class="dropdown">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-eye-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li v-if="role == 'Admin' || role == 'Dosen'">
                                    <a
                                      @click="downloadDokumen('daftar_tabel')"
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-download-2-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr v-if="this.dokumen.daftar_notasi">
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="
                                      avatar-title
                                      bg-light
                                      text-danger
                                      rounded
                                      fs-24
                                    "
                                  >
                                    <i class="ri-file-pdf-fill"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <router-link
                                      :to="{
                                        name: 'baca-dokumen',
                                        params: {
                                          id: id,
                                          jenisFile: 'daftar_notasi',
                                        },
                                      }"
                                      class="text-dark"
                                      >Daftar Notasi
                                    </router-link>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>PDF File</td>
                            <td>{{ this.dokumen.daftar_notasi.size }}</td>
                            <td>24 Nov 2021</td>
                            <td>
                              <div class="dropdown">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-eye-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li v-if="role == 'Admin' || role == 'Dosen'">
                                    <a
                                      @click="downloadDokumen('daftar_notasi')"
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-download-2-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr v-if="this.dokumen.abstract_en">
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="
                                      avatar-title
                                      bg-light
                                      text-danger
                                      rounded
                                      fs-24
                                    "
                                  >
                                    <i class="ri-file-pdf-fill"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <router-link
                                      :to="{
                                        name: 'baca-dokumen',
                                        params: {
                                          id: id,
                                          jenisFile: 'abstract_en',
                                        },
                                      }"
                                      class="text-dark"
                                      >Abstract(EN)
                                    </router-link>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>PDF File</td>
                            <td>{{ this.dokumen.abstract_en.size }}</td>
                            <td>24 Nov 2021</td>
                            <td>
                              <div class="dropdown">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-eye-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li v-if="role == 'Admin' || role == 'Dosen'">
                                    <a
                                      @click="downloadDokumen('abstract_en')"
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-download-2-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr v-if="this.dokumen.abstract_id">
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="
                                      avatar-title
                                      bg-light
                                      text-danger
                                      rounded
                                      fs-24
                                    "
                                  >
                                    <i class="ri-file-pdf-fill"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <router-link
                                      :to="{
                                        name: 'baca-dokumen',
                                        params: {
                                          id: id,
                                          jenisFile: 'abstract_id',
                                        },
                                      }"
                                      class="text-dark"
                                      >Abstract(ID)
                                    </router-link>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>PDF File</td>
                            <td>{{ this.dokumen.abstract_id.size }}</td>
                            <td>24 Nov 2021</td>
                            <td>
                              <div class="dropdown">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-eye-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li v-if="role == 'Admin' || role == 'Dosen'">
                                    <a
                                      @click="downloadDokumen('abstract_id')"
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-download-2-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr v-if="this.dokumen.bab1">
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="
                                      avatar-title
                                      bg-light
                                      text-danger
                                      rounded
                                      fs-24
                                    "
                                  >
                                    <i class="ri-file-pdf-fill"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <router-link
                                      :to="{
                                        name: 'baca-dokumen',
                                        params: { id: id, jenisFile: 'bab1' },
                                      }"
                                      class="text-dark"
                                      >BAB 1
                                    </router-link>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>PDF File</td>
                            <td>{{ this.dokumen.bab1.size }}</td>
                            <td>24 Nov 2021</td>
                            <td>
                              <div class="dropdown">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-eye-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li v-if="role == 'Admin' || role == 'Dosen'">
                                    <a
                                      @click="downloadDokumen('bab1')"
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-download-2-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr v-if="this.dokumen.bab2">
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="
                                      avatar-title
                                      bg-light
                                      text-danger
                                      rounded
                                      fs-24
                                    "
                                  >
                                    <i class="ri-file-pdf-fill"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <router-link
                                      :to="{
                                        name: 'baca-dokumen',
                                        params: { id: id, jenisFile: 'bab2' },
                                      }"
                                      class="text-dark"
                                      >BAB 2
                                    </router-link>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>PDF File</td>
                            <td>{{ this.dokumen.bab2.size }}</td>
                            <td>24 Nov 2021</td>
                            <td>
                              <div class="dropdown">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-eye-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li v-if="role == 'Admin' || role == 'Dosen'">
                                    <a
                                      @click="downloadDokumen('bab2')"
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-download-2-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr v-if="this.dokumen.bab3">
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="
                                      avatar-title
                                      bg-light
                                      text-danger
                                      rounded
                                      fs-24
                                    "
                                  >
                                    <i class="ri-file-pdf-fill"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <router-link
                                      :to="{
                                        name: 'baca-dokumen',
                                        params: { id: id, jenisFile: 'bab3' },
                                      }"
                                      class="text-dark"
                                      >BAB 3
                                    </router-link>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>PDF File</td>
                            <td>{{ this.dokumen.bab3.size }}</td>
                            <td>24 Nov 2021</td>
                            <td>
                              <div class="dropdown">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-eye-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li v-if="role == 'Admin' || role == 'Dosen'">
                                    <a
                                      @click="downloadDokumen('bab3')"
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-download-2-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr v-if="this.dokumen.bab4">
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="
                                      avatar-title
                                      bg-light
                                      text-danger
                                      rounded
                                      fs-24
                                    "
                                  >
                                    <i class="ri-file-pdf-fill"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <router-link
                                      :to="{
                                        name: 'baca-dokumen',
                                        params: { id: id, jenisFile: 'bab4' },
                                      }"
                                      class="text-dark"
                                      >BAB 4
                                    </router-link>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>PDF File</td>
                            <td>{{ this.dokumen.bab4.size }}</td>
                            <td>24 Nov 2021</td>
                            <td>
                              <div class="dropdown">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-eye-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li v-if="role == 'Admin' || role == 'Dosen'">
                                    <a
                                      @click="downloadDokumen('bab4')"
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-download-2-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr v-if="this.dokumen.kesimpulan">
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="
                                      avatar-title
                                      bg-light
                                      text-danger
                                      rounded
                                      fs-24
                                    "
                                  >
                                    <i class="ri-file-pdf-fill"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <router-link
                                      :to="{
                                        name: 'baca-dokumen',
                                        params: {
                                          id: id,
                                          jenisFile: 'kesimpulan',
                                        },
                                      }"
                                      class="text-dark"
                                      >Kesimpulan
                                    </router-link>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>PDF File</td>
                            <td>{{ this.dokumen.kesimpulan.size }}</td>
                            <td>24 Nov 2021</td>
                            <td>
                              <div class="dropdown">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-eye-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li v-if="role == 'Admin' || role == 'Dosen'">
                                    <a
                                      @click="downloadDokumen('kesimpulan')"
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-download-2-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr v-if="this.dokumen.daftar_pustaka">
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="
                                      avatar-title
                                      bg-light
                                      text-danger
                                      rounded
                                      fs-24
                                    "
                                  >
                                    <i class="ri-file-pdf-fill"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <router-link
                                      :to="{
                                        name: 'baca-dokumen',
                                        params: {
                                          id: id,
                                          jenisFile: 'daftar_pustaka',
                                        },
                                      }"
                                      class="text-dark"
                                      >Daftar Pustaka
                                    </router-link>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>PDF File</td>
                            <td>{{ this.dokumen.daftar_pustaka.size }}</td>
                            <td>24 Nov 2021</td>
                            <td>
                              <div class="dropdown">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-eye-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li v-if="role == 'Admin' || role == 'Dosen'">
                                    <a
                                      @click="downloadDokumen('daftar_pustaka')"
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-download-2-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr v-if="this.dokumen.lampiran">
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="
                                      avatar-title
                                      bg-light
                                      text-danger
                                      rounded
                                      fs-24
                                    "
                                  >
                                    <i class="ri-file-pdf-fill"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <router-link
                                      :to="{
                                        name: 'baca-dokumen',
                                        params: {
                                          id: id,
                                          jenisFile: 'lampiran',
                                        },
                                      }"
                                      class="text-dark"
                                      >Lampiran
                                    </router-link>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>PDF File</td>
                            <td>{{ this.dokumen.lampiran.size }}</td>
                            <td>24 Nov 2021</td>
                            <td>
                              <div class="dropdown">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-eye-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li v-if="role == 'Admin' || role == 'Dosen'">
                                    <a
                                      @click="downloadDokumen('lampiran')"
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-download-2-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr v-if="this.dokumen.paper">
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="
                                      avatar-title
                                      bg-light
                                      text-danger
                                      rounded
                                      fs-24
                                    "
                                  >
                                    <i class="ri-file-pdf-fill"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <router-link
                                      :to="{
                                        name: 'baca-dokumen',
                                        params: { id: id, jenisFile: 'paper' },
                                      }"
                                      class="text-dark"
                                      >Paper
                                    </router-link>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>PDF File</td>
                            <td>{{ this.dokumen.paper.size }}</td>
                            <td>24 Nov 2021</td>
                            <td>
                              <div class="dropdown">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-eye-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li v-if="role == 'Admin' || role == 'Dosen'">
                                    <a
                                      @click="downloadDokumen('paper')"
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-download-2-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr v-if="this.dokumen.lembar_persetujuan">
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="
                                      avatar-title
                                      bg-light
                                      text-danger
                                      rounded
                                      fs-24
                                    "
                                  >
                                    <i class="ri-file-pdf-fill"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <router-link
                                      :to="{
                                        name: 'baca-dokumen',
                                        params: {
                                          id: id,
                                          jenisFile: 'lembar_persetujuan',
                                        },
                                      }"
                                      class="text-dark"
                                      >Lembar Persetujuan
                                    </router-link>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>PDF File</td>
                            <td>{{ this.dokumen.lembar_persetujuan.size }}</td>
                            <td>24 Nov 2021</td>
                            <td>
                              <div class="dropdown">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-eye-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li v-if="role == 'Admin' || role == 'Dosen'">
                                    <a
                                      @click="
                                        downloadDokumen('lembar_persetujuan')
                                      "
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-download-2-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr v-if="this.dokumen.full_dokumen">
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="
                                      avatar-title
                                      bg-light
                                      text-danger
                                      rounded
                                      fs-24
                                    "
                                  >
                                    <i class="ri-file-pdf-fill"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <router-link
                                      :to="{
                                        name: 'baca-dokumen',
                                        params: {
                                          id: id,
                                          jenisFile: 'full_dokumen',
                                        },
                                      }"
                                      class="text-dark"
                                      >Full Dokumen
                                    </router-link>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>PDF File</td>
                            <td>{{ this.dokumen.full_dokumen.size }}</td>
                            <td>24 Nov 2021</td>
                            <td>
                              <div class="dropdown">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-eye-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li v-if="role == 'Admin' || role == 'Dosen'">
                                    <a
                                      @click="downloadDokumen('full_dokumen')"
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                      ><i
                                        class="
                                          ri-download-2-fill
                                          me-2
                                          align-bottom
                                          text-muted
                                        "
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- end tab pane -->

          <div class="tab-pane fade" id="riwayat-peminjaman" role="tabpanel">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Activities</h5>
                <div class="acitivity-timeline py-3">
                  <div
                    v-for="(item, index) in riwayatPeminjaman"
                    :key="index"
                    class="acitivity-item d-flex"
                  >
                    <div class="flex-shrink-0">
                      <img
                        src="@/assets/images/user.png"
                        alt=""
                        class="avatar-xs rounded-circle acitivity-avatar"
                      />
                    </div>
                    <div class="flex-grow-1 ms-3 mb-4">
                      <h6 class="mb-1">
                        {{ item.user.name }}
                        <!-- <span
                          class="
                            badge
                            bg-soft-primary
                            text-primary
                            align-middle
                          "
                          >New</span
                        > -->
                      </h6>
                      <p class="text-muted mb-2">
                        Melakukan peminjaman dokumen.
                      </p>
                      <small class="mb-0 text-muted">{{
                        item.tgl_peminjaman
                      }}</small>
                    </div>
                  </div>
                </div>
              </div>
              <!--end card-body-->
            </div>
            <!--end card-->
          </div>

          <div class="tab-pane fade" id="setting-dokumen" role="tabpanel">
            <div class="row">
              <div class="col-xl-8 col-lg-8">
                <div class="card">
                  <div class="card-header">
                    <h5 class="card-title mb-0">Catatan Dokumen</h5>
                  </div>
                  <div class="card-body">
                    <div>
                      <!-- <label>Catatan Dokumen</label> -->
                      <ckeditor
                        v-model="this.dokumen.catatan"
                        :editor="editor"
                      ></ckeditor>
                    </div>
                  </div>
                </div>
              </div>
              <!-- ene col -->
              <div class="col-xl-4 col-lg-4">
                <div class="card">
                  <div class="card-header">
                    <h5 class="card-title mb-0">Publish</h5>
                  </div>
                  <div class="card-body">
                    <div class="mb-3">
                      <label
                        for="choices-publish-status-input"
                        class="form-label"
                        >Status</label
                      >
                      <Multiselect
                        class="form-control"
                        v-model="this.dokumen.status"
                        :close-on-select="true"
                        :searchable="true"
                        :create-option="true"
                        :options="[
                          { value: 'Revisi', label: 'Revisi' },
                          { value: 'Diterima', label: 'Diterima' },
                          { value: 'Ditolak', label: 'Ditolak' },
                        ]"
                      />
                    </div>
                    <div class="text-end mb-3">
                      <button
                        @click="revisiDokumen()"
                        type="submit"
                        class="btn btn-success w-sm"
                      >
                        Simpan
                      </button>
                    </div>
                  </div>
                  <!-- end card body -->
                </div>
              </div>
              <!-- end col -->
            </div>
            <!-- end row -->
          </div>
          <!-- end tab pane -->

          <!-- end tab pane -->
        </div>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>
