<script>
import { SimpleBar } from "simplebar-vue3";
// import apiProfile from "../apis/Auth";
import apiNotifikasi from "../apis/Notifikasi";
import apiDokumen from "../apis/Dokumen";
import i18n from "../i18n";
import $ from "jquery";
/**
 * Nav-bar Component
 */
export default {
  inherit: true,
  props: ["user"],
  data() {
    return {
      //   user: this.$parent.user,
      notifikasi: {},
      search_navbar: null,
      data_pencarian: {},
      languages: [
        {
          flag: require("@/assets/images/flags/us.svg"),
          language: "en",
          title: "English",
        },
        {
          flag: require("@/assets/images/flags/french.svg"),
          language: "fr",
          title: "French",
        },
        {
          flag: require("@/assets/images/flags/spain.svg"),
          language: "sp",
          title: "Spanish",
        },
        {
          flag: require("@/assets/images/flags/china.svg"),
          language: "ch",
          title: "Chinese",
        },
        {
          flag: require("@/assets/images/flags/germany.svg"),
          language: "gr",
          title: "Deutsche",
        },
        {
          flag: require("@/assets/images/flags/russia.svg"),
          language: "ru",
          title: "русский",
        },
      ],
      lan: i18n.locale,
      text: null,
      flag: null,
      value: null,
      myVar: 1,
    };
  },
  components: {
    SimpleBar,
  },
  mounted() {
    if (document.getElementById("topnav-hamburger-icon"))
      document
        .getElementById("topnav-hamburger-icon")
        .addEventListener("click", this.toggleHamburgerMenu);
    // this.getProfile()
    this.isCustomDropdown();
    this.getNotifikasi();
  },
  watch: {
    search_navbar(newQuestion, oldQuestion) {
      console.log(newQuestion, oldQuestion, "erza");
      this.getCariDokumen();
    },
  },
  methods: {
    async getNotifikasi() {
      await apiNotifikasi
        .lihatNotifikasi()
        .then((response) => {
          this.notifikasi = response.data.data;
        })
        .catch((error) => {
          console.log(error, "error");
          //or in file components
          // this.$router.go()
          //   this.$router.push("/logout");
        });
    },
    bacaNotifikasi() {
      apiNotifikasi
        .bacaNotifikasi()
        .then(() => {
          // this.notifikasi = response.data.data;
          // console.log(response, 'baca notif')
        })
        .catch((error) => {
          console.log(error, "error");
          //or in file components
          // this.$router.go()
          //   this.$router.push("/logout");
        });
    },
    getCariDokumen() {
      apiDokumen
        .cariDokumen(this.search_navbar)
        .then((response) => {
          this.data_pencarian = response.data.data;
        })
        .catch((error) => {
          console.log(error, "error");
        });
    },
    isCustomDropdown() {
      //Search bar
      var searchOptions = document.getElementById("search-close-options");
      var dropdown = document.getElementById("search-dropdown");
      var searchInput = document.getElementById("search-options");

      searchInput.addEventListener("focus", () => {
        var inputLength = searchInput.value.length;
        if (inputLength > 0) {
          dropdown.classList.add("show");
          searchOptions.classList.remove("d-none");
        } else {
          dropdown.classList.remove("show");
          searchOptions.classList.add("d-none");
        }
      });

      searchInput.addEventListener("keyup", () => {
        var inputLength = searchInput.value.length;
        if (inputLength > 0) {
          dropdown.classList.add("show");
          searchOptions.classList.remove("d-none");
        } else {
          dropdown.classList.remove("show");
          searchOptions.classList.add("d-none");
        }
      });

      searchOptions.addEventListener("click", () => {
        searchInput.value = "";
        dropdown.classList.remove("show");
        searchOptions.classList.add("d-none");
      });

      document.body.addEventListener("click", (e) => {
        if (e.target.getAttribute("id") !== "search-options") {
          dropdown.classList.remove("show");
          searchOptions.classList.add("d-none");
        }
      });
    },
    toggleHamburgerMenu() {
      var windowSize = document.documentElement.clientWidth;

      if (windowSize > 767)
        document.querySelector(".hamburger-icon").classList.toggle("open");

      //For collapse horizontal menu
      if (
        document.documentElement.getAttribute("data-layout") === "horizontal"
      ) {
        document.body.classList.contains("menu")
          ? document.body.classList.remove("menu")
          : document.body.classList.add("menu");
      }

      //For collapse vertical menu
      if (document.documentElement.getAttribute("data-layout") === "vertical") {
        if (windowSize < 1025 && windowSize > 767) {
          document.body.classList.remove("vertical-sidebar-enable");
          document.documentElement.getAttribute("data-sidebar-size") == "sm"
            ? document.documentElement.setAttribute("data-sidebar-size", "")
            : document.documentElement.setAttribute("data-sidebar-size", "sm");
        } else if (windowSize > 1025) {
          document.body.classList.remove("vertical-sidebar-enable");
          document.documentElement.getAttribute("data-sidebar-size") == "lg"
            ? document.documentElement.setAttribute("data-sidebar-size", "sm")
            : document.documentElement.setAttribute("data-sidebar-size", "lg");
        } else if (windowSize <= 767) {
          document.body.classList.add("vertical-sidebar-enable");
          document.documentElement.setAttribute("data-sidebar-size", "lg");
          $(".remove-sidebar").click(function () {
            document.body.classList.remove("vertical-sidebar-enable");
          });
        } else {
          document.body.classList.remove("vertical-sidebar-enable");
        }
      }

      //Two column menu
      if (document.documentElement.getAttribute("data-layout") == "twocolumn") {
        document.body.classList.contains("twocolumn-panel")
          ? document.body.classList.remove("twocolumn-panel")
          : document.body.classList.add("twocolumn-panel");
      }
    },
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    setLanguage(locale, country, flag) {
      this.lan = locale;
      this.text = country;
      this.flag = flag;
      document.getElementById("header-lang-img").setAttribute("src", flag);
      i18n.global.locale = locale;
    },
    toggleDarkMode() {
      if (document.documentElement.getAttribute("data-layout-mode") == "dark") {
        document.documentElement.setAttribute("data-layout-mode", "light");
      } else {
        document.documentElement.setAttribute("data-layout-mode", "dark");
      }
    },
  },
};
</script>

<template lang="en">
<header id="page-topbar">
    <div class="layout-width">
        <div class="navbar-header">
            <div class="d-flex">
                <!-- LOGO -->
                <div class="navbar-brand-box horizontal-logo">
                    <router-link to="/" class="logo logo-dark">
                        <span class="logo-sm">
                            <img src="@/assets/images/logo-perpus.png" alt="" height="42" />
                        </span>
                        <span class="logo-lg">
                            <img src="@/assets/images/logo-perpus.png" alt="" height="37" />
                        </span>
                    </router-link>

                    <router-link to="/" class="logo logo-light">
                        <span class="logo-sm">
                            <img src="@/assets/images/logo-perpus.png" alt="" height="42" />
                        </span>
                        <span class="logo-lg">
                            <img src="@/assets/images/logo-perpus.png" alt="" height="37" />
                        </span>
                    </router-link>
                </div>

                <button type="button" class="
              btn btn-sm
              px-3
              fs-16
              header-item
              vertical-menu-btn
              topnav-hamburger
            " id="topnav-hamburger-icon">
                    <span class="hamburger-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>

                <!-- App Search-->
                <form class="app-search d-none d-md-block">
                    <div class="position-relative">
                        <input type="text" v-model="search_navbar" class="form-control" placeholder="Search..." autocomplete="off" id="search-options" />
                        <span class="mdi mdi-magnify search-widget-icon"></span>
                        <span class="
                  mdi mdi-close-circle
                  search-widget-icon search-widget-icon-close
                  d-none
                " id="search-close-options"></span>
                    </div>
                    <div class="dropdown-menu dropdown-menu-lg" id="search-dropdown">
                        <SimpleBar data-simplebar style="max-height: 320px">
                            <!-- item-->

                            <!-- item-->
                            <div class="dropdown-header mt-2">
                                <h6 class="text-overflow text-muted mb-2 text-uppercase">
                                    Hasil Pencarian
                                </h6>
                            </div>

                            <div class="notification-list">
                                <!-- item -->
                                <div v-for="item in data_pencarian">
                                    <router-link :to="{
                                              name: 'detail-dokumen',
                                              params: { id: item.id },
                                            }" class="d-flex dropdown-item notify-item py-2">
                                        <img :src="item.gambar_dokumen" class="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                        <div class="flex-1">
                                            <h6 class="m-0">{{item.judul}} <span class="fs-11 mb-0 text-muted"> - {{item.kategori}}</span></h6>
                                            <span class="fs-11 mb-0 text-muted">{{item.nama_pengarang}} | {{item.penerbit}}</span>
                                        </div>
                                    </router-link>
                                </div>

                            </div>
                        </SimpleBar>

                        <!-- <div class="text-center pt-3 pb-1">
                            <router-link to="/pages/search-results" class="btn btn-primary btn-sm">View All Results <i class="ri-arrow-right-line ms-1"></i></router-link>
                        </div> -->
                    </div>
                </form>
            </div>

            <div class="d-flex align-items-center">
                <div class="dropdown d-md-none topbar-head-dropdown header-item">
                    <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="bx bx-search fs-22"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-search-dropdown">
                        <form class="p-3">
                            <div class="form-group m-0">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search ..." aria-label="Recipient's username" />
                                    <button class="btn btn-primary" type="submit">
                                        <i class="mdi mdi-magnify"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="ms-1 header-item d-none d-sm-flex">
                    <button type="button" class="
                btn btn-icon btn-topbar btn-ghost-secondary
                rounded-circle
                light-dark-mode
              " @click="toggleDarkMode">
                        <i class="bx bx-moon fs-22"></i>
                    </button>
                </div>

                <div class="dropdown topbar-head-dropdown ms-1 header-item">
                    <button type="button" @click="bacaNotifikasi()" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="bx bx-bell fs-22"></i>
                        <span class="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
                            {{this.notifikasi.notifikasi_unread}}<span class="visually-hidden">unread messages</span></span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-notifications-dropdown">
                        <div class="dropdown-head bg-primary bg-pattern rounded-top">
                            <div class="p-3">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <h6 class="m-0 fs-16 fw-semibold text-white">
                                            Notifications
                                        </h6>
                                    </div>
                                    <div class="col-auto dropdown-tabs">
                                        <span class="badge badge-soft-light fs-13"> 4 New</span>
                                    </div>
                                </div>
                            </div>

                            <div class="px-2 pt-2">
                                <ul class="nav nav-tabs dropdown-tabs nav-tabs-custom" data-dropdown-tabs="true" id="notificationItemsTab" role="tablist" auto-close="outside" @click.capture.stop>
                                    <li class="nav-item">
                                        <a class="nav-link active" data-bs-toggle="tab" href="#all-noti-tab" role="tab" aria-selected="true">
                                            All ({{notifikasi.jumlah_notifikasi}})
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>

                        <div class="tab-content" id="notificationItemsTabContent">
                            <div class="tab-pane fade show active py-2 ps-2" id="all-noti-tab" role="tabpanel">
                                <SimpleBar data-simplebar style="max-height: 300px" class="pe-2">

                                    <div v-for="item in notifikasi.data" class="
                                            text-reset
                                            notification-item
                                            d-block
                                            dropdown-item
                                            position-relative
                                        ">
                                        <div class="d-flex">
                                            <!-- <img src="@/assets/images/users/avatar-2.jpg" class="me-3 rounded-circle avatar-xs" alt="user-pic" /> -->
                                            <div class="avatar-xs me-3">
                                                <span class="
                                                    avatar-title
                                                    bg-soft-danger
                                                    text-danger
                                                    rounded-circle
                                                    fs-16
                                                    ">
                                                    <i class="bx bx-message-square-dots"></i>
                                                </span>
                                            </div>
                                            <div class="flex-1">
                                                <a href="#!" class="stretched-link">
                                                    <h6 class="mt-0 mb-1 fs-13 fw-semibold">
                                                        {{item.pesan.judul}}
                                                    </h6>
                                                </a>
                                                <div class="fs-13 text-muted">
                                                    <p class="mb-1">
                                                        {{item.pesan.pesan}}.
                                                    </p>
                                                </div>
                                                <p class="
                                                    mb-0
                                                    fs-11
                                                    fw-medium
                                                    text-uppercase text-muted
                                                    ">
                                                    <span><i class="mdi mdi-clock-outline"></i> {{item.created_at}}</span>
                                                </p>
                                            </div>
                                            <!-- <div class="px-2 fs-15">
                                                <input class="form-check-input" type="checkbox" />
                                            </div> -->
                                        </div>
                                    </div>

                                    <div class="my-3 text-center">
                                        <button type="button" class="btn btn-soft-success">
                                            View All Notifications
                                            <i class="ri-arrow-right-line align-middle"></i>
                                        </button>
                                    </div>
                                </SimpleBar>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dropdown ms-sm-3 header-item topbar-user">
                    <button type="button" class="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="d-flex align-items-center">
                            <img class="rounded-circle header-profile-user" src="@/assets/images/user.png" alt="Header Avatar" />
                            <span class="text-start ms-xl-2">
                                <span class="
                      d-none d-xl-inline-block
                      ms-1
                      fw-medium
                      user-name-text
                    ">{{ this.user.name }}</span>
                                <span class="
                      d-none d-xl-block
                      ms-1
                      fs-12
                      text-muted
                      user-name-sub-text
                    ">{{ this.user.role }}</span>
                            </span>
                        </span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-end">
                        <!-- item-->
                        <!-- <h6 class="dropdown-header">Welcome {{ this.user.name }}!</h6> -->
                        <router-link class="dropdown-item" to="/profil"><i class="
                    mdi mdi-account-circle
                    text-muted
                    fs-16
                    align-middle
                    me-1
                  "></i>
                            <span class="align-middle">Profil</span>
                        </router-link>

                        <!-- <router-link class="dropdown-item" to="/apps/tasks-kanban"><i class="
                    mdi mdi-calendar-check-outline
                    text-muted
                    fs-16
                    align-middle
                    me-1
                  "></i>
                            <span class="align-middle">Taskboard</span>
                        </router-link>
                        <router-link class="dropdown-item" to="/pages/faqs"><i class="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i>
                            <span class="align-middle">Help</span>
                        </router-link>
                        <div class="dropdown-divider"></div> -->

                        <a class="dropdown-item" href="/logout"><i class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                            <span class="align-middle" data-key="t-logout">Logout</span></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
</template>
