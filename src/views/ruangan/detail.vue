<script>
import "@vueform/multiselect/themes/default.css";

import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import apiRuanganBaca from "../../apis/RuanganBaca.js";
import apiPeminjamanRuangan from "../../apis/PeminjamanRuangan.js";
import flatPickr from "vue-flatpickr-component";

import animationData from "@/components/widgets/msoeawqm.json";
import animationData1 from "@/components/widgets/gsqxdxog.json";

import Lottie from "@/components/widgets/lottie.vue";

export default {
  page: {
    title: "Contacts",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
    flatPickr,
    lottie: Lottie,
  },
  data() {
    return {
      title: "Detail Ruangan",
      items: [
        {
          text: "Home",
          href: "/",
        },
        {
          text: "Detail Ruangan",
          active: true,
        },
      ],
      defaultOptions: { animationData: animationData },
      defaultOptions1: { animationData: animationData1 },
      searchQuery: null,
      page: 1,
      perPage: 8,
      pages: [],
      value: null,
      peminjamanRuangan: [],
      RuanganBaca: {},
      date: null,
    };
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.peminjamanRuangan);
    },
    resultQuery() {
      if (this.searchQuery) {
        const search = this.searchQuery.toLowerCase();
        return this.displayedPosts.filter((data) => {
          return (
            data.contactId.toLowerCase().includes(search) ||
            data.name.toLowerCase().includes(search) ||
            data.company.toLowerCase().includes(search) ||
            data.email.toLowerCase().includes(search) ||
            data.phone.toLowerCase().includes(search) ||
            data.score.toLowerCase().includes(search)
          );
        });
      } else {
        return this.displayedPosts;
      }
    },
  },
  watch: {
    peminjamanRuangan() {
      this.setPages();
    },
  },
  created() {
    this.setPages();
    this.getRuanganBaca(this.$route.params.id);
    this.getPeminjamanRuanganByRuangan();
  },
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
  methods: {
    setPages() {
      let numberOfPages = Math.ceil(
        this.peminjamanRuangan.length / this.perPage
      );
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    getRuanganBaca(id) {
      apiRuanganBaca
        .showRuanganBaca(id)
        .then((response) => {
          this.RuanganBaca = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPeminjamanRuanganByRuangan() {
      apiPeminjamanRuangan
        .peminjamanByRuangan(this.$route.params.id, this.date)
        .then((response) => {
          this.peminjamanRuangan = response.data.data;
          this.pages = [];
          this.page = 1;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    paginate(peminjamanRuangan) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return peminjamanRuangan.slice(from, to);
    },
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <div class="d-flex align-items-center flex-wrap gap-2">
              <div class="flex-grow-1">
                <button
                  class="btn btn-info add-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#showModal"
                >
                  <i class="ri-add-fill me-1 align-bottom"></i> Add Contacts
                </button>
              </div>
              <div class="flex-shrink-0">
                <div class="hstack text-nowrap gap-2">
                  <button
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#addmembers"
                  >
                    <i class="ri-filter-2-line me-1 align-bottom"></i> Filters
                  </button>
                  <button class="btn btn-soft-info">Import</button>
                  <button
                    type="button"
                    id="dropdownMenuLink1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    class="btn btn-soft-primary"
                  >
                    <i class="ri-more-2-fill"></i>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink1">
                    <li><a class="dropdown-item" href="#">All</a></li>
                    <li><a class="dropdown-item" href="#">Last Week</a></li>
                    <li><a class="dropdown-item" href="#">Last Month</a></li>
                    <li><a class="dropdown-item" href="#">Last Year</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end col-->
      <div class="col-xxl-9">
        <div class="card" id="contactList">
          <div class="card-header">
            <div class="row g-3">
              <div class="col-md-4">
                <div class="search-box">
                  <input
                    type="text"
                    class="form-control search"
                    placeholder="Search for contact..."
                  />
                  <i class="ri-search-line search-icon"></i>
                </div>
              </div>
              <div class="col-md-auto ms-auto">
                <div class="d-flex align-items-center gap-2">
                  <flat-pickr
                    placeholder="Select date"
                    @change="getPeminjamanRuanganByRuangan()"
                    v-model="date"
                    :config="config"
                    class="form-control flatpickr-input"
                    id="demo-datepicker"
                  ></flat-pickr>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div>
              <div class="table-responsive table-card mb-3">
                <table
                  class="table align-middle table-nowrap mb-0"
                  id="customerTable"
                >
                  <thead class="table-light">
                    <tr>
                      <th class="sort" data-sort="name" scope="col">No</th>
                      <th class="sort" data-sort="company_name" scope="col">
                        Nama Peminjaman
                      </th>
                      <th class="sort" data-sort="email_id" scope="col">
                        Prodi
                      </th>
                      <th class="sort" data-sort="phone" scope="col">Role</th>
                      <th class="sort" data-sort="lead_score" scope="col">
                        Tanggal
                      </th>
                      <th class="sort" data-sort="date" scope="col">Waktu</th>
                      <!-- <th scope="col">Action</th> -->
                    </tr>
                  </thead>
                  <tbody class="list form-check-all">
                    <tr v-for="(data, index) of resultQuery" :key="index">
                      <td class="name">{{ index + 1 }}</td>
                      <td class="name">{{ data.user.name }}</td>
                      <td class="company_name">{{ data.user.prodi }}</td>
                      <td class="email_id">{{ data.user.role }}</td>
                      <td class="phone">{{ data.tanggal }}</td>
                      <td class="lead_score">
                        {{ data.waktu_awal }}-{{ data.waktu_akhir }}
                      </td>
                      <!-- <td>
                        <ul class="list-inline hstack gap-2 mb-0">
                          <li
                            class="list-inline-item edit"
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            data-bs-placement="top"
                            title="Call"
                          >
                            <a
                              href="javascript:void(0);"
                              class="text-muted d-inline-block"
                            >
                              <i class="ri-phone-line fs-16"></i>
                            </a>
                          </li>
                          <li
                            class="list-inline-item edit"
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            data-bs-placement="top"
                            title="Message"
                          >
                            <a
                              href="javascript:void(0);"
                              class="text-muted d-inline-block"
                            >
                              <i class="ri-question-answer-line fs-16"></i>
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <div class="dropdown">
                              <button
                                class="btn btn-soft-secondary btn-sm dropdown"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i class="ri-more-fill align-middle"></i>
                              </button>
                              <ul class="dropdown-menu dropdown-menu-end">
                                <li>
                                  <a
                                    class="dropdown-item"
                                    href="javascript:void(0);"
                                    ><i
                                      class="
                                        ri-eye-fill
                                        align-bottom
                                        me-2
                                        text-muted
                                      "
                                    ></i>
                                    View</a
                                  >
                                </li>
                                <li>
                                  <a
                                    class="dropdown-item edit-item-btn"
                                    href="#showModal"
                                    data-bs-toggle="modal"
                                    ><i
                                      class="
                                        ri-pencil-fill
                                        align-bottom
                                        me-2
                                        text-muted
                                      "
                                    ></i>
                                    Edit</a
                                  >
                                </li>
                                <li>
                                  <a
                                    class="dropdown-item remove-item-btn"
                                    data-bs-toggle="modal"
                                    href="#deleteRecordModal"
                                  >
                                    <i
                                      class="
                                        ri-delete-bin-fill
                                        align-bottom
                                        me-2
                                        text-muted
                                      "
                                    ></i>
                                    Delete
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </td> -->
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
                    <p class="text-muted mb-0">
                      We've searched more than 150+ Orders We did not find any
                      orders for you search.
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
                      :class="{
                        active: pageNumber == page,
                        disabled: pageNumber == '...',
                      }"
                      v-for="(pageNumber, index) in pages.slice(
                        page - 1,
                        page + 5
                      )"
                      :key="index"
                      @click="page = pageNumber"
                    >
                      <a class="page" href="#">{{ pageNumber }}</a>
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
            <div
              class="modal fade"
              id="showModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0">
                  <div class="modal-header bg-soft-info p-3">
                    <h5 class="modal-title" id="exampleModalLabel"></h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      id="close-modal"
                    ></button>
                  </div>
                  <form action="">
                    <div class="modal-body">
                      <input type="hidden" id="id-field" />
                      <div class="row g-3">
                        <div class="col-lg-12">
                          <div>
                            <label for="name-field" class="form-label"
                              >Name</label
                            >
                            <input
                              type="text"
                              id="customername-field"
                              class="form-control"
                              placeholder="Enter name"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div>
                            <label for="company_name-field" class="form-label"
                              >Company Name</label
                            >
                            <input
                              type="text"
                              id="company_name-field"
                              class="form-control"
                              placeholder="Enter company name"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div>
                            <label for="email_id-field" class="form-label"
                              >Email ID</label
                            >
                            <input
                              type="text"
                              id="email_id-field"
                              class="form-control"
                              placeholder="Enter email"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div>
                            <label for="phone-field" class="form-label"
                              >Phone</label
                            >
                            <input
                              type="text"
                              id="phone-field"
                              class="form-control"
                              placeholder="Enter phone no"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div>
                            <label for="lead_score-field" class="form-label"
                              >Lead Score</label
                            >
                            <input
                              type="text"
                              id="lead_score-field"
                              class="form-control"
                              placeholder="Enter value"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <div class="hstack gap-2 justify-content-end">
                        <button
                          type="button"
                          class="btn btn-light"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          class="btn btn-success"
                          id="add-btn"
                        >
                          Add Contact
                        </button>
                        <button
                          type="button"
                          class="btn btn-success"
                          id="edit-btn"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <!--end add modal-->

            <div
              class="modal fade zoomIn"
              id="deleteRecordModal"
              tabindex="-1"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      id="btn-close"
                    ></button>
                  </div>
                  <div class="modal-body p-5 text-center">
                    <lottie
                      class="avatar-xl"
                      colors="primary:#405189,secondary:#f06548"
                      :options="defaultOptions1"
                      :height="90"
                      :width="90"
                    />
                    <div class="mt-4 text-center">
                      <h4 class="fs-semibold">
                        You are about to delete a contact ?
                      </h4>
                      <p class="text-muted fs-14 mb-4 pt-1">
                        Deleting your contact will remove all of your
                        information from our database.
                      </p>
                      <div class="hstack gap-2 justify-content-center remove">
                        <button
                          class="
                            btn btn-link
                            link-success
                            fw-medium
                            text-decoration-none
                          "
                          data-bs-dismiss="modal"
                        >
                          <i class="ri-close-line me-1 align-middle"></i> Close
                        </button>
                        <button class="btn btn-danger" id="delete-record">
                          Yes, Delete It!!
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--end delete modal -->
          </div>
        </div>
        <!--end card-->
      </div>
      <!--end col-->
      <div class="col-xxl-3">
        <div class="card">
          <div class="card-body text-center">
            <div class="position-relative d-inline-block">
              <img
                src="@/assets/images/meeting.png"
                alt=""
                class="avatar-lg rounded-circle img-thumbnail"
              />
              <span
                class="
                  contact-active
                  position-absolute
                  rounded-circle
                  bg-success
                "
                ><span class="visually-hidden"></span
              ></span>
            </div>
            <h3 class="mt-4 mb-5">{{ RuanganBaca.nama_ruangan }}</h3>
            <!-- <p class="text-muted">Nama Ruangan</p> -->

            <!-- <ul class="list-inline mb-0">
              <li class="list-inline-item avatar-xs">
                <a
                  href="javascript:void(0);"
                  class="avatar-title bg-soft-success text-success fs-15 rounded"
                >
                  <i class="ri-phone-line"></i>
                </a>
              </li>
              <li class="list-inline-item avatar-xs">
                <a
                  href="javascript:void(0);"
                  class="avatar-title bg-soft-danger text-danger fs-15 rounded"
                >
                  <i class="ri-mail-line"></i>
                </a>
              </li>
              <li class="list-inline-item avatar-xs">
                <a
                  href="javascript:void(0);"
                  class="avatar-title bg-soft-warning text-warning fs-15 rounded"
                >
                  <i class="ri-question-answer-line"></i>
                </a>
              </li>
            </ul> -->
          </div>
          <div class="card-body">
            <h6 class="text-uppercase fw-semibold mb-3">Deskripsi</h6>
            <p class="text-muted mb-4">
              {{ RuanganBaca.deskripsi }}
            </p>
            <div class="table-responsive table-card">
              <table class="table table-borderless mb-0">
                <tbody>
                  <tr>
                    <td class="fw-semibold" scope="row">Lokasi Ruangan</td>
                    <td>
                      <span class="badge badge-soft-primary">{{
                        RuanganBaca.lokasi
                      }}</span>
                    </td>
                  </tr>
                  <tr class="pb-5 mb-5">
                    <td class="pb-5 mb-5 fw-semibold" scope="row">
                      Jumlah Maksimal Orang
                    </td>
                    <td>{{ RuanganBaca.jumlah_orang }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!--end card-->
      </div>
      <!--end col-->
    </div>
    <!--end row-->
  </Layout>
</template>
