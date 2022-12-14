<script>
import { MoreHorizontalIcon } from "@zhuowenli/vue-feather-icons";
import "@vueform/multiselect/themes/default.css";
import ApiBookmark from "../../apis/Bookmark.js";
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import Swal from "sweetalert2";
export default {
  page: {
    title: "Bookmark",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.Bookmark);
    },
    resultQuery() {
      if (this.searchQuery) {
        const search = this.searchQuery.toLowerCase();
        return this.displayedPosts.filter((data) => {
          return (
            (data.dokumen.judul && data.dokumen.judul.toLowerCase().includes(search))
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
    this.getBookmark();
  },
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
  methods: {
    onChangeStatus(e) {
      this.isStatus = e;
    },
    onChangePayment(e) {
      this.isPayment = e;
    },
    setPages() {
      let numberOfPages = Math.ceil(this.Bookmark.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(Bookmark) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return Bookmark.slice(from, to);
    },
    SearchData() {
      this.resultQuery;
      // var isstatus = document.getElementById("idStatus").value;
      //   var payment = document.getElementById("idPayment").value;
    },
    toggleFavourite(ele) {
      console.log("sukses", ele);
      this.editBookmark(ele);
      ele.target?.closest(".favourite-btn").classList.toggle("active");
    },
    getBookmark() {
      ApiBookmark.lihatBookmark().then((response) => {
        this.Bookmark = response.data.data;
        this.pages = [];
        this.page = 1;
        this.setPages();
      });
    },
    editBookmark(id) {
      ApiBookmark.editBookmark(id).then((response) => {
        Swal.fire("Berhasil", response.data.data.message, "success");
      });
    },
  },
  data() {
    return {
      title: "Bookmark",
      items: [
        {
          text: "Bookmark",
          href: "/",
        },
        {
          text: "Lihat Bookmark",
          active: true,
        },
      ],
      Bookmark: [],
      value: null,
      page: 1,
      perPage: 12,
      pages: [],
      value1: null,
      searchQuery: null,
      statusTable: null,
      isPagination: false,
    };
  },
  components: {
    Layout,
    PageHeader,
    MoreHorizontalIcon,
  },
  mounted() {
    this.setPages();
    this.getBookmark();
  },
};
</script>

  <template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row g-4 mb-3">
      <div class="col-sm-auto">
        <!-- <div>
          <router-link to="/apps/projects-create" class="btn btn-success"><i class="ri-add-line align-bottom me-1"></i>
            Add New</router-link>
        </div> -->
      </div>
      <div class="col-sm">
        <div class="d-flex justify-content-sm-end gap-2">
          <div class="search-box ms-2">
            <input v-model="this.searchQuery" type="text" class="form-control" placeholder="Search..." />
            <i class="ri-search-line search-icon"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div
        class="col-xxl-3 col-sm-6 project-card"
        v-for="(item, index) of resultQuery"
        :key="index"
      >
        <div class="card card-height-100">
          <div class="card-body">
            <div class="d-flex flex-column h-100">
              <div class="d-flex">
                <div class="flex-grow-1">
                  <p class="text-muted mb-4">{{ item.tanggal_dibuat }}</p>
                </div>
                <div class="flex-shrink-0">
                  <div class="hstack gap-1 flex-wrap">
                    <button
                      type="button"
                      class="btn py-0 fs-16 favourite-btn active"
                      :class="{ active: item.isBookmark }"
                      @click="toggleFavourite(item.dokumen.id)"
                    >
                      <span class="avatar-title bg-transparent fs-15">
                        <i class="ri-star-fill" @click="toggleFavourite"></i>
                      </span>
                    </button>
                    <div class="dropdown">
                      <button
                        class="
                          btn btn-link
                          text-muted
                          p-1
                          mt-n2
                          py-0
                          text-decoration-none
                          fs-16
                        "
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                      >
                        <MoreHorizontalIcon
                          class="icon-sm"
                        ></MoreHorizontalIcon>
                      </button>

                      <div class="dropdown-menu dropdown-menu-end">
                        <router-link
                          class="dropdown-item"
                          to="/apps/projects-overview"
                          ><i
                            class="ri-eye-fill align-bottom me-2 text-muted"
                          ></i>
                          View</router-link
                        >
                        <router-link
                          class="dropdown-item"
                          to="/apps/projects-create"
                          ><i
                            class="ri-pencil-fill align-bottom me-2 text-muted"
                          ></i>
                          Edit</router-link
                        >
                        <div class="dropdown-divider"></div>
                        <a
                          class="dropdown-item"
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#removeProjectModal"
                          ><i
                            class="
                              ri-delete-bin-fill
                              align-bottom
                              me-2
                              text-muted
                            "
                          ></i>
                          Remove</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex mb-2">
                <div class="flex-shrink-0 me-3">
                  <div class="avatar-sm">
                    <span class="avatar-title bg-soft-warning rounded p-2">
                      <img :src="item.gambar_dokumen" alt="" class="img-fluid p-1" />
                    </span>
                  </div>
                </div>
                <div class="flex-grow-1">
                  <h5 class="mb-1 fs-15">
                    <router-link
                      :to="{
                        name: 'detail-dokumen',
                        params: { id: item.dokumen.id },
                      }"
                      class="text-dark"
                      >{{ item.dokumen.judul }}</router-link
                    >
                  </h5>
                  <p class="text-muted text-truncate-two-lines mb-3">
                    {{ item.kategori_id }}
                  </p>
                </div>
              </div>
              <div class="mt-auto">
                <div class="d-flex mb-2">
                  <div class="flex-grow-1">
                    <div>{{item.dokumen.kategori.nama_kategori}}</div>
                  </div>
                  <div class="flex-shrink-0">
                    <div>
                      <i class="ri-list-check align-bottom me-1 text-muted"></i>
                      {{ item.dokumen.nama_pengarang }}
                    </div>
                  </div>
                </div>
                <div class="progress progress-sm animated-progess">
                  <div
                    class="progress-bar bg-primary"
                    role="progressbar"
                    aria-valuenow="34"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    :style="`width: ${item.progressBar};`"
                  ></div>
                  <!-- /.progress-bar -->
                </div>
                <!-- /.progress -->
              </div>
            </div>
          </div>
          <!-- end card body -->
          <div class="card-footer bg-transparent border-top-dashed py-2">
            <div class="d-flex align-items-center">
              <div class="flex-grow-1">
                <div class="avatar-group">
                  <a
                    href="javascript: void(0);"
                    v-for="(subitem, index) of item.subItem"
                    :key="index"
                    class="avatar-group-item"
                    data-bs-toggle="tooltip"
                    data-bs-trigger="hover"
                    data-bs-placement="top"
                    title="Darline Williams"
                  >
                    <div class="avatar-xxs" v-if="!subitem.imgNumber">
                      <img
                        :src="subitem.imgFooter"
                        alt=""
                        class="rounded-circle img-fluid"
                      />
                    </div>
                    <div class="avatar-xxs" v-if="!subitem.imgFooter">
                      <div
                        class="
                          avatar-title
                          fs-16
                          rounded-circle
                          bg-light
                          border-dashed border
                          text-primary
                        "
                      >
                        {{ subitem.imgNumber }}
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div class="flex-shrink-0">
                <div class="text-muted">
                  <i class="ri-calendar-event-fill me-1 align-bottom"></i>
                  {{ item.date }}
                </div>
              </div>
            </div>
          </div>
          <!-- end card footer -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->

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
            v-for="(pageNumber, index) in pages.slice(page - 1, page + 5)"
            :key="index"
            @click="page = pageNumber"
            :class="{
              active: pageNumber == page,
              disabled: pageNumber == '...',
            }"
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
    <!-- end row -->
  </Layout>
</template>
