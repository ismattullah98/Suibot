const db = require('./database/database')
require('dotenv').config();
let BOT_TOKEN = process.env.BOT_TOKEN;
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
  text = msg.text
  bot.sendMessage(msg.chat.id, msg.chat.id);
});

bot.on('message', (msg) => {
  if (isRecording) {
    
   const id = 1;
   const telegramId = msg.chat.id;
   const suiWallet = msg.text;
   isRecording = false;
//Connect And Check to DB
  if (msg.text && msg.text.match(/^0x[a-fA-F0-9]{40}$/)) {
    // Insert user's data into MySQL database
    const sql = `INSERT INTO users (id,telegramid, suiwallet) VALUES (${id},${msg.from.id}, '${msg.text}')`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log('User data inserted into MySQL database');
    });

    // Send a message to confirm successful data input
    bot.sendMessage(chatId, 'Terima kasih, data wallet address telah berhasil disimpan!');
    
  }else{
    bot.sendMessage(chatId, 'Masukan Alamat Wallet dengan benar!');
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

  // mengirim pesan untuk meminta user memilih jaringan
  bot.sendMessage(chatId, 'Silahkan pilih jaringan:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Jaringan A', callback_data: 'A' }],
        [{ text: 'Jaringan B', callback_data: 'B' }],
        [{ text: 'Jaringan C', callback_data: 'C' }]
      ]
    }
  });
});

// menangani callback query dari user saat memilih jaringan
bot.on('callback_query', (query) => {
  let chatId = query.message.chat.id;
  selectedNetwork = query.data;

  // mengirim pesan untuk meminta user memasukkan input setelah memilih jaringan
  bot.sendMessage(chatId, 'Anda memilih jaringan ' + selectedNetwork + '. Silakan masukkan input:');

  // menghapus keyboard yang muncul setelah user memilih jaringan
  bot.deleteMessage(chatId, query.message.message_id);
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
    bot.sendMessage(chatId, `Anda memasukkan input '${input}' untuk jaringan ${selectedNetwork}`);

    // mereset nilai selectedNetwork agar user dapat memilih jaringan lagi
    selectedNetwork = '';
  }
});



bot.on('message',(msg)=>{
  console.log(msg.text)
})



//Log all Error
bot.on("polling_error", console.log);