const {call} = require("../lib/axios");

/*
* Llamada get a lectura de ghoppruebacto
*/
const lectura = async () => {
  const response = await call({
    method: "get",
    url: "lectura"
  });

  return response;
}
module.exports = lectura;