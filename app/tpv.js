const {call} = require("../lib/axios");

/*
* Llamada post a tpv de ghoppruebacto
*/
const tpv = async (lectura) => {
  const response = await call({
    method: "post",
    url: "tpv",
    data: lectura
  });
  
  return response;
}
module.exports = tpv;