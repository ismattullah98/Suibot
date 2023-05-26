
require('dotenv').config();
//const request = require('request');
const apiWeb3 = require('./api/subevm');
require('./api/polygon')
//apiBlast = require('./api/blastapi/blastevm')
const db = require('./database/database')
const query = require('./database/query')
const tele = require('./telegram/menu')
let BOT_TOKEN = process.env.BOT_TOKEN;
var TelegramBot = require('node-telegram-bot-api');
const {deleteWallet} = require('./telegram/wallet/deletewallet/deleteWallet')
const { showWallet } = require('./telegram/wallet/showWallet');
const { addWallet } = require('./telegram/wallet/addwallet/addWallet');
const { subscribe } = require('./api/blastapi/blastevm');
const { editWallet } = require('./telegram/wallet/editwallet/editWallet');
const callbackEdit = require('./telegram/wallet/editwallet/callbackData');
var token = BOT_TOKEN;
var bot = new TelegramBot(token, {polling: true});
//Menu
tele.telegram.menu(bot);
tele.telegram.callbackQuery(bot);
//Subscribe WEB3
apiWeb3.startSubscriptions(bot);
//Set-Up sui wallet
let isRecording = false;
let walletAddress = '';

bot.onText(/\/start/, (msg) => {
  let data = {
    telegramId: msg.chat.id
  }
  let fullName = msg.chat.first_name+' '+msg.chat.last_name
  query.allusers.findOneUser(db,data,(err,res)=>{
    if(res.length ==0){
      query.allusers.createOneUser(db,msg.chat.id,(err,result)=>{
        if(err) throw err;
        if(result){
          //console.log(result); 
          bot.sendMessage(msg.chat.id, 'Hallo,selamat Datang'+fullName);
        }
      })
    }if(res.length >= 1){
      //console.log(msg)
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
//DELETE WALLET
deleteWallet(bot)
//EditWallet 
bot.onText(/\/edit_(.*)/, (msg, match) => {
  const chatId = msg.chat.id;
  //console.log(msg)
  const input = match[1]; // Mendapatkan input setelah "/edit_evm_"

  // Membuat keyboard inline dengan tombol "editname" dan "editwallet"
  const keyboard = {
    inline_keyboard: [
      [
        { text: 'Edit Name', callback_data: `editname_${input}` },
        { text: 'Edit Wallet', callback_data: `editwallet_${input}` }
      ]
    ]
  };

  // Mengirim pesan dengan keyboard inline
  bot.sendMessage(chatId, 'Pilih opsi yang ingin Anda edit:', {
    reply_markup: keyboard
  });
});
callbackEdit(bot)

  
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
