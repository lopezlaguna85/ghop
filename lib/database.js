const mariadb = require('mariadb');

/*
* Conexión a la BBDD
*/
const pool = mariadb.createPool({
  host: process.env.DB_HOST, 
  user:process.env.DB_USER, 
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  connectionLimit: 5
});

/*
* Función para insertar una nueva linea de productos en la tabla tlecturas
*/
const insertLectura = async (data) => {
  let conn;
  let res = "";
  try {
    conn = await pool.getConnection();
    const ins = "INSERT INTO tlecturas (nombre, productos) VALUES ('Óscar','" + data + "')";
    res = await conn.query(ins);
  } catch (err) {
    console.log(err)
	  throw err;
  } finally {
	  if (conn)  {
      conn.end();
      return res;
    }
  }
};
module.exports.insertLectura = insertLectura;

/*
* Función para insertar una nueva linea de lectura en la tabla ttpv
*/
const insertTpv = async (lectura, nombre, productos, confirmado) => {
  let conn;
  let res;
  try {
    conn = await pool.getConnection();
    let query = "INSERT INTO ttpv (lectura, nombre, productos, confirmado) VALUES (" + lectura;
    query += ",'" + nombre;
    query += "','" + productos;
    query += "'," + confirmado + ");";

    res = await conn.query(query);

    return res;
  } catch (err) {
    console.log(err);
	  throw err;
  } finally {
	  if (conn) {
      conn.end()
      return res;
    }
  }
};
module.exports.insertTpv = insertTpv;

/*
* Función para actualizar una linea de la tabla ttpv tras recibir confirmación del tpv
*/
const updateTpvConf = async (data) => {
  let conn;
  let res;
  try {
    conn = await pool.getConnection();
    const query = "UPDATE ttpv SET confirmado=1 WHERE peticion=" + data;
    res = await conn.query(query);
    return res;
  } catch (err) {
    console.log(err);
	  throw err;
  } finally {
	  if (conn) {
      conn.end()
      return res;
    }
  }
};
module.exports.updateTpvConf = updateTpvConf;