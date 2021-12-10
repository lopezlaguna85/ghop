const axios = require('axios');

/*
* Llamada a la API ghoppruebacto
*/
module.exports.call = axios.create({
  baseURL:  "https://ghoppruebacto.ddns.net:8000/",
});