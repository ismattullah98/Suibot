let Users = require('./Users');
const fs = require('fs')
var TelegramBot = require('node-telegram-bot-api');
var token = '5910387173:AAFqnLQGVdwj7a-ms2x06-LDb7s2rJJTPqA';
var bot = new TelegramBot(token, {polling: true});
//BUTTON MeNU
bot.onText(/\/start/, (msg) => {
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

//

//blacklist word
bot.onText(/\/clear/, function (msg) {
bot.deleteMessage(msg.chat.id, msg.message_id);
});

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
    isRecording = false;
    let dataOBJ ={telegramId: telegramId, suiWallet: walletAddress}
    Users.Users.push(dataOBJ);
    console.log('Alamat wallet:', walletAddress);
    bot.sendMessage(msg.chat.id, 'Wallet Saved♒');
  }
});