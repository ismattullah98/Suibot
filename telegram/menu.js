let telegram = {
    menu: (bot)=>{
        bot.onText(/\/menu/,(msg)=>{
            bot.sendMessage(msg.chat.id,'select what do you want to do:',{
                reply_markup:{
                    inline_keyboard: [
                        [{text: 'wallet',callback_data: 'wallet',scale: 0.5}],
                        [{text: 'Coin/Token price',callback_data: 'coinprice', scale: 0.5}],
                        [{text: 'Get Premium',callback_data: 'premium', scale: 1}],

                    ]
                }
            })
        })
    },
    callbackQuery:(bot)=>{
        bot.on('callback_query', (query)=>{
            let chatId = query.message.chat.id;
            selectedQuery = query.data;
            //WALLET
            if(selectedQuery.toString().toLowerCase() == 'wallet'){
                bot.deleteMessage(chatId,query.message.message_id)
                selectedQuery = 'menuwallet'
            }
            //COINPRICE
            if(selectedQuery.toString().toLowerCase() == 'coinprice'){
                bot.deleteMessage(chatId,query.message.message_id)
                bot.sendMessage(chatId, 'coinprice')
            }
            //PREMIUM 
            if(selectedQuery.toString().toLowerCase() == 'premium'){
                bot.deleteMessage(chatId,query.message.message_id)
                bot.sendMessage(chatId, 'premium')
            }
            //MENU WALLET
            if(selectedQuery.toString().toLowerCase() == 'menuwallet'){
                bot.sendMessage(chatId, 'wallet settings: ',{reply_markup:{
                    inline_keyboard: [
                        [{text: 'show wallet',callback_data: 'showwallet'},
                        {text: 'edit wallet',callback_data: 'editwallet'}],
                        [{text: 'CLOSE',callback_data: 'close'}]

                    ]
                }})

            }
            //MENU SHOW WALLET


        })
    }
}


module.exports = {telegram}