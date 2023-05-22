const mysql = require('mysql');
const io = require('socket.io-client');
// Connect to MySQL database
const connection = require('../database/database')
const Web3 = require('web3');
const { showWallet } = require('../telegram/wallet/showWallet');
// Inisialisasi provider Web3
const zkera = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.era.zksync.io/ws'))
const url = 'wss://mainnet.infura.io/ws/v3/ec80a9cd5f204e4bb84fec2204615708'

const q = `SELECT evmwallet FROM ${process.env.TABLE_W_EVM}`
const wallet = ['0x9A8025240Dad844214A854e5dF0651378F71c5aC']

connection.query(q,(err,res)=>{
  if(err){console.log('Gagal Mengambil Data')
  return res;  
}
const subscription = zkera.eth.net.isListening().then(()=>{
  console.log('terhubung ke Websocket');
  
  const addressesToMonitor = res.map(row=> row.evmwallet)
  console.log(addressesToMonitor)
  zkera.eth.subscribe('pendingTransactions').on('data',(txHash)=>{
   zkera.eth.getTransaction(txHash, (err,txResult)=>{
    // console.log(txResult)
     if(!err && txResult && addressesToMonitor.includes(txResult.to.toLowerCase())){
       /*const weiValue = txResult.value;
       const etherValue = parseInt(weiValue) / 10**18;
       console.log(etherValue);*/

       console.log('transaksi masuk : ', txResult )
     }
   })
    }).on('error',(err)=>{
        console.error('error websocket', err)
      })  
  })
  }).catch((error)=>{
    if(error){
      console.log('tidak dapat terhubung ke websocket', error)
    }


})


module.exports = {subscription};