// const mysql = require('mysql');
// const io = require('socket.io-client');
// // Connect to MySQL database
// const connection = require('../database/database')
// const Web3 = require('web3');
// const { showWallet } = require('../telegram/wallet/showWallet');
// // Inisialisasi provider Web3
// const url = process.env.WSS_POLYGON
// const web3 = new Web3(new Web3.providers.WebsocketProvider(url))

 
// const q = `SELECT evmwallet FROM ${process.env.TABLE_W_EVM}`
// const wallet = ['0x9A8025240Dad844214A854e5dF0651378F71c5aC']

// const subPolygon = web3.eth.net.isListening().then(()=>{
//   console.log('terhubung ke Websocket POLYGON');
//   connection.query(q,(err,res)=>{
//     if(err){console.log('Gagal Mengambil Data')
//     return res;  
//   }
//   const addressesToMonitor = res.map(row=> row.evmwallet)
//   web3.eth.subscribe('pendingTransactions').on('data',(txHash)=>{
//    web3.eth.getTransaction(txHash, (err,txResult)=>{
//      //console.log(addressesToMonitor)
//      console.log(txResult)
//      if(!err && txResult && addressesToMonitor.includes(txResult.to)){
//        /*const weiValue = txResult.value;
//        const etherValue = parseInt(weiValue) / 10**18;
//        console.log(etherValue);*/

//        console.log('transaksi masuk : ', txResult )
//      }
//    })
//     }).on('error',(err)=>{
//         console.error('error websocket', err)
//       })  
//   })
//   }).catch((error)=>{
//     if(error){
//       console.log('tidak dapat terhubung ke websocket', error)
//     }


// })


// module.exports = {subPolygon};