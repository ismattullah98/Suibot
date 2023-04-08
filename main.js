const db = require('./database/database')
let Users = require('./Users');
require('dotenv').config();
let BOT_TOKEN = process.env.BOT_TOKEN;
const fs = require('fs')
var TelegramBot = require('node-telegram-bot-api');
var token = BOT_TOKEN;
var bot = new TelegramBot(token, {polling: true});


//BUTTON MeNU
/*bot.onText(/\/start/, (msg) => {
const chatId = msg.chat.id;
bot.sendMessage(chatId,'Welcome Guys🗿🗿🗿', {
reply_markup: {
keyboard: [
[{
text: 'Wallet',
} ,
{text :'Faucet💧💧',
callback_data: 'faucet'
}],
['My Balance'], [{text:'Buy me a Coffe',callback_data: 'SUI: 0x510c0e49352fde70eab8a4c6ae98b81571e8d5adadda5acc32659cab30e29c1e'},
],

],
one_time_keyboard: false
}
});
})
//callback query



//wipe All Chat
bot.on('message', (msg) => {
if (msg.text.toString().toLowerCase() == 'wallet') {
bot.sendMessage(msg.chat.id, 'Wallet Setting', {
reply_markup: {
keyboard: [
[{
text: 'SetWallet'
}, {
text: 'MyWallet'
}],
[{
text: 'Kembali'
}]
],

}
});
}if (msg.text.toString().toLowerCase() == 'kembali'){
  bot.sendMessage(msg.chat.id, 'Main Menu',
   {
reply_markup: {
keyboard: [
[{
text: 'Wallet',
} ,
{text :'Faucet💧💧',
callback_data: 'faucet'
}],
[{text:'/balance'}], [{text:'Buy me a Coffe',callback_data: 'SUI: 0x510c0e49352fde70eab8a4c6ae98b81571e8d5adadda5acc32659cab30e29c1e'},
],

],
one_time_keyboard: false
}
}
  )
}
//

});
*/

//Set-Up sui wallet
let isRecording = false;
let walletAddress = '';

/*bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Halo, silakan kirimkan perintah /setsuiwallet untuk memasukkan alamat wallet.');
});*/

bot.onText(/\/setsuiwallet/, (msg) => {
  isRecording = true;
  bot.sendMessage(msg.chat.id, 'Silakan masukkan alamat wallet:');
});

bot.on('message', (msg) => {
  if (isRecording) {
    walletAddress = msg.text;
    telegramId = msg.chat.id;
    console.log(telegramId,walletAddress)
    isRecording = false;
   const id = 1;
   const telegramId = msg.chat.id;
   const suiWallet = msg.text;

db.connect();

const query = `INSERT INTO users (id, telegramid, suiwallet) VALUES (${id}, '${telegramId}', '${suiWallet}')`;

db.query(query, (error, results, fields) => {
  if (error) throw error;
  console.log('Data berhasil ditambahkan ke dalam tabel');
});

db.end();
    
});
    
  }
});

//On click My Balance
/*bot.onText(/\/checkbalance/, (msg, match) => {
const chatId = msg.chat.id;
bot.sendMessage(chatId, 'Silahkan pilih jaringan:', reply_markup=InlineKeyboardMarkup([[InlineKeyboardButton('Devnet', callback_data='devnet',scale= 0.2), InlineKeyboardButton('Testnet', callback_data='testnet',scale= 0.2), InlineKeyboardButton('Mainnet', callback_data='mainnet',scale=0.2)]]))
});*/
