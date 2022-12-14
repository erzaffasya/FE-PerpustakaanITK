<script>
import Swal from "sweetalert2";
import apiKategori from "../../apis/Kategori.js";
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";

export default {
    page: {
        title: "Layouts",
        meta: [{
            name: "description",
            content: appConfig.description
        }],
    },

    components: {
        Layout,
        PageHeader,
    },
    data() {
        return {
            kategori: {
              berkas:{}
            },
        };
    },
    methods: {
        store() {
            console.log(this.kategori);
            const fd = new FormData();
            fd.append("nama_kategori", this.kategori.nama_kategori);
            fd.append("detail", this.kategori.detail);
            fd.append("isPembimbing", this.kategori.isPembimbing);
            fd.append("berkas", JSON.stringify(this.kategori.berkas));
            apiKategori.tambahKategori(fd).then((response) => {
                if (response.data.code == 200) {
                    Swal.fire(
                        "Berhasil!",
                        "Data Kategori Berhasil Ditambah!",
                        "success"
                    ).then((result) => {
                        if (result.value) {
                            this.$router.push("lihat");
                        }
                    });
                } else {
                    Swal.fire("Error!", "Data Kategori Gagal Ditambah!", "error");
                }
            });
        },
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
                    <h4 class="card-title mb-0 flex-grow-1">Tambah Kategori</h4>
                </div>
                <!-- end card header -->
                <div class="card-body">
                    <p class="text-muted">
                        Form tambah kategori untuk perpustakaan ITK.
                    </p>
                    <div class="live-preview">
                        <form @submit.prevent="store()">
                            <div class="row mb-3">
                                <div class="col-lg-3">
                                    <label for="nameInput" class="form-label">Nama Kategori</label>
                                </div>
                                <div class="col-lg-9">
                                    <input type="text" v-model="kategori.nama_kategori" class="form-control" placeholder="Masukkan Nama Kategori" />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-lg-3">
                                    <label for="nameInput" class="form-label">Detail</label>
                                </div>
                                <div class="col-lg-9">
                                    <input type="text" v-model="kategori.detail" class="form-control" placeholder="Masukkan Detail Kategori" />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-lg-3">
                                    <label for="nameInput" class="form-label">Dosen Pembimbing</label>
                                </div>
                                <div class="col-lg-9">
                                    <select v-model="kategori.isPembimbing" class="form-select mb-3" aria-label="Default select example">
                                        <option value="0">Tidak Aktif</option>
                                        <option value="1">Aktif</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-lg-12">
                                    <label for="nameInput" class="form-label">Data yang Dibutuhkan</label>
                                    <hr />
                                </div>
                            </div>
                            <div class="row mb-5">
                                <div class="col-lg-4">
                                    <input class="form-check-input" type="checkbox" v-model="kategori.berkas.cover" id="cover" />
                                    <label class="form-check-label ml-2" for="cover">
                                        Cover
                                    </label>
                                </div>
                                <div class="col-lg-4">
                                    <input class="form-check-input" type="checkbox" v-model="kategori.berkas.lembar_pengesahan" id="lembar_pengesahan" />
                                    <label class="form-check-label ml-2" for="lembar_pengesahan">
                                        Lembar Pengesahan
                                    </label>
                                </div>
                                <div class="col-lg-4">
                                    <input class="form-check-input" type="checkbox" v-model="kategori.berkas.kata_pengantar" id="kata_pengantar" />
                                    <label class="form-check-label ml-2" for="kata_pengantar">
                                        Kata Pengantar
                                    </label>
                                </div>
                                <div class="col-lg-4">
                                    <input class="form-check-input" type="checkbox" v-model="kategori.berkas.ringkasan" id="ringkasan" />
                                    <label class="form-check-label ml-2" for="ringkasan">
                                        Ringkasan
                                    </label>
                                </div>
                                <div class="col-lg-4">
                                    <input class="form-check-input" type="checkbox" v-model="kategori.berkas.daftar_isi" id="daftar_isi" />
                                    <label class="form-check-label ml-2" for="daftar_isi">
                                        Daftar Isi
                                    </label>
                                </div>
                                <div class="col-lg-4">
                                    <input class="form-check-input" type="checkbox" v-model="kategori.berkas.daftar_gambar" id="daftar_gambar" />
                                    <label class="form-check-label ml-2" for="daftar_gambar">
                                        Daftar Gambar
                                    </label>
                                </div>
                                <div class="col-lg-4">
                                    <input class="form-check-input" type="checkbox" v-model="kategori.berkas.daftar_tabel" id="daftar_tabel" />
                                    <label class="form-check-label ml-2" for="daftar_tabel">
                                        Daftar Tabel
                                    </label>
                                </div>
                                <div class="col-lg-4">
                                    <input class="form-check-input" type="checkbox" v-model="kategori.berkas.daftar_notasi" id="daftar_notasi" />
                                    <label class="form-check-label ml-2" for="daftar_notasi">
                                        Daftar Notasi
                                    </label>
                                </div>
                                <div class="col-lg-4">
                                    <input class="form-check-input" type="checkbox" v-model="kategori.berkas.lampiran" id="lampiran" />
                                    <label class="form-check-label ml-2" for="lampiran">
                                        Lampiran
                                    </label>
                                </div>
                                <div class="col-lg-4">
                                    <input class="form-check-input" type="checkbox" v-model="kategori.berkas.bab1" id="bab1" />
                                    <label class="form-check-label ml-2" for="bab1">
                                        Bab 1
                                    </label>
                                </div>
                                <div class="col-lg-4">
                                    <input class="form-check-input" type="checkbox" v-model="kategori.berkas.bab2" id="bab2" />
                                    <label class="form-check-label ml-2" for="bab2">
                                        Bab 2
                                    </label>
                                </div>
                                <div class="col-lg-4">
                                    <input class="form-check-input" type="checkbox" v-model="kategori.berkas.bab3" id="bab3" />
                                    <label class="form-check-label ml-2" for="bab3">
                                        Bab 3
                                    </label>
                                </div>
                                <div class="col-lg-4">
                                    <input class="form-check-input" type="checkbox" v-model="kategori.berkas.bab4" id="bab4" />
                                    <label class="form-check-label ml-2" for="bab4">
                                        Bab 4
                                    </label>
                                </div>
                                <div class="col-lg-4">
                                    <input class="form-check-input" type="checkbox" v-model="kategori.berkas.bab5" id="bab5" />
                                    <label class="form-check-label ml-2" for="bab5">
                                        Bab 5
                                    </label>
                                </div>
                                <div class="col-lg-4">
                                    <input class="form-check-input" type="checkbox" v-model="kategori.berkas.full_dokumen" id="full_dokumen" />
                                    <label class="form-check-label ml-2" for="full_dokumen">
                                        Full Dokumen
                                    </label>
                                </div>
                            </div>
                            <div class="text-end">
                                <button type="submit" class="btn btn-primary">Submit</button>
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
