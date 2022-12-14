<script>
import Swal from "sweetalert2";
import "@vueform/multiselect/themes/default.css";
// import "flatpickr/dist/flatpickr.css";
// import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
// import flatPickr from "vue-flatpickr-component";
// import "flatpickr/dist/flatpickr.css";

import Layout from "../../layouts/main.vue";
import appConfig from "../../../app.config";
import PageHeader from "@/components/page-header";
import apiYudisiumMahasiswa from "../../apis/YudisiumMahasiswa.js";
import animationData from "@/components/widgets/msoeawqm.json";
import Lottie from "@/components/widgets/lottie.vue";
import YudisiumMahasiswa from "../../apis/YudisiumMahasiswa.js";

export default {
  page: {
    title: "Orders",
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
      // title: "Orders",
      // items: [
      //   {
      //     text: "Ecommerce",
      //     href: "/",
      //   },
      //   {
      //     text: "Orders",
      //     active: true,
      //   },
      // ],
      page: 1,
      perPage: 8,
      pages: [],
      value: null,
      searchQuery: null,

      defaultOptions: {
        animationData: animationData,
      },
      YudisiumMahasiswa: [],
      date: null,
      chartOptions: {
        chart: {
          type: "area",
          height: 50,
          sparkline: {
            enabled: true,
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [20, 100, 100, 100],
          },
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
        colors: ["#f44336"],
        tooltip: {
          fixed: {
            enabled: false,
          },
          x: {
            show: false,
          },
          y: {
            title: {
              formatter: function () {
                return "";
              },
            },
          },
          marker: {
            show: false,
          },
        },
      },
    };
  },
  components: {
    Layout,
    PageHeader,
    lottie: Lottie,
    // Multiselect,
    // flatPickr,
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.YudisiumMahasiswa);
    },
    resultQuery() {
      console.log(this.searchQuery);
      if (this.searchQuery) {
        const search = this.searchQuery.toLowerCase();
        return this.displayedPosts.filter((data) => {
          return (
            (data.user.name && data.user.name.toLowerCase().includes(search)) ||
            (data.user.nim && data.user.nim.toLowerCase().includes(search))
          );
        });
      } else {
        return this.displayedPosts;
      }
    },
  },
  watch: {
    posts() {
      this.setPages();
    },
    resultQuery(newValue) {
      return newValue;
    },
  },
  created() {
    this.getBerlangsung();
  },
  mounted() {
    this.setPages();
  },
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
  methods: {
    getRiwayat() {
      this.YudisiumMahasiswa = [];
      apiYudisiumMahasiswa
        .filterYudisiumMahasiswa("riwayatPengajuan")
        .then((response) => {
          this.YudisiumMahasiswa = response.data.data;
          this.pages = [];
          this.page = 1;
          this.setPages();
        });
    },
    getBerlangsung() {
      this.YudisiumMahasiswa = [];
      apiYudisiumMahasiswa
        .filterYudisiumMahasiswa("pengajuan")
        .then((response) => {
          this.YudisiumMahasiswa = response.data.data;
          console.log(YudisiumMahasiswa);
          this.pages = [];
          this.page = 1;
          this.setPages();
        });
    },
    setPages() {
      let numberOfPages = Math.ceil(
        this.YudisiumMahasiswa.length / this.perPage
      );
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(YudisiumMahasiswa) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return YudisiumMahasiswa.slice(from, to);
    },
    SearchData() {
      this.resultQuery;
      // var isstatus = document.getElementById("idStatus").value;
      //   var payment = document.getElementById("idPayment").value;
    },
    confirm(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          apiYudisiumMahasiswa.hapusYudisiumMahasiswa(id).then(() => {
            this.getBerlangsung();
          });
          Swal.fire(
            "Berhasil!",
            "Data Pengajuan Yudisium Berhasil Dihapus.",
            "success"
          );
        }
      });
    },
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <!--end col-->
      <div class="col-xxl-12">
        <div class="card">
          <div class="card-body">
            <!-- <p class="text-muted">Example of nav tabs with badge wrapped in nav item.</p> -->
            <!-- Nav tabs -->
            <ul class="nav nav-tabs nav-justified mb-3" role="tablist">
              <li class="nav-item">
                <a
                  @click="getBerlangsung()"
                  class="nav-link active"
                  data-bs-toggle="tab"
                  href="#dataBerlangsung"
                  role="tab"
                  aria-selected="false"
                >
                  Pengajuan
                </a>
              </li>
              <li class="nav-item">
                <a
                  @click="getRiwayat()"
                  class="nav-link"
                  data-bs-toggle="tab"
                  href="#dataRiwayat"
                  role="tab"
                  aria-selected="false"
                >
                  Riwayat Pengajuan
                </a>
              </li>
            </ul>
            <!-- Nav tabs -->
            <div class="tab-content text-muted">
              <div class="tab-pane active" id="dataBerlangsung" role="tabpanel">
                <div class="">
                  <div class="flex-grow-1 ms-2">
                    <div class="col-lg-12">
                      <div class="card" id="orderList">
                        <div
                          class="
                            card-body
                            border border-dashed border-end-0 border-start-0
                          "
                        >
                          <form>
                            <div class="d-flex row g-3">
                              <div class="col-xxl-5 me-auto mr-auto col-sm-6">
                                <div class="search-box">
                                  <input
                                    v-model="this.searchQuery"
                                    type="text"
                                    class="form-control search"
                                    placeholder="Search"
                                  />
                                  <i class="ri-search-line search-icon"></i>
                                </div>
                              </div>
                            </div>
                            <!--end row-->
                          </form>
                        </div>
                        <div class="card-body pt-2">
                          <div>
                            <div class="table-responsive table-card mb-1">
                              <table
                                class="table table-nowrap align-middle"
                                id="orderTable"
                              >
                                <thead class="text-muted table-light">
                                  <tr class="text-uppercase">
                                    <th scope="col" style="width: 25px"></th>
                                    <th class="sort" data-sort="id">No</th>
                                    <th class="sort" data-sort="customer_name">
                                      Nama
                                    </th>
                                    <th class="sort" data-sort="product_name">
                                      NIM
                                    </th>
                                    <th class="sort" data-sort="product_name">
                                      Jurusan
                                    </th>
                                    <th class="sort" data-sort="product_name">
                                      Prodi
                                    </th>
                                    <th class="sort" data-sort="product_name">
                                      Angkatan
                                    </th>
                                    <th class="sort" data-sort="product_name">
                                      Status Berkas
                                    </th>
                                    <th class="sort" data-sort="product_name">
                                      Status Peminjaman
                                    </th>
                                    <th class="sort" data-sort="product_name">
                                      Status Final
                                    </th>
                                    <th class="sort" data-sort="city">
                                      Action
                                    </th>
                                  </tr>
                                </thead>
                                <tbody class="list form-check-all">
                                  <tr
                                    v-for="(data, index1) of resultQuery"
                                    :key="index1"
                                  >
                                    <th scope="row"></th>
                                    <td class="customer_name">
                                      {{ index1 + 1 }}
                                    </td>
                                    <td class="customer_name">
                                      {{ data.user.name }}
                                    </td>
                                    <td class="product_name">
                                      {{ data.user.nim }}
                                    </td>
                                    <td class="product_name">
                                      {{ data.user.jurusan }}
                                    </td>
                                    <td class="product_name">
                                      {{ data.user.prodi }}
                                    </td>
                                    <td class="product_name">
                                      {{ data.user.angkatan }}
                                    </td>
                                    <td class="product_name">
                                      <span
                                        v-if="data.status_berkas"
                                        class="
                                          badge badge-soft-success
                                          text-uppercase
                                        "
                                        >Terpenuhi</span
                                      >
                                      <span
                                        v-else
                                        class="
                                          badge badge-soft-danger
                                          text-uppercase
                                        "
                                        >Tidak Terpenuhi</span
                                      >
                                    </td>
                                    <td class="product_name">
                                      <span
                                        v-if="data.status_pinjam"
                                        class="
                                          badge badge-soft-success
                                          text-uppercase
                                        "
                                        >Terpenuhi</span
                                      >
                                      <span
                                        v-else
                                        class="
                                          badge badge-soft-danger
                                          text-uppercase
                                        "
                                        >Tidak Terpenuhi</span
                                      >
                                    </td>
                                    <td class="product_name">
                                      <span
                                        v-if="data.status_final"
                                        class="
                                          badge badge-soft-success
                                          text-uppercase
                                        "
                                        >Terpenuhi</span
                                      >
                                      <span
                                        v-else
                                        class="
                                          badge badge-soft-danger
                                          text-uppercase
                                        "
                                        >Tidak Terpenuhi</span
                                      >
                                    </td>
                                    <td>
                                      <ul class="list-inline hstack gap-2 mb-0">
                                        <!-- <li class="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover"
                                          data-bs-placement="top" title="View">
                                          <router-link to="/ecommerce/order-ruangans"
                                            class="text-primary d-inline-block">
                                            <i class="ri-eye-fill fs-16"></i>
                                          </router-link>
                                        </li> -->
                                        <li
                                          v-if="role == 'Admin'"
                                          class="list-inline-item edit"
                                          data-bs-toggle="tooltip"
                                          data-bs-trigger="hover"
                                          data-bs-placement="top"
                                          title="Edit"
                                        >
                                          <router-link
                                            :to="{
                                              name: 'edit-yudisium-mahasiswa',
                                              params: { id: data.id },
                                            }"
                                            class="
                                              text-primary
                                              d-inline-block
                                              edit-item-btn
                                            "
                                          >
                                            <i class="ri-pencil-fill fs-16"></i>
                                          </router-link>
                                        </li>
                                        <li
                                          v-if="
                                            role == 'Admin' ||
                                            role == 'Mahasiswa'
                                          "
                                          class="list-inline-item"
                                          data-bs-toggle="tooltip"
                                          data-bs-trigger="hover"
                                          data-bs-placement="top"
                                          title="Remove"
                                        >
                                          <a
                                            class="
                                              text-danger
                                              d-inline-block
                                              remove-item-btn
                                            "
                                            @click="confirm(data.id)"
                                            data-bs-toggle="modal"
                                            data-bs-target="#deleteOrder"
                                          >
                                            <i
                                              class="ri-delete-bin-5-fill fs-16"
                                            ></i>
                                          </a>
                                        </li>
                                      </ul>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div class="noresult" style="display: none">
                                <div class="text-center">
                                  <lottie
                                    class="avatar-xl"
                                    colors="primary:#121331,secondary:#08a88a"
                                    :options="defaultOptions"
                                    :height="75"
                                    :width="75"
                                  />
                                  <h5 class="mt-2">Sorry! No Result Found</h5>
                                  <p class="text-muted">
                                    We've searched more than 150+ Orders We did
                                    not find any orders for you search.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="d-flex justify-content-end mt-3">
                              <div class="pagination-wrap hstack gap-2">
                                <a
                                  class="page-item pagination-prev disabled"
                                  href="#"
                                  v-if="page != 1"
                                  @click="page--"
                                >
                                  Previous
                                </a>
                                <ul class="pagination listjs-pagination mb-0">
                                  <li
                                    v-for="(pageNumber, index1) in pages.slice(
                                      page - 1,
                                      page + 5
                                    )"
                                    :key="index1"
                                    @click="page = pageNumber"
                                    :class="{
                                      active: pageNumber == page,
                                      disabled: pageNumber == '...',
                                    }"
                                  >
                                    <a class="page" href="#">{{
                                      pageNumber
                                    }}</a>
                                  </li>
                                </ul>
                                <a
                                  class="page-item pagination-next"
                                  href="#"
                                  @click="page++"
                                  v-if="page < pages.length"
                                >
                                  Next
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane" id="dataRiwayat" role="tabpanel">
                <div class="">
                  <div class="flex-grow-1 ms-2">
                    <div class="col-lg-12">
                      <div class="card" id="orderList">
                        <div
                          class="
                            card-body
                            border border-dashed border-end-0 border-start-0
                          "
                        >
                          <form>
                            <div class="d-flex row g-3">
                              <div class="col-xxl-5 me-auto mr-auto col-sm-6">
                                <div class="search-box">
                                  <input
                                    v-model="this.searchQuery"
                                    type="text"
                                    class="form-control search"
                                    placeholder="Search"
                                  />
                                  <i class="ri-search-line search-icon"></i>
                                </div>
                              </div>
                            </div>
                            <!--end row-->
                          </form>
                        </div>
                        <div class="card-body pt-2">
                          <div>
                            <div class="table-responsive table-card mb-1">
                              <table
                                class="table table-nowrap align-middle"
                                id="orderTable"
                              >
                                <thead class="text-muted table-light">
                                  <tr class="text-uppercase">
                                    <th scope="col" style="width: 25px"></th>
                                    <th class="sort" data-sort="id">No</th>
                                    <th class="sort" data-sort="customer_name">
                                      Nama
                                    </th>
                                    <th class="sort" data-sort="product_name">
                                      NIM
                                    </th>
                                    <th class="sort" data-sort="product_name">
                                      Jurusan
                                    </th>
                                    <th class="sort" data-sort="product_name">
                                      Prodi
                                    </th>
                                    <th class="sort" data-sort="product_name">
                                      Angkatan
                                    </th>
                                    <th class="sort" data-sort="product_name">
                                      Status Berkas
                                    </th>
                                    <th class="sort" data-sort="product_name">
                                      Status Peminjaman
                                    </th>
                                    <th class="sort" data-sort="product_name">
                                      Status Final
                                    </th>
                                    <th class="sort" data-sort="city">
                                      Action
                                    </th>
                                  </tr>
                                </thead>
                                <tbody class="list form-check-all">
                                  <tr
                                    v-for="(data, index1) of resultQuery"
                                    :key="index1"
                                  >
                                    <th scope="row"></th>
                                    <td class="customer_name">
                                      {{ index1 + 1 }}
                                    </td>
                                    <td class="customer_name">
                                      {{ data.user.name }}
                                    </td>
                                    <td class="product_name">
                                      {{ data.user.nim }}
                                    </td>
                                    <td class="product_name">
                                      {{ data.user.jurusan }}
                                    </td>
                                    <td class="product_name">
                                      {{ data.user.prodi }}
                                    </td>
                                    <td class="product_name">
                                      {{ data.user.angkatan }}
                                    </td>
                                    <td class="product_name">
                                      <span
                                        v-if="data.status_berkas"
                                        class="
                                          badge badge-soft-success
                                          text-uppercase
                                        "
                                        >Terpenuhi</span
                                      >
                                      <span
                                        v-else
                                        class="
                                          badge badge-soft-danger
                                          text-uppercase
                                        "
                                        >Tidak Terpenuhi</span
                                      >
                                    </td>
                                    <td class="product_name">
                                      <span
                                        v-if="data.status_pinjam"
                                        class="
                                          badge badge-soft-success
                                          text-uppercase
                                        "
                                        >Terpenuhi</span
                                      >
                                      <span
                                        v-else
                                        class="
                                          badge badge-soft-danger
                                          text-uppercase
                                        "
                                        >Tidak Terpenuhi</span
                                      >
                                    </td>
                                    <td class="product_name">
                                      <span
                                        v-if="data.status_final"
                                        class="
                                          badge badge-soft-success
                                          text-uppercase
                                        "
                                        >Terpenuhi</span
                                      >
                                      <span
                                        v-else
                                        class="
                                          badge badge-soft-danger
                                          text-uppercase
                                        "
                                        >Tidak Terpenuhi</span
                                      >
                                    </td>
                                    <td>
                                      <ul class="list-inline hstack gap-2 mb-0">
                                        <!-- <li class="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover"
                                          data-bs-placement="top" title="View">
                                          <router-link to="/ecommerce/order-ruangans"
                                            class="text-primary d-inline-block">
                                            <i class="ri-eye-fill fs-16"></i>
                                          </router-link>
                                        </li> -->
                                        <li
                                          v-if="role == 'Admin'"
                                          class="list-inline-item edit"
                                          data-bs-toggle="tooltip"
                                          data-bs-trigger="hover"
                                          data-bs-placement="top"
                                          title="Edit"
                                        >
                                          <router-link
                                            :to="{
                                              name: 'edit-yudisium-mahasiswa',
                                              params: { id: data.id },
                                            }"
                                            class="
                                              text-primary
                                              d-inline-block
                                              edit-item-btn
                                            "
                                          >
                                            <i class="ri-pencil-fill fs-16"></i>
                                          </router-link>
                                        </li>
                                        <li
                                          v-if="role == 'Admin' || 'Mahasiswa'"
                                          class="list-inline-item"
                                          data-bs-toggle="tooltip"
                                          data-bs-trigger="hover"
                                          data-bs-placement="top"
                                          title="Remove"
                                        >
                                          <a
                                            class="
                                              text-danger
                                              d-inline-block
                                              remove-item-btn
                                            "
                                            @click="confirm(data.id)"
                                            data-bs-toggle="modal"
                                            data-bs-target="#deleteOrder"
                                          >
                                            <i
                                              class="ri-delete-bin-5-fill fs-16"
                                            ></i>
                                          </a>
                                        </li>
                                      </ul>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div class="noresult" style="display: none">
                                <div class="text-center">
                                  <lottie
                                    class="avatar-xl"
                                    colors="primary:#121331,secondary:#08a88a"
                                    :options="defaultOptions"
                                    :height="75"
                                    :width="75"
                                  />
                                  <h5 class="mt-2">Sorry! No Result Found</h5>
                                  <p class="text-muted">
                                    We've searched more than 150+ Orders We did
                                    not find any orders for you search.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="d-flex justify-content-end mt-3">
                              <div class="pagination-wrap hstack gap-2">
                                <a
                                  class="page-item pagination-prev disabled"
                                  href="#"
                                  v-if="page != 1"
                                  @click="page--"
                                >
                                  Previous
                                </a>
                                <ul class="pagination listjs-pagination mb-0">
                                  <li
                                    v-for="(pageNumber, index1) in pages.slice(
                                      page - 1,
                                      page + 5
                                    )"
                                    :key="index1"
                                    @click="page = pageNumber"
                                    :class="{
                                      active: pageNumber == page,
                                      disabled: pageNumber == '...',
                                    }"
                                  >
                                    <a class="page" href="#">{{
                                      pageNumber
                                    }}</a>
                                  </li>
                                </ul>
                                <a
                                  class="page-item pagination-next"
                                  href="#"
                                  @click="page++"
                                  v-if="page < pages.length"
                                >
                                  Next
                                </a>
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
          </div>
          <!-- end card-body -->
        </div>
        <!--end card-->
      </div>
      <!--end col-->
    </div>
  </Layout>
</template>
