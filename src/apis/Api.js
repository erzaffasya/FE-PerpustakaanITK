import axios from "axios";
import { authHeader } from "../helpers/authservice/auth-header";
let Api = axios.create();
// let url = "http://perpustakaan_itk.test";
// let url = "  ";
// let url = "http://lumen-perpustakaanitk.test";
let url = "https://digilib.itk.ac.id/Lumen-PerpustakaanITK/public";
// let url = "https://10.32.8.83/Lumen-PerpustakaanITK/public";

// Api.defaults.withCredentials = true;
Api.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
Api.defaults.headers.common["Accept"] = "application/json";
Api.defaults.headers.common["Content-Type"] = "multipart/form-data";

// var user = JSON.parse(localStorage.getItem('user'))
var auth = authHeader();
Api.defaults.headers.common.Authorization = auth;

export { Api, url };
