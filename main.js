const request = require('request');
const api = require('./api/sui');
const db = require('./database/database')
require('dotenv').config();
let BOT_TOKEN = process.env.BOT_TOKEN;
var TelegramBot = require('node-telegram-bot-api');
var token = BOT_TOKEN;
var bot = new TelegramBot(token, {polling: true});



//Set-Up sui wallet
let isRecording = false;
let walletAddress = '';

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Hallo,selamat Datang guys');
});
//view wallet Address
bot.onText(/\/suiwallet/,(msg)=>{
  const sql = `SELECT * FROM allusers WHERE telegramid = ?`
  db.query(sql,msg.chat.id,(err,result)=>{
   
    if(result.length>0){
      const chatId = msg.chat.id
      bot.sendMessage(chatId, result[0].suiwallet)
      console.log('wallet berhasil di tampilkan')
    }else{
      bot.sendMessage(msg.chat.id,'Lu Belum Setting Wallet asu🗿')
    }
  })
})
//
bot.onText(/\/setsuiwallet/, (msg) => {
  isRecording = true;
  text = msg.text
  bot.sendMessage(msg.chat.id, 'silahkan masukan Wallet address:');
});

bot.on('message', (msg) => {
  if (isRecording) {
   isRecording = false;
   chatId = msg.chat.id 
   const id = 0;
   const telegramId = msg.chat.id;
   const suiWallet = msg.text;
   
//Connect And Check to DB
  if (msg.text && msg.text.match(/^0x[a-fA-F0-9]{64}$/)) {
    // Insert user's data into MySQL database
    const find = `SELECT * FROM allusers WHERE telegramid = ?`
    db.query(find, msg.chat.id,(err,result)=>{
      if(result.length>0){
        //Update jika sudah daftar
        let update = "UPDATE allusers SET suiwallet = ? WHERE telegramid = ?"
        db.query(update,[msg.text,msg.chat.id],(err,result)=>{
          if(err) throw err;
          if(result){
            isRecording = false;
            console.log(result,msg.chat.id,chatId)
            bot.sendMessage(msg.chat.id,'Wallet berhasil di update')
          }
        })
      }else{
        const sql = `INSERT INTO allusers (id,telegramid, suiwallet) VALUES (${id},${msg.from.id}, '${msg.text}')`;
        db.query(sql, (err, result) => {
        if (err) throw err;
        isRecording = false;
        console.log('User data inserted into MySQL database');
        bot.sendMessage(chatId, 'Terima kasih, data wallet address telah berhasil disimpan!');
  
        });
      }
      
    })
    

    // Send a message to confirm successful data input
    
    
  }else{
    
    bot.sendMessage(chatId, 'Format wallet tidak valid, klik /setsuiwallet jika ingin mengulang kembali');
  }
  
  }
  
});

//check balance
// variabel global untuk menyimpan jaringan yang dipilih oleh user
let selectedNetwork = '';

// menangani command '/checkbalance'
bot.onText(/\/checkbalance/, (msg) => {
  // mengambil id chat
  let chatId = msg.chat.id;
  bot.deleteMessage(chatId, msg.text)
  // mengirim pesan untuk meminta user memilih jaringan
  bot.sendMessage(chatId, 'Silahkan pilih jaringan:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Devnet', callback_data: 'devnet' }],
        [{ text: 'Testnet', callback_data: 'testnet' }],
        [{ text: 'Mainnet(Soon)', callback_data: 'mainnet' }],
        [{ text: 'Close ❌❌❌',
        callback_data: 'close'}]
      ]
    }
  });
});

// menangani callback query dari user saat memilih jaringan
bot.on('callback_query', (query) => {
  let chatId = query.message.chat.id;
  selectedNetwork = query.data;

  // mengirim pesan untuk meminta user memasukkan input setelah memilih jaringan
  //Devnet
  if(selectedNetwork == 'devnet'){
  
// Make a request to the ipapi.com API
/*request('http://ipapi.com/json/', (err, response, body) => {
if (err) {
console.error(err);
return;
}
// Parse the response body 
const data = JSON.parse(body);
// Log IP address data
console.log(data);
});*/
  const ip = require('ip');
  const publicIp = ip.address();
  bot.sendMessage(chatId, 'Anda memilih jaringan ' + selectedNetwork + '. Wait A Second 🐒'+publicIp);
  //devnet
  bot.deleteMessage(chatId, query.message.message_id);  
  }
  //Testnet
  if(selectedNetwork == 'testnet'){
  bot.sendMessage(chatId, 'Anda memilih jaringan ' + selectedNetwork + '. Wait A Second 🐒');
  //testnet
  bot.deleteMessage(chatId, query.message.message_id);  
  }
  //Mainnet
  if(selectedNetwork == 'mainnet'){
  bot.sendMessage(chatId, 'Anda memilih jaringan ' + selectedNetwork + '. Wait A Second 🐒');
  //mainnet
  bot.deleteMessage(chatId, query.message.message_id);  
  }
  // menghapus keyboard yang muncul setelah user memilih jaringan
  
});

// menangani pesan dari user setelah memilih jaringan
bot.on('message', (msg) => {
  // hanya menangani pesan yang masuk setelah user memilih jaringan
  if (selectedNetwork !== '') {
    // mengambil id chat dan input dari user
    let chatId = msg.chat.id;
    let input = msg.text;

    // menampilkan input di console
    console.log(`User dengan id ${chatId} memasukkan input '${input}' untuk jaringan ${selectedNetwork}`);

    // mengirim balasan ke user
    /*bot.sendMessage(chatId, `Anda memasukkan input '${input}' untuk jaringan ${selectedNetwork}`);*/

    // mereset nilai selectedNetwork agar user dapat memilih jaringan lagi
    selectedNetwork = '';
  }
});
//Faucet Feature
bot.onText(/\/faucet/, (msg) => {
  // mengambil id chat
  let chatId = msg.chat.id;
  let ip = msg.from.ip
  console.log(msg)

  // mengirim pesan untuk meminta user memilih jaringan
  bot.sendMessage(chatId, 'Silahkan pilih jaringan: ', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Devnet', callback_data: 'faucetdevnet' }],
        [{ text: 'Testnet', callback_data: 'faucettestnet' }],
        [{ text: 'Close', callback_data: 'Close' }]
      ]
    }
  });
});

// menangani callback query dari user saat memilih jaringan
bot.on('callback_query', (query) => {
  let chatId = query.message.chat.id;
  selectedNetwork = query.data;
  if(selectedNetwork.toString().toLowerCase() == 'faucetdevnet'){
    bot.sendMessage(chatId, 'faucet devnet');
  }
  if(selectedNetwork.toString().toLowerCase() == 'faucettestnet'){
    bot.sendMessage(chatId, 'faucet testnet')
  }  
  // menghapus keyboard yang muncul setelah user memilih jaringan
  if(selectedNetwork.toString().toLowerCase() == 'close'){
  bot.deleteMessage(chatId, query.message.message_id);}
  selectedNetwork = '';
});




//Log all Error
bot.on("polling_error", console.log);
