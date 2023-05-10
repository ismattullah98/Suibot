const mysql = require('mysql');
const io = require('socket.io-client');
// Connect to MySQL database
const connection = require('../database/database')
// Connect to WebSocket for network1
const socket1 = io('https://network1.infura.io/ws/v3/your-project-id');
socket1.on('connect', () => {
  console.log('Connected to network1 WebSocket!');
});

// Connect to WebSocket for network2
const socket2 = io('https://network2.infura.io/ws/v3/your-project-id');
socket2.on('connect', () => {
  console.log('Connected to network2 WebSocket!');
});

// Define a function to query daftar wallet dari database setiap kali terjadi perubahan pada tabel wallet
function subscribeToWalletChanges() {
  connection.query(`SELECT evmwallet FROM ${tableEvm}`, (err, rows) => {
    if (err) throw err;

    // Convert result rows to array of wallet addresses
    const wallets = rows.map((row) => row.evmwallet);
    console.log(wallets)
    // Subscribe to new transactions on network1 for the wallets in the list
    socket1.emit('subscribe', { method: 'eth_subscribe', params: ['newPendingTransactions', { address: wallets }] });
    socket1.on('pendingTransactions', (txs) => {
      console.log(`Received ${txs.length} new transactions from network1 for wallets ${wallets}!`);

      // Save transactions to MySQL database
      txs.forEach((tx) => {
        connection.query(`INSERT INTO transactions (network, hash, from_address, to_address, value) 
          VALUES (?, ?, ?, ?, ?)`, ['network1', tx.hash, tx.from, tx.to, tx.value], (err) => {
            if (err) throw err;
            console.log(`Saved transaction ${tx.hash} to MySQL database!`);
          });
      });
    });

    // Subscribe to new transactions on network2 for the wallets in the list
    socket2.emit('subscribe', { method: 'eth_subscribe', params: ['newPendingTransactions', { address: wallets }] });
    socket2.on('pendingTransactions', (txs) => {
      console.log(`Received ${txs.length} new transactions from network2 for wallets ${wallets}!`);

      // Save transactions to MySQL database
      txs.forEach((tx) => {
        connection.query(`INSERT INTO transactions (network, hash, from_address, to_address, value) 
          VALUES (?, ?, ?, ?, ?)`, ['network2', tx.hash, tx.from, tx.to, tx.value], (err) => {
            if (err) throw err;
            console.log(`Saved transaction ${tx.hash} to MySQL database!`);
          });
      });
    });
  });
}

// Call the function to subscribe to wallet changes and transactions
subscribeToWalletChanges();
