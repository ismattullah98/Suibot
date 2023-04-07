require('dotenv').config();
const mysql = require('mysql');
let USERNAME = process.env.DBUSERNAME;
let PW = process.env.DBPASSWORD;
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
connection.query('CREATE DATABASE suibot1', function(err, rows, fields) { 
if (err) throw err; 
console.log('Database suibot berhasil dibuat!');
})

