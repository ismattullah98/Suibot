require('dotenv').config();
const mysql = require('mysql');
let USERNAME = process.env.DBUSERNAME;
let PW = process.env.DBPASSWORD;
console.log(USERNAME,PW)
const connection = mysql.createConnection({
host: 'localhost',
user: USERNAME,
password: PW,
database: 'suibot'
});
connection.connect((err) => {
if (err) throw err;
console.log('Koneksi berhasil');
});

module.exports = connection;