<script>
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";

export default {
  page: {
    title: "Layouts",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      title: "Form Layouts",
      items: [
        {
          text: "Forms",
          href: "/",
        },
        {
          text: "Form Layouts",
          active: true,
        },
      ],
      value: null,
      value1: null,
      value5: null,
      value2: null,
      value3: null,
      value4: null,
      config: {
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: "M j, Y",
        altInput: true,
        dateFormat: "d M, Y",
      },
      date: null,
      date1: null,
      date3: null,
    };
  },
  components: {
    Layout,
    PageHeader,
    flatPickr,
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-xxl-6">
        <div class="card">
          <div class="card-header align-items-center d-flex">
            <h4 class="card-title mb-0 flex-grow-1">Tambah Peminjaman Dokumen</h4>
          </div>
          <!-- end card header -->
          <div class="card-body">
            <p class="text-muted">Form Tambah Peminjaman Dokumen.</p>
            <div class="live-preview">
              <form action="javascript:void(0);">
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label">Name</label>
                  </div>
                  <div class="col-lg-9">
                    <input type="text" class="form-control" id="nameInput" placeholder="Enter your name" />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="nameInput" class="form-label">Tanggal Kembali</label>
                  </div>
                  <div class="col-lg-9">
                    <input type="date" class="form-control" id="nameInput" placeholder="Enter your name" />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="websiteUrl" class="form-label">Website URL</label>
                  </div>
                  <div class="col-lg-9">
                    <input type="url" class="form-control" id="websiteUrl" placeholder="Enter your url" />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="dateInput" class="form-label">Date</label>
                  </div>
                  <div class="col-lg-9">
                    <flat-pickr v-model="date3" class="form-control"></flat-pickr>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="timeInput" class="form-label">Time</label>
                  </div>
                  <div class="col-lg-9">
                    <input type="time" class="form-control" data-provider="timepickr" data-time-basic="true"
                      id="timeInput" />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="leaveemails" class="form-label">Email Id</label>
                  </div>
                  <div class="col-lg-9">
                    <input type="email" class="form-control" id="leaveemails" placeholder="Enter your email" />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="contactNumber" class="form-label">Contact Number</label>
                  </div>
                  <div class="col-lg-9">
                    <input type="number" class="form-control" id="contactNumber" placeholder="+91 9876543210" />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="meassageInput" class="form-label">Message</label>
                  </div>
                  <div class="col-lg-9">
                    <textarea class="form-control" id="meassageInput" rows="3"
                      placeholder="Enter your message"></textarea>
                  </div>
                </div>
                <div class="text-end">
                  <button type="submit" class="btn btn-primary">
                    Add Leave
                  </button>
                </div>
              </form>
            </div>
            <div class="d-none code-view"></div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
