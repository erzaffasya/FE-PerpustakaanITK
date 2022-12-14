<script>
import "@vueform/multiselect/themes/default.css";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import Layout from "../../layouts/main.vue";
import appConfig from "../../../app.config";
import PageHeader from "@/components/page-header";
import apiPembimbing from "../../apis/DosenPembimbing.js";
import animationData from "@/components/widgets/msoeawqm.json";
import Lottie from "@/components/widgets/lottie.vue";

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
  data() {
    return {
      title: " Bimbingan",
      items: [
        {
          text: "Bimbingan",
          href: "/",
        },
        {
          text: "Lihat Bimbingan",
          active: true,
        },
      ],
      page: 1,
      perPage: 8,
      pages: [],
      value: null,
      value1: null,
      searchQuery: null,
      config: {
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: "M j, Y",
        altInput: true,
        dateFormat: "Y-m-d",
      },
      date: null,
      date2: null,
      defaultOptions: { animationData: animationData },
      Pembimbing: [],
    };
  },
  components: {
    Layout,
    PageHeader,
    lottie: Lottie,
    flatPickr,
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.Pembimbing);
    },
    resultQuery() {
      console.log(this.searchQuery);
      if (this.searchQuery) {
        const search = this.searchQuery.toLowerCase();
        return this.displayedPosts.filter((data) => {
          return (
            data.dokumen.judul &&
            data.dokumen.judul.toLowerCase().includes(search)
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
    this.getPembimbing();
  },
  mounted() {},
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
  methods: {
    getPembimbing() {
      apiPembimbing.lihatPembimbing().then((response) => {
        this.Pembimbing = response.data.data;
        console.log(this.Pembimbing, "asdas");
        this.pages = [];
        this.page = 1;
        this.setPages();
      });
    },
    onChangeTanggal() {
      console.log('test')
      apiPembimbing
        .filterTanggalPembimbing({
          tanggal_awal: this.date,
          tanggal_akhir: this.date2,
        })
        .then((response) => {
          this.Pembimbing = response.data.data;
          this.pages = [];
          this.page = 1;
          this.setPages();
        });
    },
    setPages() {
      let numberOfPages = Math.ceil(this.Pembimbing.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(Pembimbing) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return Pembimbing.slice(from, to);
    },
    SearchData() {
      this.resultQuery;
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
                        Total Bimbingan
                      </p>
                    </div>
                  </div>
                  <div
                    class="d-flex align-items-end justify-content-between mt-4"
                  >
                    <div>
                      <h4 class="fs-22 fw-semibold ff-secondary mb-4">
                        {{ this.Pembimbing.length }}
                      </h4>
                    </div>
                    <div class="avatar-sm flex-shrink-0">
                      <span class="avatar-title bg-soft-primary rounded fs-3">
                        <i class="bx bx-male text-primary"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <!-- end card body -->
              </div>
              <!-- end card -->
            </div>
            <ul class="nav nav-tabs nav-justified mb-3" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  data-bs-toggle="tab"
                  href="#nav-badge-home"
                  role="tab"
                  aria-selected="false"
                >
                  Data Bimbingan
                </a>
              </li>
            </ul>
            <!-- Nav tabs -->

            <div class="tab-content text-muted">
              <div class="tab-pane active" id="nav-badge-home" role="tabpanel">
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
                            <div class="row g-3">
                              <div class="col-xxl-5 col-sm-6">
                                <div class="search-box">
                                  <input
                                    v-model="this.searchQuery"
                                    type="text"
                                    class="form-control search"
                                    placeholder="Cari Data..."
                                  />
                                  <i class="ri-search-line search-icon"></i>
                                </div>
                              </div>
                              <!--end col-->
                              <div class="col-xxl-2 col-sm-6">
                                <div>
                                  <flat-pickr
                                    placeholder="Select date"
                                    v-model="date"
                                    :config="config"
                                    @change="onChangeTanggal()"
                                    class="form-control flatpickr-input"
                                    id="demo-datepicker"
                                  ></flat-pickr>
                                </div>
                              </div>

                              <div class="col-xxl-2 col-sm-6">
                                <div>
                                  <flat-pickr
                                    placeholder="Select date"
                                    v-model="date2"
                                    :config="config"
                                    @change="onChangeTanggal()"
                                    class="form-control flatpickr-input"
                                    id="demo-datepicker"
                                  ></flat-pickr>
                                </div>
                              </div>
                            </div>
                            <!--end row-->
                          </form>
                        </div>
                        <div class="card-body pt-4">
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
                                      Judul
                                    </th>
                                    <th class="sort" data-sort="status">
                                      Kategori
                                    </th>
                                    <th class="sort" data-sort="status">
                                      Nama Pengarang
                                    </th>
                                    <th class="sort" data-sort="status">
                                      Aksi
                                    </th>
                                  </tr>
                                </thead>
                                <tbody class="list form-check-all">
                                  <tr
                                    v-for="(data, index) of resultQuery"
                                    :key="index"
                                  >
                                    <th scope="row">
                                      {{ index + 1 }}
                                    </th>
                                    <td class="id">
                                      <router-link
                                        to="/ecommerce/order-details"
                                        class="fw-medium link-primary"
                                        >{{ data.orderId }}
                                      </router-link>
                                    </td>
                                    <td class="customer_name">
                                      {{ data.dokumen.judul }}
                                    </td>
                                    <td class="product_name">
                                      {{ data.dokumen.kategori }}
                                    </td>
                                    <td class="amount">
                                      {{ data.dokumen.nama_pengarang }}
                                    </td>
                                    <td>
                                      <ul class="list-inline hstack gap-2 mb-0">
                                        <li
                                          class="list-inline-item"
                                          data-bs-toggle="tooltip"
                                          data-bs-trigger="hover"
                                          data-bs-placement="top"
                                          title="View"
                                        >
                                          <router-link
                                            :to="{
                                              name: 'detail-dokumen',
                                              params: { id: data.dokumen.id },
                                            }"
                                            class="text-primary d-inline-block"
                                          >
                                            <i class="ri-eye-fill fs-16"></i>
                                          </router-link>
                                        </li>
                                        <!-- <li
                                          class="list-inline-item edit"
                                          data-bs-toggle="tooltip"
                                          data-bs-trigger="hover"
                                          data-bs-placement="top"
                                          title="Edit"
                                        >
                                          <router-link
                                            :to="{
                                              name: 'tambah-dokumen',
                                              params: { id: data.dokumen.id },
                                            }"
                                            class="text-primary d-inline-block"
                                          >
                                            <i class="ri-pencil-fill fs-16"></i>
                                          </router-link>
                                        </li> -->
                                        <!-- <li
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
                                            data-bs-toggle="modal"
                                            data-bs-target="#deleteOrder"
                                          >
                                            <i
                                              class="ri-delete-bin-5-fill fs-16"
                                            ></i>
                                          </a>
                                        </li> -->
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
                                    v-for="(pageNumber, index) in pages.slice(
                                      page - 1,
                                      page + 5
                                    )"
                                    :key="index"
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