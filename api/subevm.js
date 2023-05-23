const mysql = require('mysql');
const io = require('socket.io-client');
// Connect to MySQL database
const connection = require('../database/database');
const Web3 = require('web3');
const { showWallet } = require('../telegram/wallet/showWallet');
 
const q = `SELECT evmwallet, blockchain FROM ${process.env.TABLE_W_EVM}`;

const web3Providers = [
  new Web3.providers.WebsocketProvider('wss://mainnet.era.zksync.io/ws'), // Websocket provider for mainnet
  new Web3.providers.WebsocketProvider('wss://testnet.era.zksync.dev/ws') // Websocket provider for Rinkeby testnet
  // Add more Websocket providers for other blockchains here
];

let subscriptions = []; // Array of subscription objects

// Fungsi untuk memulai langganan untuk setiap jaringan blockchain
function startSubscriptions() {
  for (let i = 0; i < web3Providers.length; i++) {
    const web3 = new Web3(web3Providers[i]);
    const providerName = getProviderName(i); // Mendapatkan nama jaringan blockchain berdasarkan indeks

    const subscription = web3.eth.net.isListening().then(() => {
      console.log(`Terhubung ke Websocket ${providerName}`);
      connection.query(q, [providerName], (err, res) => {
        if (err) {
          console.log(`Gagal Mengambil Data ${providerName}`);
          return;
        }
        const addressesToMonitor = res.map(row => row.evmwallet.toLowerCase());
        startTransactionMonitoring(web3, addressesToMonitor, providerName);
      });
    }).catch((error) => {
      console.log(`Tidak dapat terhubung ke websocket ${providerName}`, error);
    });

    subscriptions.push(subscription);
  }
}

// Fungsi untuk memulai pemantauan transaksi pada jaringan blockchain tertentu
function startTransactionMonitoring(web3, addressesToMonitor, providerName) {
  // web3.eth.subscribe('pendingTransactions')
  //   .on('data', txHash => {
  //     web3.eth.getTransaction(txHash, (err, txResult) => {
  //       if (!err && txResult && addressesToMonitor.includes(txResult.to.toLowerCase())) {
  //         console.log(`Transaksi masuk di ${providerName}:`, txResult);
  //       }
  //     });
  //   })
  //   .on('error', err => {
  //     console.error(`Error websocket ${providerName}:`, err);
  //   });
  web3.eth.subscribe('newBlockHeaders')
  .on('data', blockHeader => {
    web3.eth.getBlock('latest', true, (err, block) => {
      if (!err && block && block.transactions) {
        block.transactions.forEach(tx => {
          if (addressesToMonitor.includes(tx.to.toLowerCase())) {
            console.log(`Transaksi masuk di ${providerName}:`, tx);
          }
        });
      }
    });
  })
  .on('error', err => {
    console.error(`Error websocket ${providerName}:`, err);
  });

}

// Fungsi untuk mendapatkan nama jaringan blockchain berdasarkan indeks
function getProviderName(index) {
  switch (index) {
    case 0:
      return 'ZkSync Mainnet';
    case 1:
      return 'ZKSync Testnet';
    // Add more provider names for other blockchains here
    default:
      return `Blockchain-${index}`;
  }
}

// Memulai langganan untuk setiap jaringan blockchain
startSubscriptions();

module.exports = { subscriptions };
