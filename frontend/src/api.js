import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const consultarContribuyente = (ruc) =>
  api.get(`/contribuyente/${ruc}`).then((r) => r.data);

export const consultarVehiculo = (placa) =>
  api.get(`/vehiculo/${placa}`).then((r) => r.data);

export const consultarLicencia = (cedula) =>
  api.get(`/licencia/${cedula}`).then((r) => r.data);