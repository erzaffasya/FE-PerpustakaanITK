<script>
import "@vueform/multiselect/themes/default.css";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import Layout from "../../layouts/main.vue";
import appConfig from "../../../app.config";
import PageHeader from "@/components/page-header";
import apiPengunjung from "../../apis/Pengunjung.js";
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
      title: "Pengunjung",
      items: [
        {
          text: "Pengunjung",
          href: "/",
        },
        {
          text: "Lihat Pengunjung",
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
      Pengunjung: [],
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
      return this.paginate(this.Pengunjung);
    },
    resultQuery() {
      console.log(this.searchQuery);
      if (this.searchQuery) {
        const search = this.searchQuery.toLowerCase();
        return this.displayedPosts.filter((data) => {
          return (
            (data.user.name && data.user.name.toLowerCase().includes(search)) ||
            (data.created_at && data.created_at.toLowerCase().includes(search))
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
    this.getPengunjung();
  },
  mounted() {},
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
  methods: {
    getPengunjung() {
      apiPengunjung.lihatPengunjung().then((response) => {
        this.Pengunjung = response.data.data;
        this.pages = [];
        this.page = 1;
        this.setPages();
      });
    },
    onChangeTanggal() {
      apiPengunjung
        .filterTanggalPengunjung({
          tanggal_awal: this.date,
          tanggal_akhir: this.date2,
        })
        .then((response) => {
          this.Pengunjung = response.data.data;
          this.pages = [];
          this.page = 1;
          this.setPages();
        });
    },
    setPages() {
      let numberOfPages = Math.ceil(this.Pengunjung.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(Pengunjung) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return Pengunjung.slice(from, to);
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
                        class="text-uppercase fw-semibold text-muted text-truncate mb-0"
                      >
                        Total Pengunjung
                      </p>
                    </div>
                  </div>
                  <div
                    class="d-flex align-items-end justify-content-between mt-4"
                  >
                    <div>
                      <h4 class="fs-22 fw-semibold ff-secondary mb-4">
                       {{this.Pengunjung.length}}
                      </h4>
                    </div>
                    <div class="avatar-sm flex-shrink-0">
                      <span class="avatar-title bg-soft-primary rounded fs-3">
                        <i class=" bx bx-male text-primary"></i>
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
                  Data Kunjungan
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
                                      Nama
                                    </th>
                                    <th class="sort" data-sort="status">
                                      Tanggal {{ date }}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody class="list form-check-all">
                                  <tr
                                    v-for="(data, index) of resultQuery"
                                    :key="index"
                                  >
                                    <th scope="row"></th>
                                    <td class="id">{{ index + 1 }}</td>
                                    <td class="customer_name">
                                      {{ data.user.name }}
                                    </td>

                                    <td class="amount">
                                      {{ data.created_at }}
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