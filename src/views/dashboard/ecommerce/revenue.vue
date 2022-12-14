<script>
import { CountTo } from "vue3-count-to";
import apiStatistik from "../../../apis/Statistik.js";

export default {
  components: {
    CountTo,
  },
  data() {
    return {
      dataGrafik: {
          data_pengunjung: [],
          data_peminjaman_dokumen: [],
          data_peminjaman_ruangan: [],
      },
      series: null,
      chartOptions: {
        chart: {
          height: 370,
          type: "line",
          toolbar: {
            show: false,
          },
        },
        stroke: {
          curve: "straight",
          dashArray: [0, 0, 8],
          width: [2, 0, 2.2],
        },
        fill: {
          opacity: [0.1, 0.9, 1],
        },
        markers: {
          size: [0, 0, 0],
          strokeWidth: 2,
          hover: {
            size: 4,
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
          padding: {
            top: 0,
            right: -2,
            bottom: 15,
            left: 10,
          },
        },
        legend: {
          show: true,
          horizontalAlign: "center",
          offsetX: 0,
          offsetY: -5,
          markers: {
            width: 9,
            height: 9,
            radius: 6,
          },
          itemMargin: {
            horizontal: 10,
            vertical: 0,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "30%",
            barHeight: "70%",
          },
        },
        colors: ["#73dce9", "#695eefe6", "#ff7f41"],
        // tooltip: {
        //   shared: true,
        //   y: [
        //     {
        //       formatter: function (y) {
        //         if (typeof y !== "undefined") {
        //           return y.toFixed(0);
        //         }
        //         return y;
        //       },
        //     },
        //     {
        //       formatter: function (y) {
        //         if (typeof y !== "undefined") {
        //           return "$" + y.toFixed(2) + "k";
        //         }
        //         return y;
        //       },
        //     },
        //     {
        //       formatter: function (y) {
        //         if (typeof y !== "undefined") {
        //           return y.toFixed(0) + " Sales";
        //         }
        //         return y;
        //       },
        //     },
        //   ],
        // },
      },
      isLoaded: false,
    };
  },
  methods: {
    async grafikPerpustakaan() {
      await apiStatistik.grafikPerpustakaan().then((response) => {
        var dataGrafik = response.data.data.detail;
        for (var k in dataGrafik) {
          this.dataGrafik.data_pengunjung.push(
            dataGrafik[k]["total_pengunjung"]
          );
          this.dataGrafik.data_peminjaman_dokumen.push(
            dataGrafik[k]["total_peminjaman_dokumen"]
          );
          this.dataGrafik.data_peminjaman_ruangan.push(
            dataGrafik[k]["total_peminjaman_ruangan"]
          );
        }
        this.series = [
          {
            name: "Pengunjung",
            type: "area",
            data: this.dataGrafik.data_pengunjung,
          },
          {
            name: "Peminjaman Dokumen",
            type: "bar",
            data: this.dataGrafik.data_peminjaman_dokumen,
          },
          {
            name: "Peminjaman Ruangan",
            type: "line",
            data: this.dataGrafik.data_peminjaman_ruangan,
          },
        ];
        this.dataGrafik.jumlah_pengunjung =  response.data.data.jumlah_pengunjung
        this.dataGrafik.jumlah_peminjaman_dokumen =  response.data.data.jumlah_peminjaman_dokumen
        this.dataGrafik.jumlah_peminjaman_ruangan =  response.data.data.jumlah_peminjaman_ruangan
        this.isLoaded = true;
      });
    },
  },
  created() {
    this.grafikPerpustakaan();
  },
};
</script>

<template>
  <div class="card">
    <div class="card-header border-0 align-items-center d-flex">
      <h4 class="card-title mb-0 flex-grow-1">Statistik Perpustakaan</h4>
      <!-- <div>
        <button type="button" class="btn btn-soft-secondary btn-sm me-1">
          ALL
        </button>
        <button type="button" class="btn btn-soft-secondary btn-sm me-1">
          1M
        </button>
        <button type="button" class="btn btn-soft-secondary btn-sm me-1">
          6M
        </button>
        <button type="button" class="btn btn-soft-primary btn-sm">1Y</button>
      </div> -->
    </div>
    <!-- end card header -->

    <div class="card-header p-0 border-0 bg-soft-light">
      <div class="row g-0 text-center">
        <div class="col-6 col-sm-4">
          <div class="p-3 border border-dashed border-start-0">
            <h5 class="mb-1">
              <count-to
                :startVal="0"
                :endVal="this.dataGrafik.jumlah_pengunjung"
                :duration="4000"
              ></count-to>
            </h5>
            <p class="text-muted mb-0">Pengunjung</p>
          </div>
        </div>
        <!--end col-->
        <div class="col-6 col-sm-4">
          <div class="p-3 border border-dashed border-start-0">
            <h5 class="mb-1">
              <count-to :startVal="0" :endVal="this.dataGrafik.jumlah_peminjaman_dokumen" :duration="4000"></count-to
              >
            </h5>
            <p class="text-muted mb-0">Peminjaman Dokumen</p>
          </div>
        </div>
        <!--end col-->
        <div class="col-6 col-sm-4">
          <div class="p-3 border border-dashed border-start-0">
            <h5 class="mb-1">
              <count-to :startVal="0" :endVal="this.dataGrafik.jumlah_peminjaman_ruangan" :duration="4000"></count-to>
            </h5>
            <p class="text-muted mb-0">Peminjaman Ruangan</p>
          </div>
        </div>
        <!--end col-->
        
        <!--end col-->
      </div>
    </div>
    <!-- end card header -->

    <div class="card-body p-0 pb-2">
      <div class="w-100">
        <apexchart
          v-if="isLoaded"
          class="apex-charts"
          height="380"
          type="line"
          dir="ltr"
          :series="series"
          :options="chartOptions"
        ></apexchart>
        <!-- <div
          id="customer_impression_charts"
          data-colors='["--vz-primary", "--vz-success", "--vz-danger"]'
          class="apex-charts"
          dir="ltr"
        ></div> -->
      </div>
    </div>
    <!-- end card body -->
  </div>
  <!-- end card -->
</template>