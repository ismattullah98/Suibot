const mysql = require('mysql');
const io = require('socket.io-client');
// Connect to MySQL database
const connection = require('../database/database');
const Web3 = require('web3');
const { showWallet } = require('../telegram/wallet/showWallet');
const { subEvm } = require('./web3/subevm');
 
const q = `SELECT evmwallet FROM ${process.env.TABLE_W_EVM}`;

const web3Providers = [
  new Web3.providers.WebsocketProvider('wss://mainnet.era.zksync.io/ws'), // Websocket provider for mainnet
  new Web3.providers.WebsocketProvider('wss://testnet.era.zksync.dev/ws'), // Websocket provider for Rinkeby testnet
  new Web3.providers.WebsocketProvider(process.env.WSS_OP),// Websocket provider for Rinkeby testnet
  new Web3.providers.WebsocketProvider(process.env.WSS_POLYGON), // Websocket provider for Rinkeby testnet
  // Add more Websocket providers for other blockchains here
];

let subscriptions = []; // Array of subscription objects

// Fungsi untuk memulai langganan untuk setiap jaringan blockchain
function startSubscriptions(bot) {
  for (let i = 0; i < web3Providers.length; i++) {
    const web3 = new Web3(web3Providers[i]);
    const providerName = getProviderName(i); // Mendapatkan nama jaringan blockchain berdasarkan indeks
    
    const subscription = web3.eth.net.isListening().then(() => {
      console.log(`Terhubung ke Websocket ${providerName.name}`);
      connection.query(q, (err, res) => {
        if (err) {
          console.log(`Gagal Mengambil Data ${providerName.name}`);
          return;
        }
        const addressesToMonitor = res.map(row => row.evmwallet);
        startTransactionMonitoring(web3, addressesToMonitor, providerName,bot);
      });
    }).catch((error) => {
      console.log(`Tidak dapat terhubung ke websocket ${providerName.name}`, error);
    });

    subscriptions.push(subscription);
  }
}

// Fungsi untuk memulai pemantauan transaksi pada jaringan blockchain tertentu
function startTransactionMonitoring(web3, addressesToMonitor, providerName,bot) {
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
    web3.eth.getBlock(blockHeader.number, true, (err, block) => {
      if (!err && block && block.transactions) {
        block.transactions.forEach(tx => {
          //console.log(tx)
          if (addressesToMonitor.includes(tx.to)) {
            if (tx.input !== '0x') {
              const inputData = web3.eth.abi.decodeParameters(['address', 'uint256'], tx.input);
              const tokenAddress = inputData[0];
              const tokenAmount = inputData[1];
              console.log('Token Address:', tokenAddress);
              console.log('Token Amount:', tokenAmount);
            }
            subEvm.findByWalet(tx,providerName,bot,web3)
            console.log(`Transaksi masuk di ${providerName.name}:`, tx);
          }
        });
      }
    });
  })
  .on('error', err => {
    console.error(`Error websocket ${providerName.name}:`, err);
  });

}

// Fungsi untuk mendapatkan nama jaringan blockchain berdasarkan indeks
function getProviderName(index) {
  switch (index) {
    case 0:
      return {
      name: 'ZKSYNC',
      explorer: 'https://explorer.zksync.io/',
      symbol: 'ETH'
    };
    case 1:
      return {
        name: 'ZKSYNC TESTNET',
        explorer: 'https://goerli.explorer.zksync.io/',
        symbol: 'ETH'
      };
    case 2:
      return {
        name: 'OPTIMISM',
        explorer: 'https://explorer.optimism.io/',
        symbol: 'ETH'
      };
    case 3:
      return {
        name: 'POLYGON TESTNET',
        explorer: 'https://mumbai.polygonscan.com/',
        symbol: 'MATIC'
      };
    
    // case 4:
    //   return {
    //     name: 'FANTOM',
    //     explorer: 'https://goerli.explorer.zksync.io/',
    //     symbol: 'FTM'
    //   };
    // case 5:
    //   return {
    //     name: 'STARKNET',
    //     explorer: 'https://goerli.explorer.zksync.io/',
    //     symbol: 'ETH'
    //   };
    
    // Add more provider names for other blockchains here
    default:
      return `Blockchain-${index}`;
  }
}

// Memulai langganan untuk setiap jaringan blockchain
//startSubscriptions();

module.exports = { subscriptions, startSubscriptions };
