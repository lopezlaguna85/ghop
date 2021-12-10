const express = require('express');
const { insertLectura, insertTpv, updateTpvConf } = require('./lib/database');
const lectura = require('./app/lectura');
const tpv = require('./app/tpv');
require('dotenv').config();

const app = express();

/*
* Función principal que se lanzará cada segundo buscando nuevas lecturas
*/
const main = async () => {
  let lect = await lectura();
  
  if (lect != null && lect != "") {
    const insLect = await insertLectura(JSON.stringify(lect.data.productos));
    const insTpv = await insertTpv(insLect.insertId, "Oscar", JSON.stringify(lect.data.productos), 0);
    let res = "";
    while (res = "") {
        res = await tpv(lect);
    }
    await updateTpvConf(insTpv.insertId);
  } 
 
  setTimeout(main,1000);
}

/*
* Llamada a la función main desde la web
*/
app.get('/', async (req, res) => {
  main();
  res.send('Ghop!');
});

/*
* Puerto de escucha
*/
app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});
