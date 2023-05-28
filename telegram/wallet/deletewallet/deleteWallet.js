let query = require('../../../database/query')
let db = require('../../../database/database')

let deleteWallet = (bot) => {
  bot.onText(/\/delete_(.*)/, (msg, match) => {
    const chatId = msg.chat.id;
    const input = match[1];
    let data = {
      telegramId: chatId,
      codeWallet: input
    }
    const keyboard = {
      inline_keyboard: [
        [
          { text: 'CANCEL', callback_data: `canceldelete_${input}` },
          { text: 'DELETE', callback_data: `deletewallet_${input}` }
        ]
      ]
    };
    bot.sendMessage(chatId, 'Are you sure you want to delete?', {
      reply_markup: keyboard
    });

    // CALLBACK HANDLER
    const callbackListener = (q) => {
      let chatId = q.message.chat.id;
      let action = q.data;

      if (action.startsWith('deletewallet_')) {
        setTimeout(()=>{
          bot.deleteMessage(chatId, q.message.message_id )
        },700)
        let input = action.slice(13);
        if (input === match[1]) {
            if(input.slice(0,3)==='evm'){
              data.evmWalet = input
              query.evm.findOneEvmByCodeWallet(db,data,(err,res)=>{
                if(res.lenth>0){
                  query.evm.deleteOneEvmByCode(db,data,(err,res)=>{
                    //console.log(res)
                    bot.sendMessage(chatId, 'Success Delete Your Wallet')
                    action = 'backtomenu'
                    
                  })
                  
                }
                if(res==0){
                  setTimeout(()=>{bot.deleteMessage(chatId,q.message.message_id)},300)
                  bot.sendMessage(chatId, 'Code Wallet Invalid or no Wallet Matched with that')
                }
                
              })
            }
            if(input.slice(0,3)==='sui'){
              data.codeWallet = input
              console.log(data.suiWallet)
              query.sui.findOneSuiByCodeWallet(db,data,(err,r)=>{
                if(r.length>0){
                  
                  query.sui.deleteOneSuiByCode(db,data,(err,res)=>{
                    bot.sendMessage(chatId, `${r[0].namewallet? r[0].namewallet:r[0].suiwallet.slice(0,5)+'...'+r[0].suiwallet.slice(-2)}: \n${r[0].suiwallet} \n Successfully Deleted`)
                  });

                }else{
                  bot.sendMessage(chatId, 'Code Wallet Invalid or no Wallet Matched with that')
                }
              });
            }
            if(input.slice(0,5)==='venom'){
              data.codeWallet = input
              //console.log(data.codeWallet)
              query.venom.findOneVenomByCode(db,data,(err,r)=>{
                if(r.length>0){
                  //console.log(r)
                  query.venom.deleteOneVenomByCode(db,data,(err,res)=>{
                    //console.log(res)
                    if(res.affectedRows == 1){
                      bot.sendMessage(chatId, `${r[0].namewallet? r[0].namewallet:r[0].venomwallet.slice(0,5)+'...'+r[0].venomwallet.slice(-2)}: \n${r[0].venomwallet} \n Successfully Deleted`)
                      bot.deleteMessage(chatId,q.message.message_id)
                    }
                  })
                }
                if(r.length == 0){
                  bot.sendMessage(chatId, 'Code Wallet Invalid or no Wallet Matched with that')
                }
              })
            }

          //bot.sendMessage(chatId, 'Wallet deleted successfully');
        }
      } else if (action.startsWith('canceldelete_')) {
        setTimeout(()=>{
          bot.deleteMessage(chatId, q.message.message_id )
        },700)
        let input = action.slice(13);
        if (input === match[1]) {
          bot.sendMessage(chatId, 'Cancelled, Click /menu to open the menu');
        }
      }

      bot.removeListener('callback_query', callbackListener);
    };

    bot.on('callback_query', callbackListener);
  });
};





module.exports = {deleteWallet}