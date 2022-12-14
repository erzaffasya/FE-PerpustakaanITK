<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import Swal from "sweetalert2";
import apiPeminjamanRuangan from "../../apis/PeminjamanRuangan.js";
export default {
  page: {
    title: "Invoice Details",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      title: "Invoice Details",
      items: [
        {
          text: "Invoices",
          href: "/",
        },
        {
          text: "Invoice Details",
          active: true,
        },
      ],
      PeminjamanRuangan: {
        ruangan: {},
        user: {},
      },
    };
  },
  methods: {
    getPeminjamanRuangan() {
      apiPeminjamanRuangan
        .showPeminjamanRuangan(this.$route.params.id)
        .then((response) => {
          console.log(response);
          this.PeminjamanRuangan = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updatePeminjamanRuangan(new_status) {
      // console.log(new_status, 'status');
      apiPeminjamanRuangan
        .editPeminjamanRuangan(
          this.$route.params.id,
          Object.assign({ new_status: new_status }, this.PeminjamanRuangan)
        )
        .then((response) => {
          console.log(response)
          Swal.fire("Berhasil!", "Status Berhasil Diubah", "success").then(
            (result) => {
              // console.log(response.data.message)
              if (result.value) {
                this.$router.push({ name: "lihat-peminjamanRuangan"})
              }
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    Layout,
    PageHeader,
  },
  mounted() {
    this.getPeminjamanRuangan();
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row justify-content-center">
      <div class="col-xxl-9">
        <div class="card" id="demo">
          <div class="card-header border-bottom-dashed p-4">
            <div class="d-sm-flex">
              <div class="flex-grow-1">
                <img
                  src="@/assets/images/dark-logo-perpustakaan.png"
                  class="card-logo card-logo-dark"
                  alt="logo dark"
                  height="40"
                />
                <img
                  src="@/assets/images/dark-logo-perpustakaan.png"
                  class="card-logo card-logo-light"
                  alt="logo light"
                  height="40"
                />
                <div class="mt-sm-5 mt-4">
                  <h6 class="text-uppercase fw-semibold">Address</h6>
                  <p class="text-muted mb-1">
                    <b> Institut Teknologi Kalimantan </b>
                  </p>
                  <p class="text-muted mb-1">
                    Karang Joang, Kota Balikpapan, Kalimantan Timur
                  </p>
                  <p class="text-muted mb-0">76127</p>
                </div>
              </div>
              <div class="flex-shrink-0 mt-sm-0 mt-3">
                <h6>
                  <span class="text-muted fw-normal"
                    >Legal Registration No:</span
                  >
                  987654
                </h6>
                <h6>
                  <span class="text-muted fw-normal">Email:</span>
                  perpustakaan@itk.ac.id
                </h6>
                <h6>
                  <span class="text-muted fw-normal">Website:</span>
                  <a
                    href="http://digilib.itk.ac.id/"
                    target="_blank"
                    class="link-primary"
                    >www.perpustakaan.itk.ac.id</a
                  >
                </h6>
                <!-- <h6 class="mb-0"><span class="text-muted fw-normal">Contact No:</span> -</h6> -->
              </div>
            </div>
          </div>
          <!--end card-header-->
          <div class="card-body p-4">
            <div class="row g-3">
              <div class="col-lg-4 col-4">
                <p class="text-muted mb-2 text-uppercase fw-semibold">
                  Invoice No
                </p>
                <h5 class="fs-15 mb-0">#{{ PeminjamanRuangan.kode }}</h5>
              </div>
              <!--end col-->
              <div class="col-lg-4 col-4">
                <p class="text-muted mb-2 text-uppercase fw-semibold">Date</p>
                <h5 class="fs-15 mb-0">
                  {{ PeminjamanRuangan.created_at }}
                  <!-- <small class="text-muted">02:36PM</small> -->
                </h5>
              </div>
              <!--end col-->
              <div class="col-lg-4 col-4">
                <p class="text-muted mb-2 text-uppercase fw-semibold">Status</p>
                <span class="badge badge-soft-success fs-11">{{
                  this.PeminjamanRuangan.status
                }}</span>
              </div>
              <!--end col-->
              <!--end col-->
            </div>
            <!--end row-->
          </div>
          <!--end card-body-->
          <div class="card-body p-4 border-top border-top-dashed">
            <div class="row g-3">
              <div class="col-sm-6">
                <h6 class="text-uppercase fw-semibold mb-3">Data Pemohon</h6>
                <p class="fw-medium mb-1 text-muted">
                  {{ PeminjamanRuangan.user.name }}
                  <b v-if="PeminjamanRuangan.user.nim">
                    ( {{ PeminjamanRuangan.user.nim }} )
                  </b>
                </p>
                <p class="text-muted mb-1">
                  {{ PeminjamanRuangan.user.email }}
                </p>
                <p class="text-muted mb-1">
                  {{ PeminjamanRuangan.user.prodi }}
                </p>
                <p class="text-muted mb-1">
                  {{ PeminjamanRuangan.user.jurusan }}
                </p>
                <p class="text-muted mb-1">
                  {{ PeminjamanRuangan.user.role }}
                </p>
              </div>
            </div>
            <!--end row-->
          </div>
          <!--end card-body-->
          <div class="card-body p-4">
            <div class="table-responsive">
              <table
                class="
                  table table-borderless
                  text-center
                  table-nowrap
                  align-middle
                  mb-0
                "
              >
                <thead>
                  <tr class="table-active">
                    <th scope="col" class="text-center">#</th>
                    <th scope="col" class="text-center">Nama Ruangan</th>
                    <th scope="col" class="text-center">Tanggal</th>
                    <th scope="col" class="text-center">Waktu</th>
                    <th scope="col" class="text-center">Keperluan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" class="text-center">1</th>
                    <td class="text-center">
                      {{ this.PeminjamanRuangan.ruangan.nama_ruangan }}
                    </td>
                    <td class="text-center">
                      {{ this.PeminjamanRuangan.tanggal }}
                    </td>
                    <td class="text-center">
                      {{ this.PeminjamanRuangan.waktu_awal }} -
                      {{ this.PeminjamanRuangan.waktu_akhir }}
                    </td>
                    <td class="text-center">
                      {{ this.PeminjamanRuangan.keperluan }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <!--end table-->
            </div>
            <div class="mt-3">
              <!-- <h6 class="text-muted text-uppercase fw-semibold mb-3">
                Berkas Pendukung:
              </h6>
              <p class="text-muted mb-1">
                Payment Method: <span class="fw-medium">Mastercard</span>
              </p>
              <p class="text-muted mb-1">
                Card Holder: <span class="fw-medium">David Nichols</span>
              </p>
              <p class="text-muted mb-1">
                Card Number: <span class="fw-medium">xxx xxxx xxxx 1234</span>
              </p>
              <p class="text-muted">
                Total Amount: <span class="fw-medium">$415.96</span>
              </p> -->
            </div>
            <div class="mt-4">
              <label
                for="exampleFormControlTextarea1"
                class="form-label text-muted text-uppercase fw-semibold"
                >NOTES</label
              ><textarea
                class="form-control alert alert-info"
                id="exampleFormControlTextarea1"
                placeholder="Notes"
                rows="2"
                v-model="PeminjamanRuangan.catatan"
                required=""
              >
-</textarea
              >
            </div>
            <div class="hstack gap-2 justify-content-center d-print-none mt-4">
              <button
                @click="updatePeminjamanRuangan('Ditolak')"
                class="btn btn-danger"
              >
                <i class="ri-printer-line align-bottom me-1"></i> Tolak
              </button>

              <button
                @click="updatePeminjamanRuangan('Diterima')"
                class="btn btn-primary"
              >
                <i class="ri-download-2-line align-bottom me-1"></i> Terima
              </button>
            </div>
          </div>
          <!--end card-body-->
        </div>
        <!--end card-->
      </div>
      <!--end col-->
    </div>
    <!--end row-->
  </Layout>
</template>