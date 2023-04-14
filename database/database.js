require('dotenv').config();
const mysql = require('mysql');
let db = process.env.DB;
let dbhost = process.env.DBHOST;
let username = process.env.DBUSERNAME;
let pw = process.env.DBPASSWORD;

const connection = mysql.createConnection({
host: dbhost,
user: username,
password: pw,
database: db
});
connection.connect((err) => {
if (err) throw err;
console.log('Koneksi berhasil');
});

module.exports = connection;