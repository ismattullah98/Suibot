const db = require('../../../database/database')
const query = require('../../../database/query')

let callbackEdit = (bot) => {
  bot.on('callback_query', (q) => {
    let chatId = q.message.chat.id;
    let userId = q.from.id;
    let action = q.data;

    //EDIT NAME WALLET
    if (action.startsWith('editname_')) {
      let input = action.slice(9);
      let data = {
        telegramId: userId,
        codeWallet: input
      };
      setTimeout(()=>{
        bot.deleteMessage(chatId,q.message.message_id)
      },500)
      //EDIT NAME EVM
      if(input.slice(0,3) == 'evm'){
        //CHECK CODE WALLET USER
      query.evm.findOneEvmByCodeWallet(db, data, (err, res) => {
        if (err) throw err;
        //jIKA ADA
        if (res.length == 1) {
          //console.log(res);
          //SEND MESSEGE
          bot.sendMessage(chatId, 'Masukan Nama Wallet:');
          //EVENT LISTENER
            const messageListener = (msg) => {
              let text = msg.text;
              let chatId = msg.chat.id;
              data.nameWallet = text;
              //UPDATE KE DATABASE
              query.evm.updateOneEvmNameByCode(db, data, (err, res) => {
                //JIKA GAGAL
                if (err) throw err;
                //JIKA BERHASIL
                if (res) {
                  console.log(res)
                  bot.sendMessage(chatId, 'Success, EVM Wallet Name Updated!!');
                  bot.removeListener('message', messageListener);
                }
              });
            }
            //LISTENING
            bot.on('message', messageListener);
        }else{
          //JIKA CODE WALLET SALAH
          bot.sendMessage(chatId, 'Invalid Code, Please Check Again')
        }
        });
      }
      //END OF EDIT NAME EVM//
      //EDIT NAME SUI
      if(input.slice(0,3)== 'sui'){
        //CHECK CODE WALLET USER
      query.sui.findOneSuiByCodeWallet(db, data, (err, res) => {
        if (err) throw err;
        //jIKA ADA
        if (res.length == 1) {
          //console.log(res);
          //SEND MESSEGE
          bot.sendMessage(chatId, 'Masukan Nama Wallet:');
          //EVENT LISTENER
            const messageListener = (msg) => {
              let text = msg.text;
              let chatId = msg.chat.id;
              data.nameWallet = text;
              //UPDATE KE DATABASE
              query.sui.updateOneSuiNameWalletByCode(db, data, (err, res) => {
                //JIKA GAGAL
                if (err) throw err;
                //JIKA BERHASIL
                if (res) {
                  console.log(res)
                  bot.sendMessage(chatId, 'Success, SUI Wallet Name Updated!!');
                  bot.removeListener('message', messageListener);
                }
              });
            }
            //LISTENING
            bot.on('message', messageListener);
        }else{
          //JIKA CODE WALLET SALAH
          bot.sendMessage(chatId, 'Invalid Code, Please Check Again')
        }
        });
      }
      //END OF EDIT NAME SUI////
      //EDIT NAME VENOM
      if(input.slice(0,5) == 'venom'){
        //CHECK CODE WALLET USER
      query.venom.findOneVenomByCode(db, data, (err, res) => {
        if (err) throw err;
        //jIKA ADA
        if (res.length == 1) {
          //console.log(res);
          //SEND MESSEGE
          bot.sendMessage(chatId, 'Masukan Nama Wallet:');
          //EVENT LISTENER
            const messageListener = (msg) => {
              let text = msg.text;
              let chatId = msg.chat.id;
              data.nameWallet = text;
              //UPDATE KE DATABASE
              query.venom.updateOneVenomNameByCode(db, data, (err, res) => {
                //JIKA GAGAL
                if (err) throw err;
                //JIKA BERHASIL
                if (res) {
                  console.log(res)
                  bot.sendMessage(chatId, 'Success, VENOM Wallet Name Updated!!');
                  bot.removeListener('message', messageListener);
                }
              });
            }
            //LISTENING
            bot.on('message', messageListener);
        }else{
          //JIKA CODE WALLET SALAH
          bot.sendMessage(chatId, 'Invalid Code, Please Check Again')
        }
        });
      }
      //END EDIT NAME VENOM
      
    }
    //EDITWALLET//
    if (action.startsWith('editwallet_')) {
      setTimeout(()=>{
        bot.deleteMessage(chatId,q.message.message_id)
      },500)
      const input = action.slice(11);
      let data = {
        telegramId: userId,
        codeWallet: input
      };
      //IF EVM FORMAT
      if(input.slice(0,3) == 'evm'){
        //Check Code User
        query.evm.findOneEvmByCodeWallet(db, data, (err, res) => {
          if (err) throw err;
          //Jika Ketemu
          if (res.length == 1) {
            //console.log(res);
            bot.sendMessage(chatId, 'Silahkan Masukkan EVM Wallet:');
            //Event Listener
            const messageListener = (msg) => {
              let text = msg.text;
              let chatId = msg.chat.id;
              data.evmWallet = text;
              if(data.evmWallet && data.evmWallet.match(/^0x[a-fA-F0-9]{40}$/)){
                query.evm.updateOneEvmWalletByCode(db, data, (err, res) => {
                  if (err) throw err;
                  if (res) {
                    bot.sendMessage(chatId, 'Success, EVM Wallet Updated!!');
                    bot.removeListener('message', messageListener);
                  }
                });
              }else{
                const messageOptions = {
                  reply_markup: {
                    inline_keyboard: [
                      [
                        { text: 'Cancel', callback_data: 'cancel' }
                      ]
                    ]
                  },
                  force_reply: true
                };
                bot.sendMessage(chatId, `Format Wallet Salah,Coba lagi? \n /edit_${input}`)
                bot.removeListener('message', messageListener);
              }
            };
            bot.on('message', messageListener);
          }else{
            bot.sendMessage(chatId, 'Invalid Code, Please Check Again')
            bot.deleteMessage(chatId,q.message.message_id);
          }
        });
      }
      //END EVM FORMAT//
      //SUI FORMAT//
      if(input.slice(0,3) =='sui'){
        query.sui.findOneSuiByCodeWallet(db, data, (err, res) => {
          if (err) throw err;
          //Jika Ketemu
          if (res.length == 1) {
            console.log(res);
            bot.sendMessage(chatId, 'Silahkan Masukkan SUI Wallet:');
            //Event Listener
            const messageListener = (msg) => {
              let text = msg.text;
              let chatId = msg.chat.id;
              data.suiWallet = text;
              if(data.suiWallet && data.suiWallet.match(/^0x[a-fA-F0-9]{64}$/)){
                query.sui.updateOneSuiWalletByCode(db, data, (err, res) => {
                  if (err) throw err;
                  if (res) {
                    bot.sendMessage(chatId, 'Success, SUI Wallet Updated!!');
                    bot.removeListener('message', messageListener);
                  }
                });
              }else{
                const messageOptions = {
                  reply_markup: {
                    inline_keyboard: [
                      [
                        { text: 'Cancel', callback_data: 'cancel' }
                      ]
                    ]
                  },
                  force_reply: true
                };
                bot.sendMessage(chatId, `Format Wallet Salah,Coba lagi? \n /edit_${input}`)
                bot.removeListener('message', messageListener);
              }
              
            };
            bot.on('message', messageListener);
          }else{
            bot.sendMessage(chatId, 'Invalid Code, Please Check Again')
            bot.deleteMessage(chatId,q.message.message_id);
          }
        });
      }
      //End SUI FORMAT
      //VENOM FORMAT
      if(input.slice(0,5) =='venom'){
        query.venom.findOneVenomByCode(db, data, (err, res) => {
          if (err) throw err;
          //Jika Ketemu
          if (res.length == 1) {
            //console.log(res);
            bot.sendMessage(chatId, 'Silahkan Masukkan VENOM Wallet:');
            //Event Listener
            const messageListener = (msg) => {
              let text = msg.text;
              let chatId = msg.chat.id;
              data.venomWallet = text;
              if(data.venomWallet && data.venomWallet.match(/^0:[a-fA-F0-9]{64}$/)){
                query.venom.updateOneVenomByCode(db, data, (err, res) => {
                  if (err) throw err;
                  if (res) {
                    bot.sendMessage(chatId, 'Success, VENOM Wallet Updated!!');
                    bot.removeListener('message', messageListener);
                  }
                });
              }else{
                const messageOptions = {
                  reply_markup: {
                    inline_keyboard: [
                      [
                        { text: 'Cancel', callback_data: 'cancel' }
                      ]
                    ]
                  },
                  force_reply: true
                };
                bot.sendMessage(chatId, `Format Wallet Salah,Coba lagi? \n /edit_${input}`)
                bot.removeListener('message', messageListener);
              }
              
            };
            bot.on('message', messageListener);
          }else{
            bot.sendMessage(chatId, 'Invalid Code, Please Check Again')
            bot.deleteMessage(chatId,q.message.message_id);
          }
        });
      }
      //End VENOM FORMAT///
      //bot.sendMessage(chatId, 'beralih ke cancel')
      //action = 'cancel'

    }
    if(action === 'cancel'){
      bot.sendMessage(chatId, 'cancelled')
      //bot.on('message', messageListener);
      bot.deleteMessage(chatId,q.message.message_id)
    }
})
}

module.exports = callbackEdit
