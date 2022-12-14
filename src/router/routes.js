import store from "@/state/store";

export default [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/account/login.vue"),
    meta: {
      title: "Login",
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters["authfack/loggedIn"]) {
          // Redirect to the home page instead
          next({ name: "default" });
        } else {
          // Continue to the login page
          next();
        }
      },
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/account/register.vue"),
    meta: {
      title: "Register",
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters["authfack/loggedIn"]) {
          // Redirect to the home page instead
          next({ name: "default" });
        } else {
          // Continue to the login page
          next();
        }
      },
    },
  },
  {
    path: "/forgot-password",
    name: "Forgot password",
    component: () => import("../views/account/forgot-password.vue"),
    meta: {
      title: "Forgot Password",
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters["authfack/loggedIn"]) {
          // Redirect to the home page instead
          next({ name: "default" });
        } else {
          // Continue to the login page
          next();
        }
      },
    },
  },
  {
    path: "/",
    name: "default",
    meta: {
      title: "Dashboard",
      authRequired: true,
    },
    component: () => import("../views/dashboard/ecommerce/index.vue"),
  },
  // ruangan
  {
    path: "/ruangan/tambah",
    name: "tambah-ruangan",
    meta: {
      title: "Tambah Ruangan",
      authRequired: true,
    },
    component: () => import("../views/ruangan/tambah"),
  },
  {
    path: "/ruangan/edit/:id",
    name: "edit-ruangan",
    meta: {
      title: "Edit Ruangan",
      authRequired: true,
    },
    component: () => import("../views/ruangan/edit"),
  },
  {
    path: "/ruangan/lihat",
    name: "lihat-ruangan",
    meta: {
      title: "Lihat Ruangan",
      authRequired: true,
    },
    component: () => import("../views/ruangan/lihat"),
  },
  // peminjamanRuangan
  {
    path: "/peminjaman-ruangan/tambah",
    name: "tambah-peminjamanRuangan",
    meta: {
      title: "Tambah Ruangan",
      authRequired: true,
    },
    component: () => import("../views/peminjamanRuangan/tambah"),
  },
  {
    path: "/peminjaman-ruangan/edit/:id",
    name: "edit-peminjamanRuangan",
    meta: {
      title: "Edit ruangan",
      authRequired: true,
    },
    component: () => import("../views/peminjamanRuangan/edit"),
  },
  {
    path: "/peminjaman-ruangan/lihat",
    name: "lihat-peminjamanRuangan",
    meta: {
      title: "Lihat Ruangan",
      authRequired: true,
    },
    component: () => import("../views/peminjamanRuangan/lihat"),
  },
  {
    path: "/peminjaman-ruangan/invoice",
    name: "invoice-peminjamanRuangan",
    props: true,
    meta: {
      title: "Lihat Ruangan",
      authRequired: true,
    },
    component: () => import("../views/peminjamanRuangan/invoice"),
  },
  // Kategori
  {
    path: "/kategori/tambah",
    name: "tambah-kategori",
    meta: {
      title: "Tambah Kategori",
      authRequired: true,
    },
    component: () => import("../views/kategori/tambah"),
  },
  {
    path: "/kategori/edit/:id",
    name: "edit-kategori",
    meta: {
      title: "Edit Kategori",
      authRequired: true,
    },
    component: () => import("../views/kategori/edit"),
  },
  {
    path: "/kategori/lihat",
    name: "lihat-kategori",
    meta: {
      title: "Lihat Kategori",
      authRequired: true,
    },
    component: () => import("../views/kategori/lihat"),
  },
  // Dokumen
  {
    path: "/dokumen/tambah",
    name: "tambah-dokumen",
    props: true,
    meta: {
      title: "Tambah Dokumen",
      authRequired: true,
    },
    component: () => import("../views/dokumen/tambah"),
  },
  {
    path: "/dokumen/lihat",
    name: "lihat-dokumen",
    meta: {
      title: "Lihat Dokumen",
      authRequired: true,
    },
    component: () => import("../views/dokumen/lihat"),
  },
  {
    path: "/dokumen/detail-dokumen/:id",
    name: "detail-dokumen",
    props: true,
    meta: {
      title: "Detail Dokumen",
      authRequired: true,
    },
    component: () => import("../views/dokumen/detailDokumen"),
  },
  {
    path: "/baca-dokumen",
    name: "baca-dokumen",
    props: true,
    meta: {
      title: "Grid Dokumen",
      authRequired: true,
    },
    component: () => import("../views/dokumen/bacaDokumen"),
  },
  {
    path: "/grid-dokumen",
    name: "grid-dokumen",
    meta: {
      title: "Grid Dokumen",
      authRequired: true,
    },
    component: () => import("../views/peminjamanDokumen/gridDokumen"),
  },
  {
    path: "/dokumen/bimbingan",
    name: "lihat-bimbingan",
    meta: {
      title: "Lihat Bimbingan",
      authRequired: true,
    },
    component: () => import("../views/dokumen/lihatBimbingan"),
  },
  // bookmark
  {
    path: "/bookmark/tambah",
    name: "tambah-bookmark",
    meta: {
      title: "Tambah Bookmark",
      authRequired: true,
    },
    component: () => import("../views/bookmark/tambah"),
  },
  {
    path: "/bookmark/lihat",
    name: "lihat-bookmark",
    meta: {
      title: "Lihat Bookmark",
      authRequired: true,
    },
    component: () => import("../views/bookmark/lihat"),
  },  
  // pengunjung
  {
    path: "/qrcode-pengunjung",
    name: "qrcode-pengunjung",
    meta: {
      title: "Scan Pengunjung",
      authRequired: true,
    },
    component: () => import("../views/pengunjung/qrcode"),
  },
  {
    path: "/pengunjung/tambah",
    name: "tambah-pengunjung",
    meta: {
      title: "Tambah pengunjung",
      authRequired: true,
    },
    component: () => import("../views/pengunjung/tambah"),
  },
  // {
  //   path: "/pengunjung/edit/:id",
  //   name: "edit-pengunjung",
  //   meta: {
  //     title: "Edit pengunjung",
  //     authRequired: true,
  //   },
  //   component: () => import("../views/pengunjung/edit"),
  // },
  {
    path: "/pengunjung/lihat",
    name: "lihat-pengunjung",
    meta: {
      title: "Lihat pengunjung",
      authRequired: true,
    },
    component: () => import("../views/pengunjung/lihat"),
  },
  // peminjaman
  {
    path: "/peminjaman-dokumen/tambah",
    name: "tambah-peminjaman-dokumen",
    meta: {
      title: "Tambah Peminjaman Dokumen",
      authRequired: true,
    },
    component: () => import("../views/peminjamanDokumen/tambah"),
  },
  {
    path: "/peminjaman-dokumen/lihat",
    name: "lihat-peminjaman-dokumen",
    meta: {
      title: "Lihat Peminjaman Dokumen",
      authRequired: true,
    },
    component: () => import("../views/peminjamanDokumen/lihat"),
  },
  {
    path: "/yudisium/tambah",
    name: "tambah-yudisium",
    meta: {
      title: "Tambah yudisium",
      authRequired: true,
    },
    component: () => import("../views/yudisium/tambah"),
  },
  {
    path: "/yudisium/edit/:id",
    name: "edit-yudisium",
    meta: {
      title: "Edit yudisium",
      authRequired: true,
    },
    component: () => import("../views/yudisium/edit"),
  },
  {
    path: "/yudisium/lihat",
    name: "lihat-yudisium",
    meta: {
      title: "Lihat yudisium",
      authRequired: true,
    },
    component: () => import("../views/yudisium/lihat"),
  },  
  {
    path: "/cek-bebas-pustaka",
    name: "cek-bebas-pustaka",
    meta: {
      title: "Cek Bebas Pustaka",
      authRequired: true,
    },
    component: () => import("../views/cekBebasPustaka/lihat"),
  },
  {
    path: "/yudisium/pengajuan/tambah",
    name: "tambah-yudisium-mahasiswa",
    meta: {
      title: "Tambah yudisium",
      authRequired: true,
    },
    component: () => import("../views/yudisiumMahasiswa/tambah"),
  },
  {
    path: "/yudisium/pengajuan/edit/:id",
    name: "edit-yudisium-mahasiswa",
    meta: {
      title: "Edit yudisium",
      authRequired: true,
    },
    component: () => import("../views/yudisiumMahasiswa/edit"),
  },
  {
    path: "/yudisium/pengajuan/lihat",
    name: "lihat-yudisium-mahasiswa",
    meta: {
      title: "Lihat yudisium",
      authRequired: true,
    },
    component: () => import("../views/yudisiumMahasiswa/lihat"),
  },  
  {
    path: "/jurusan/lihat-dokumen",
    name: "jurusan-cek-dokumen",
    meta: {
      title: "Cek Dokumen Jurusan",
      authRequired: true,
    },
    component: () => import("../views/jurusan/index"),
  },
 
  {
    path: "/logout",
    name: "logout",
    meta: {
      title: "Logout",
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
          store.dispatch("auth/logOut");
        } else {
          store.dispatch("authfack/logout");
        }
        const authRequiredOnPreviousRoute = routeFrom.matched.some((route) =>
          route.push("/login")
        );
        // Navigate back to previous page, or home as a fallback
        next(
          authRequiredOnPreviousRoute ? { name: "default" } : { ...routeFrom }
        );
      },
    },
    component: () => import("../views/auth/logout/basic"),
  },
  {
    path: "/apps/tasks-kanban",
    name: "tasks-kanban",
    meta: { title: "Tasks Kanban", authRequired: true },
    component: () => import("../views/apps/tasks/kanban"),
  },
 
  // {
  //   path: "/pages/profile",
  //   name: "profile",
  //   meta: { title: "Profile", authRequired: true },
  //   component: () => import("../views/pages/profile/simple"),
  // },

  {
    path: "/profil",
    name: "profil",
    meta: {
      title: "Lihat Profil",
      authRequired: true,
    },
    component: () => import("../views/account/profil"),
  },
  {
    path: "/pages/maintenance",
    name: "maintenance",
    meta: { title: "Maintanance", authRequired: true },
    component: () => import("../views/pages/maintenance"),
  },
  {
    path: "/pages/coming-soon",
    name: "coming-soon",
    meta: { title: "Comming Soon", authRequired: true },
    component: () => import("../views/pages/coming-soon"),
  },

  {
    path: "/pages/faqs",
    name: "FAQs",
    meta: { title: "FAQs", authRequired: true },
    component: () => import("../views/pages/faqs"),
  },
 
];
