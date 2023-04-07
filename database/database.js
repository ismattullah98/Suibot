require('dotenv').config();
const mysql = require('mysql');
let username = process.env.DBUSERNAME;
let pw = process.env.DBPASSWORD;
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
console.log(username,pw)
});

module.exports = connection;