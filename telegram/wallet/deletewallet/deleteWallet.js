let query = require('../../../database/query')
let db = require('../../../database/database')

let deleteWallet = (bot)=>{
  bot.onText(/\/delete_(.*)/,(msg, match) =>{
    const chatId = msg.chat.id;
    console.log(msg)
    const input = match[1]; //

    const keyboard = {
      inline_keyboard: [
        [
          { text: 'CANCEL', callback_data: `canceldelete` },
          { text: 'DELETE', callback_data: `deletewallet_${input}` }
        ]
      ]
    };
    
    // Mengirim pesan dengan keyboard inline
    bot.sendMessage(chatId, 'Apakah Yakin ingin menghapus wallet: ', {
      reply_markup: keyboard
    });
  })
};


module.exports = {deleteWallet}