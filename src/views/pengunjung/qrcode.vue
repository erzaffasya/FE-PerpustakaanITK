<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import apiPengunjung from "../../apis/Pengunjung.js";
export default {
  page: {
    title: "Starter",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      title: "Checkin Pengunjung",
      items: [
        {
          text: "Pages",
          href: "/",
        },
        {
          text: "Starter",
          active: true,
        },
      ],
      Pengunjung: {},
    };
  },
  components: {
    Layout,
    PageHeader,
  },
  methods: {
    getPengunjung() {
      apiPengunjung.qrcodePengunjung().then((response) => {
        this.Pengunjung = response.data.data;
        console.log(this.Pengunjung);
      });
    },
  },
  mounted() {
    this.getPengunjung();
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header align-items-center d-flex">
            <h4 class="card-title mb-0 flex-grow-1">Scan Barcode</h4>
            <div class="flex-shrink-0">
              <!-- <div
                class="form-check form-switch form-switch-right form-switch-md"
              >
                <label for="sizing-input-showcode" class="form-label text-muted"
                  >Show Code</label
                >
                <input
                  class="form-check-input code-switcher"
                  type="checkbox"
                  id="sizing-input-showcode"
                />
              </div> -->
            </div>
          </div>
          <!-- end card header -->
          <div class="card-body">
            <div class="live-preview">
              <div class="row align-items-center text-center justify-content-center g-3">
                <div class="col-lg-4 ">
                  <img
                    height="500"
                    width="500"
                    v-bind:src="
                      'data:image/jpeg;base64,' + Pengunjung.qrcode_pengunjung
                    "
                  />
                </div>
              </div>
              <!--end row-->
            </div>
          </div>
        </div>
      </div>
      <!--end col-->
    </div>
  </Layout>
</template>