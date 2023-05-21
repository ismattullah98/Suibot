
require('dotenv').config();
const request = require('request');
const api = require('./api/eth');
const db = require('./database/database')
const query = require('./database/query')
const tele = require('./telegram/menu')
let BOT_TOKEN = process.env.BOT_TOKEN;
var TelegramBot = require('node-telegram-bot-api');
const { showWallet } = require('./telegram/wallet/showWallet');
const { addWallet } = require('./telegram/wallet/addWallet');
var token = BOT_TOKEN;
var bot = new TelegramBot(token, {polling: true});
//Menu

tele.telegram.menu(bot);
tele.telegram.callbackQuery(bot);

//Set-Up sui wallet
let isRecording = false;
let walletAddress = '';

bot.onText(/\/start/, (msg) => {
  let data = {
    telegramId: msg.chat.id
  }
  query.allusers.findOneUser(db,data,(err,res)=>{
    if(res == 0){
      query.allusers.createOneUser(db,msg.chat.id,(err,result)=>{
        if(err) throw err;
        if(result){
          console.log(result); 
          bot.sendMessage(msg.chat.id, 'Hallo,selamat Datang ');
        }
      })
    }if(res.length === 1){
      console.log(msg)
      bot.sendMessage(msg.chat.id, `yoo,welcome back ${msg.chat.first_name} Dancuk!!!`)
    }
  })
 
});
//VIEW EVM WALLET ADDRESS
bot.onText(/\/evmwallet/,(msg)=>{
  //PREPARED DATA
  let data = {
    telegramId: msg.chat.id
  }
  showWallet.evm(db,bot,data)
})
//SETTING-UP EVM WALLET ADDRESS
bot.onText(/\/setevmwallet/, (msg)=>{
isRecording= true
  let data = {
    telegramId: msg.chat.id
  }
 addWallet.evm(db,bot,data);
});

//EditWallet 
bot.onText(/\/edit_(\w+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const code = match[1]; // Mendapatkan kode dari grup penangkapan (\w+)

  // Ambil data dari database berdasarkan kode yang diperoleh
  // Contoh: Mengambil data dari database berdasarkan kode dan melakukan tindakan lain sesuai kebutuhan Anda

  // Kirim pesan balasan ke pengguna
  bot.sendMessage(chatId, `Perintah edit dengan kode: ${code}`);
});
//view SUI wallet Address
bot.onText(/\/suiwallet/,(msg)=>{
  data = {
    telegramId: msg.chat.id
  }
  showWallet.sui(db,bot,data)
})
// SETTING-UP SUI WALLET
bot.onText(/\/setsuiwallet/, (msg) => {
  data = {
    telegramId : msg.chat.id
  }
  addWallet.sui(db,bot,data)
});

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
  
  bot.sendMessage(chatId, 'Anda memilih jaringan ' + selectedNetwork + '. Wait A Second 🐒');
  //devnet
  bot.deleteMessage(chatId, query.message.message_id);  
  }
  //Testnet
  if(selectedNetwork == 'testnet'){
  bot.sendMessage(chatId, 'Anda memilih jaringan ' + selectedNetwork + '. `Wait A Second 🐒`', {parse_mode: 'Markdown'});
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
