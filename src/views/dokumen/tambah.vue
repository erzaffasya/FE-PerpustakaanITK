<script>
import Layout from "../../layouts/main.vue";
import Swal from "sweetalert2";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import apiKategori from "../../apis/Kategori.js";
import apiDokumen from "../../apis/Dokumen.js";
import apiDosenPembimbing from "../../apis/DosenPembimbing.js";
import apiUser from "../../apis/User.js";
import animationData from "@/components/widgets/lupuorrc.json";
import Lottie from "@/components/widgets/lottie.vue";
import $ from 'jquery';
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
    page: {
        title: "Wizard",
        meta: [{
            name: "description",
            content: appConfig.description
        }],
    },
    props: ["id"],
    data() {
        return {
            title: "Wizard",
            isSuccess: false,
            Kategori: {},
            Dokumen: {},
            dataPembimbing: {},
            KategoriID: "",
            Dospem: {},
            Berkas: {
                status: [],
            },
            items: [{
                    text: "Forms",
                    href: "/",
                },
                {
                    text: "Wizard",
                    active: true,
                },
            ],
            defaultOptions: {
                animationData: animationData
            },
            editor: ClassicEditor,
            plugins: [
                "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
                "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                "save table contextmenu directionality emoticons template paste textcolor",
            ],
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons",
            options: {
                height: 300,
                style_formats: [{
                        title: "Bold text",
                        inline: "b"
                    },
                    {
                        title: "Red text",
                        inline: "span",
                        styles: {
                            color: "#ff0000"
                        }
                    },
                    {
                        title: "Red header",
                        block: "h1",
                        styles: {
                            color: "#ff0000"
                        }
                    },
                    {
                        title: "Example 1",
                        inline: "span",
                        classes: "example1"
                    },
                    {
                        title: "Example 2",
                        inline: "span",
                        classes: "example2"
                    },
                    {
                        title: "Table styles"
                    },
                    {
                        title: "Table row 1",
                        selector: "tr",
                        classes: "tablerow1"
                    },
                ],
            },
        };
    },
    methods: {
        setStatus() {
            this.isSuccess = true
        },
        checkDospem() {
            if (this.Dokumen.pembimbing_1 == this.Dokumen.pembimbing_2) {
                Swal.fire(
                    "Error!",
                    "Dosen Pembimbing Tidak Boleh Sama!",
                    "error"
                ).then((result) => {
                    if (result.value) {
                        this.Dokumen.pembimbing_2 = null
                    }
                });
                this.Dokumen.pembimbing_2 = null
            }
        },
        getDokumen() {
            try {
                apiDokumen.showDokumen(this.id).then((response) => {
                    this.KategoriID = response.data.data.kategori.id
                    apiKategori.showKategori(this.KategoriID).then((response) => {
                        this.Berkas = response.data.data;
                        this.Berkas.status = this.Berkas.berkas
                    });
                    this.getDospem()
                    this.Dokumen = response.data.data
                });
            } catch (error) {
                console.log(error)
            }

        },
        getDospem() {
            apiDosenPembimbing.getByDokumenId(this.id).then((response) => {
                this.Dospem = response.data.data;
            });
        },
        getKategori() {
            apiKategori.lihatKategori().then((response) => {
                this.Kategori = response.data.data;
            });
        },
        getBerkas(KategoriID) {
            console.log(KategoriID)
            this.Berkas = null
            apiKategori.showKategori(KategoriID).then((response) => {
                this.Berkas = response.data.data;
                console.log(response.data.data, 'data kategori')
                this.Berkas.status = this.Berkas.berkas
            });
        },

        imageChange(event, name) {
            if (event) {
                $('.preview_' + name).attr('src', URL.createObjectURL(event.target.files[0]));
            }
            this.Dokumen[name] = event.target.files[0];
        },

        postDokumen() {
            const fd = new FormData();
            $.each(this.Dokumen, function (key, value) {
                fd.append(key, value);
            });
            fd.append("kategori_id", this.KategoriID)
            if (!this.id) {
                apiDokumen.tambahDokumen(fd).then((response) => {
                    if (response.data.code == 200) {
                        Swal.fire(
                            "Berhasil!",
                            "Dokumen Berhasil Ditambah!",
                            "success"
                        ).then((result) => {
                            if (result.value) {
                                document.getElementById("v-pills-finish-tab").click();
                            }
                        });
                    } else {
                        this.isSuccess = false
                        Swal.fire("Error!", "Data Dokumen Gagal Ditambah!" + response.data.message, "error");
                    }
                })
            } else {
                fd.append("_method", "PUT")
                apiDokumen.editDokumen(this.id, fd).then((response) => {
                    if (response.data.code == 200) {
                        Swal.fire(
                            "Berhasil!",
                            "Dokumen Berhasil Diubah!",
                            "success"
                        ).then((result) => {
                            if (result.value) {
                                document.getElementById("v-pills-finish-tab").click();
                            }
                        });
                    } else {
                        this.isSuccess = false
                        Swal.fire("Error!", "Data Dokumen Gagal Ditambah!" + response.data.message, "error");
                    }
                })
            }

        },
        selectDosen() {
            apiUser.searchRole('Dosen').then((response) => {
                this.dataPembimbing = response.data.data;
            });
        },
        hapusDospem(id) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#34c38f",
                cancelButtonColor: "#f46a6a",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.value) {
                    apiDosenPembimbing.hapusDosenPembimbing(id).then(() => {
                        this.getDospem();
                    });
                    Swal.fire("Berhasil!", "Data Dosen Pembimbing Berhasil Dihapus.", "success");
                }
            });
        }
    },
    components: {
        Layout,
        PageHeader,
        lottie: Lottie,
        ckeditor: CKEditor.component
    },
    mounted() {
        if (this.id) {
            this.getDokumen();
        }

        this.selectDosen(),
            this.getKategori(),
            document.querySelectorAll(".form-steps").forEach(function (form) {

                // next tab
                form.querySelectorAll(".nexttab").forEach(function (nextButton) {
                    var tabEl = form.querySelectorAll('button[data-bs-toggle="pill"]');
                    tabEl.forEach(function (item) {
                        item.addEventListener('show.bs.tab', function (event) {
                            event.target.classList.add('done');
                        });
                    });
                    nextButton.addEventListener("click", function () {
                        var nextTab = nextButton.getAttribute('data-nexttab');
                        document.getElementById(nextTab).click();
                    });
                });

                //Pervies tab
                form.querySelectorAll(".previestab").forEach(function (prevButton) {

                    prevButton.addEventListener("click", function () {
                        var prevTab = prevButton.getAttribute('data-previous');
                        var totalDone = prevButton.closest("form").querySelectorAll(".custom-nav .done").length;
                        for (var i = totalDone - 1; i < totalDone; i++) {
                            (prevButton.closest("form").querySelectorAll(".custom-nav .done")[i]) ? prevButton.closest("form").querySelectorAll(".custom-nav .done")[i].classList.remove('done'): '';
                        }
                        document.getElementById(prevTab).click();
                    });
                });

                // Step number click
                var tabButtons = form.querySelectorAll('button[data-bs-toggle="pill"]');
                tabButtons.forEach(function (button, i) {
                    button.setAttribute("data-position", i);
                    button.addEventListener("click", function () {
                        var getProgreebar = button.getAttribute("data-progressbar");
                        if (getProgreebar) {
                            var totallength = document.getElementById("custom-progress-bar").querySelectorAll("li").length - 1;
                            var current = i;
                            var percent = (current / totallength) * 100;
                            document.getElementById("custom-progress-bar").querySelector('.progress-bar').style.width = percent + "%";
                        }
                        (form.querySelectorAll(".custom-nav .done").length > 0) ?
                        form.querySelectorAll(".custom-nav .done").forEach(function (doneTab) {
                            doneTab.classList.remove('done');
                        }): '';
                        for (var j = 0; j <= i; j++) {
                            tabButtons[j].classList.contains('active') ? tabButtons[j].classList.remove('done') : tabButtons[j].classList.add('done');
                        }
                    });
                });
            });
    },
};
</script>

<template>
<Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
        <div class="col-xl-12">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title mb-0">Tambah Dokumen </h4>
                </div>
                <!-- end card header -->
                <div class="card-body form-steps">
                    <form @submit.prevent="postDokumen()" class="vertical-navs-step">
                        <div class="row gy-5">
                            <div class="col-lg-3">
                                <div class="nav flex-column custom-nav nav-pills" role="tablist" aria-orientation="vertical">
                                    <button :disabled="isSuccess" class="nav-link active" id="v-pills-bill-info-tab" data-bs-toggle="pill" data-bs-target="#v-pills-bill-info" type="button" role="tab" aria-controls="v-pills-bill-info" aria-selected="true">
                                        <span class="step-title me-2">
                                            <i class="ri-close-circle-fill step-icon me-2"></i>
                                            Step 1
                                        </span>
                                        Data Dokumen
                                    </button>
                                    <button :disabled="isSuccess || !Dokumen.judul || !Dokumen.tahun_terbit || !Dokumen.penerbit || !KategoriID || !Dokumen.nama_pengarang || !Dokumen.deskripsi || !Dokumen['gambar_dokumen']" class="nav-link" id="v-pills-bill-address-tab" data-bs-toggle="pill" data-bs-target="#v-pills-bill-address" type="button" role="tab" aria-controls="v-pills-bill-address" aria-selected="false">
                                        <span class="step-title me-2">
                                            <i class="ri-close-circle-fill step-icon me-2"></i>
                                            Step 2
                                        </span>
                                        Berkas & Validasi
                                    </button>

                                    <button :disabled="!isSuccess" class="nav-link" id="v-pills-finish-tab" data-bs-toggle="pill" data-bs-target="#v-pills-finish" type="button" role="tab" aria-controls="v-pills-finish" aria-selected="false">
                                        <span class="step-title me-2">
                                            <i class="ri-close-circle-fill step-icon me-2"></i>
                                            Step 3
                                        </span>
                                        Selesai
                                    </button>
                                </div>
                                <!-- end nav -->
                            </div>
                            <!-- end col-->
                            <div class="col-lg-6">
                                <div class="px-lg-4">
                                    <div class="tab-content">
                                        <div class="tab-pane fade show active" id="v-pills-bill-info" role="tabpanel" aria-labelledby="v-pills-bill-info-tab">
                                            <div>
                                                <h5>Tambah Dokumen </h5>
                                                <p class="text-muted">Form Tambah Dokumen</p>
                                            </div>

                                            <div>
                                                <div class="col-12">
                                                    <div class="col-sm-12">
                                                        <label for="firstName" class="form-label">Judul</label>
                                                        <input type="text" class="form-control" v-model="Dokumen.judul" id="firstName" placeholder="Masukkan Judul" />
                                                    </div>
                                                </div>

                                                <div class="row g-3 mt-2">
                                                    <div class="col-sm-6">
                                                        <label for="firstName" class="form-label">Tahun Terbit</label>
                                                        <input type="number" class="form-control" id="firstName" v-model="Dokumen.tahun_terbit" placeholder="Masukkan Tahun Terbit" />
                                                    </div>

                                                    <div class="col-sm-6">
                                                        <label for="lastName" class="form-label">Kategori</label>
                                                        <select class="form-select mb-2" @change="getBerkas(KategoriID)" v-model="KategoriID" aria-label="Default select example">
                                                            <option v-for="(item, index) in Kategori" :key="index" selected="" :value="item.id">
                                                                {{ item.nama_kategori }}
                                                            </option>
                                                        </select>
                                                    </div>

                                                    <div class="col-12">
                                                        <label for="email" class="form-label">Penerbit
                                                            <span class="text-muted"></span></label>
                                                        <input type="text" class="form-control" v-model="Dokumen.penerbit" id="email" placeholder="Masukkan Penerbit" />
                                                    </div>
                                                    <div class="col-12">
                                                        <label for="email" class="form-label">Nama Pengarang
                                                        </label>
                                                        <input type="text" class="form-control" v-model="Dokumen.nama_pengarang" id="email" placeholder="Masukkan Nama Pengarang" />
                                                    </div>
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">Gambar Dokumen</label>
                                                        <input id="cover" @change="imageChange($event, 'gambar_dokumen')" ref="gambar_dokumen" class="form-control" type="file" />
                                                    </div>
                                                    <div class="col-12">
                                                        <label for="email" class="form-label">Deskripsi
                                                        </label>
                                                        <div class="ckeditor-classic">
                                                            <ckeditor v-model="this.Dokumen.deskripsi" :editor="editor"></ckeditor>
                                                        </div>
                                                    </div>
                                                    <div class="card-body p-4" v-if="this.Berkas.isPembimbing ">
                                                        <div class="table-responsive">
                                                            <table class="invoice-table table table-borderless table-nowrap mb-0">
                                                                <thead class="align-middle">
                                                                    <tr class="table-active">
                                                                        <th scope="col" style="width: 50px">#</th>
                                                                        <th scope="col">Dosen Pembimbing</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="newlink">
                                                                    <tr id="1" class="product">
                                                                        <th scope="row" class="product-id">1</th>
                                                                        <td class="text-start">
                                                                            <div class="mb-2">
                                                                                <label for="lastName" class="form-label">Pembimbing 1</label>
                                                                                <select @change="checkDospem()" class="form-select mb-2" v-model="this.Dokumen.pembimbing_1" aria-label="Default select example">
                                                                                    <!-- <option disabled value="">-- PILIH DATA -- </option> -->
                                                                                    <option v-for="(item, index) in dataPembimbing" :key="index" selected="" :value="item.id">
                                                                                        {{ item.name }}
                                                                                    </option>
                                                                                </select>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr id="1" class="product">
                                                                        <th scope="row" class="product-id">2</th>
                                                                        <td class="text-start">
                                                                            <div class="mb-2">
                                                                                <label for="lastName" class="form-label">Pembimbing 2</label>
                                                                                <select @change="checkDospem()" class="form-select mb-2" v-model="this.Dokumen.pembimbing_2" aria-label="Default select example">
                                                                                    <!-- <option disabled value="">-- PILIH DATA -- </option> -->
                                                                                    <option v-for="(item, index) in dataPembimbing" :key="index" selected="" :value="item.id">
                                                                                        {{ item.name }}
                                                                                    </option>
                                                                                </select>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                                <tr id="newForm" style="display: none"></tr>

                                                            </table>
                                                            <!--end table-->
                                                        </div>

                                                        <!--end row-->

                                                    </div>
                                                    <div v-if="Object.keys(Dospem).length >= 1" class="card">
                                                        <div class="card-header align-items-center d-flex border-bottom-dashed">
                                                            <h4 class="card-title mb-0 flex-grow-1">Data Dosen Pembimbing</h4>
                                                        </div>

                                                        <div class="card-body">
                                                            <div data-simplebar style="height: 100px;" class="mx-n3 px-3">
                                                                <div class="vstack gap-3">

                                                                    <!-- end member item -->
                                                                    <div v-for="(item, index) in Dospem" :key="index" selected="" :value="item.id" class="d-flex align-items-center">
                                                                        <div class="avatar-xs flex-shrink-0 me-3">
                                                                            <div class="avatar-title bg-soft-danger text-danger rounded-circle">
                                                                                HB
                                                                            </div>
                                                                        </div>
                                                                        <div class="flex-grow-1">
                                                                            <h5 class="fs-15 mb-0"><a href="#" class="text-body d-block">{{item.nama_pembimbing}}</a></h5>
                                                                        </div>
                                                                        <div class="flex-shrink-0">
                                                                            <div class="d-flex align-items-center gap-1">
                                                                                <button type="button" @click="hapusDospem(item.id)" class="btn btn-danger btn-sm">Delete</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <!-- end list -->
                                                            </div>
                                                        </div>
                                                        <!-- end card body -->
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="d-flex align-items-start gap-3 mt-4">
                                                <button v-if="!Dokumen.judul || !Dokumen.tahun_terbit || !Dokumen.penerbit || !KategoriID || !Dokumen.nama_pengarang || !Dokumen.deskripsi || !Dokumen['gambar_dokumen']" disabled type="button" class="btn btn-warning btn-label right ms-auto nexttab nexttab" data-nexttab="v-pills-bill-address-tab">
                                                    <i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Locked
                                                </button>
                                                <button :hidden="!Dokumen.judul || !Dokumen.tahun_terbit || !Dokumen.penerbit || !KategoriID || !Dokumen.nama_pengarang || !Dokumen.deskripsi || !Dokumen['gambar_dokumen']" type="button" class="btn btn-success btn-label right ms-auto nexttab nexttab" data-nexttab="v-pills-bill-address-tab">
                                                    <i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Selanjutnya
                                                </button>
                                            </div>
                                        </div>
                                        <!-- end tab pane -->
                                        <div class="tab-pane fade show" id="v-pills-bill-address" role="tabpanel" aria-labelledby="v-pills-bill-address-tab">
                                            <div>
                                                <h5>Tambah Dokumen</h5>
                                                <p class="text-muted">Form Tambah Dokumen.</p>
                                            </div>

                                            <div>
                                                <div v-if="this.Berkas.status['cover']" class="row g-3">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">Cover</label>
                                                        <input id="cover" @change="imageChange($event, 'cover')" ref="cover" class="form-control" type="file" required />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['lembar_pengesahan']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">Lembar Pengesahan</label>
                                                        <input id="lembar_pengesahan" @change="imageChange($event, 'lembar_pengesahan')" ref="lembar_pengesahan" class="form-control" type="file" required />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['kata_pengantar']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">Kata Pengantar</label>
                                                        <input id="kata_pengantar" @change="imageChange($event, 'kata_pengantar')" ref="kata_pengantar" class="form-control" type="file" required />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['ringkasan']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">Intisari/Ringkasan</label>
                                                        <input id="ringkasan" @change="imageChange($event, 'ringkasan')" ref="ringkasan" class="form-control" type="file" required />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['daftar_isi']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">Daftar Isi</label>
                                                        <input id="daftar_isi" @change="imageChange($event, 'daftar_isi')" ref="daftar_isi" class="form-control" type="file" required />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1 " v-if="this.Berkas.status['daftar_gambar']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">Daftar Gambar</label>
                                                        <input id="daftar_gambar" @change="imageChange($event, 'daftar_gambar')" ref="daftar_gambar" class="form-control" type="file" required />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['daftar_tabel']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">Daftar Tabel</label>
                                                        <input id="daftar_tabel" @change="imageChange($event, 'daftar_tabel')" ref="daftar_tabel" class="form-control" type="file" required />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['daftar_notasi']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">Daftar Notasi</label>
                                                        <input id="daftar_notasi" @change="imageChange($event, 'daftar_notasi')" ref="daftar_notasi" class="form-control" type="file" required />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['abstract_end']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">Abstract [EN]</label>
                                                        <input id="abstract_end" @change="imageChange($event, 'abstract_end')" ref="abstract_end" class="form-control" type="file" required />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['abtract_id']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">Abstrak [ID]</label>
                                                        <input id="abtract_id" @change="imageChange($event, 'abtract_id')" ref="abtract_id" class="form-control" type="file" required />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['bab1']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">BAB 1</label>
                                                        <input id="bab1" @change="imageChange($event, 'bab1')" ref="bab1" class="form-control" type="file" required />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['bab2']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">BAB 2</label>
                                                        <input id="bab2" @change="imageChange($event, 'bab2')" ref="bab2" class="form-control" type="file" required />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['bab3']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">BAB 3</label>
                                                        <input id="bab3" @change="imageChange($event, 'bab3')" ref="bab3" class="form-control" type="file" required />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['bab4']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">BAB 4</label>
                                                        <input id="bab4" @change="imageChange($event, 'bab4')" ref="bab4" class="form-control" type="file" required />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['lampiran']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">Lampiran</label>
                                                        <input id="lampiran" @change="imageChange($event, 'lampiran')" ref="lampiran" class="form-control" type="file" required />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['paper']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">Paper</label>
                                                        <input id="paper" @change="imageChange($event, 'paper')" ref="paper" class="form-control" type="file" required />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['lembar_persetujuan']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">lembar_persetujuan</label>
                                                        <input id="lembar_persetujuan" @change="imageChange($event, 'lembar_persetujuan')" ref="lembar_persetujuan" class="form-control" type="file" required />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mt-1" v-if="this.Berkas.status['full_dokumen']">
                                                    <div class="col-12">
                                                        <label for="address" class="form-label">Full Dokumen</label>
                                                        <input id="full_dokumen" @change="imageChange($event, 'full_dokumen')" ref="full_dokumen" class="form-control" type="file" required />
                                                    </div>
                                                </div>
                                                <div class="form-check mb-3">
                                                    <input type="checkbox" class="form-check-input" id="validationFormCheck1" required>
                                                    <label class="form-check-label" for="validationFormCheck1">Apakah berkas sudah sesuai?</label>
                                                    <div class="invalid-feedback">Harap centang checkbox ini</div>
                                                </div>
                                            </div>
                                            <div class="d-flex align-items-start gap-3 mt-4">
                                                <button type="button" class="btn btn-light btn-label previestab" data-previous="v-pills-bill-info-tab">
                                                    <i class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
                                                    Kembali
                                                </button>
                                                <button @click="this.setStatus()" type="submit" class="btn btn-success btn-label right ms-auto">
                                                    <i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Submit
                                                </button>
                                            </div>
                                        </div>
                                        <!-- end tab pane -->

                                        <!-- end tab pane -->
                                        <div class="tab-pane fade" id="v-pills-finish" role="tabpanel" aria-labelledby="v-pills-finish-tab">
                                            <div class="text-center pt-4 pb-2">
                                                <div class="mb-4">
                                                    <lottie colors="primary:#0ab39c,secondary:#405189" :options="defaultOptions" :height="120" :width="120" />
                                                </div>
                                                <h5>Dokumen anda berhasil diunggah!</h5>
                                                <p class="text-muted">
                                                    Tim Perpustakaan ITK akan segera menverifikasi dokumen anda, <br> Mohon untuk cek status dokumen anda secara berkala. Terima Kasih!
                                                </p>
                                            </div>
                                        </div>
                                        <!-- end tab pane -->
                                    </div>
                                    <!-- end tab content -->
                                </div>
                            </div>
                            <!-- end col -->
                        </div>
                        <!-- end row -->
                    </form>
                </div>
                <!-- end card body -->
            </div>
            <!-- end card -->
        </div>
        <!-- end col -->
    </div>
    <!-- end row -->

    <!-- end row -->
</Layout>
</template>
