let q = require('../database/query');
let db = require('../database/database');
const {addWallet } = require('./wallet/addWallet');
const {editWallet} = require('./wallet/editWallet');
const { showWallet } = require('./wallet/showWallet');

let telegram = {
    menu: (bot)=>{
        bot.onText(/\/menu/,(msg)=>{
            bot.sendMessage(msg.chat.id,'select what do you want to do:',{
                reply_markup:{
                    inline_keyboard: [
                        [
                            {text: 'Wallet',callback_data: 'wallet',scale: 0.5},
                            {text: 'Coin/Token price',callback_data: 'coinprice', scale: 0.5}
                        ],
                        [{text: 'Get Premium',callback_data: 'premium', scale: 1}],
                        [{text: 'CLOSE',callback_data: 'close'}]

                    ]
                }
            })
        })
    },
    callbackQuery:(bot)=>{
        bot.on('callback_query', (query)=>{
            let chatId = query.message.chat.id;
            selectedQuery = query.data;
            //MENU
            if(selectedQuery.toString().toLowerCase() == 'backtomenu'){
                bot.deleteMessage(chatId,query.message.message_id)
                bot.sendMessage(chatId,'select what do you want to do:',{
                    reply_markup:{
                        inline_keyboard: [
                            [
                                {text: 'Wallet',callback_data: 'wallet',scale: 0.5},
                                {text: 'Coin/Token price',callback_data: 'coinprice', scale: 0.5}
                            ],
                            [{text: 'Get Premium',callback_data: 'premium', scale: 1}],
                            [{text: 'CLOSE',callback_data: 'close'}]
    
                        ]
                    }
                })
            }
            //END OF MENU
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
            //WALLET->MENU WALLET
            if(selectedQuery.toString().toLowerCase() == 'menuwallet'){
                //bot.deleteMessage(chatId,query.message.message_id)
                bot.sendMessage(chatId, 'wallet settings: ',{reply_markup:{
                    inline_keyboard: [
                        [{text: 'Show Wallet',callback_data: 'showwallet'},
                        {text: 'Edit Wallet',callback_data: 'editwallet'}],
                        [{text: 'Add Wallet',callback_data: 'Addwallet'},
                        {text: 'Delete Wallet',callback_data: 'deletewallet'}],
                        [{text: 'CLOSE',callback_data: 'close'}],
                        [{text: 'BACK',callback_data: 'backtomenu'}]

                    ]
                }})

            }
            //BACK TO MENU WALLET
            if(selectedQuery.toString().toLowerCase() == 'backtomenuwallet'){
                bot.deleteMessage(chatId,query.message.message_id)
                bot.sendMessage(chatId, 'wallet settings: ',{reply_markup:{
                    inline_keyboard: [
                        [{text: 'Show wallet',callback_data: 'showwallet'},
                        {text: 'Edit wallet',callback_data: 'editwallet'}],
                        [{text: 'Add wallet',callback_data: 'Addwallet'},
                        {text: 'Delete wallet',callback_data: 'deletewallet'}],
                        [{text: 'BACK',callback_data: 'backtomenu'}],
                        [{text: 'CLOSE',callback_data: 'close'}],

                    ]
                }})

            }
            //WALLET->MENU WALLET->SHOW WALLET
            if(selectedQuery.toString().toLowerCase() == 'showwallet'){
                bot.deleteMessage(chatId,query.message.message_id)
                bot.sendMessage(chatId, 'Show Wallet: ',{reply_markup:{
                    inline_keyboard: [
                        [{text: 'EVM(ETH,BSC,..)',callback_data: 'showevmwallet'},
                         {text: 'SUI',callback_data: 'showsuiwallet'}],
                        [{text: 'BACK',callback_data: 'backtomenuwallet'},
                         {text: 'CLOSE',callback_data: 'close'}],
                        [{text: 'Menu', callback_data: 'backtomenu'}]

                    ]
                }})
            }
            //SHOW EVM WALLET
            if(selectedQuery.toString().toLowerCase() == 'showevmwallet'){
                let data = {
                    telegramId: chatId
                }
                showWallet.evm(db,bot,data)
            }
            //SHOW SUI WALLET
            if(selectedQuery.toString().toLowerCase() == 'showsuiwallet'){
                let data = {
                    telegramId: chatId
                }
                showWallet.sui(db,bot,data)
                
            }
            //SHOW VENOM WALLET
            if(selectedQuery.toString().toLowerCase() == 'showvenomwallet'){
                let data = {
                    telegramId: chatId
                }
                showWallet.venom(db,bot,data)
            }
            
            //////////////// END OF MENU SHOW WALLET ////////////////////////////
            //WALLET->MENU WALLET->ADD WALLET
            if(selectedQuery.toString().toLowerCase() == 'addwallet'){
                bot.deleteMessage(chatId,query.message.message_id)
                bot.sendMessage(chatId, 'Add Wallet: ',{reply_markup:{
                    inline_keyboard: [
                        [{text: 'EVM(ETH,BSC,..)',callback_data: 'addevmwallet'},
                         {text: 'SUI',callback_data: 'addsuiwallet'},
                         {text: 'VENOM',callback_data: 'addvenomwallet'}],
                        [{text: 'BACK', callback_data: 'backtomenuwallet'},
                         {text: 'CLOSE',callback_data: 'close'}],
                        [{text: 'Menu', callback_data: 'backtomenu'}]

                    ]
                }})
            }
            //ADD EVM WALLET
            if(selectedQuery.toString().toLowerCase() == 'addevmwallet'){
                let data = {
                    telegramId: chatId
                }
                addWallet.evm(db,bot,data);
            }
            //ADD SUI WALLET
            if(selectedQuery.toString().toLowerCase() == 'addsuiwallet'){
                let data = {
                    telegramId: chatId
                }
                addWallet.sui(db,bot,data);
            }
            //ADD VENOM WALLET
            if(selectedQuery.toString().toLowerCase() == 'addvenomwallet'){
                let data = {
                    telegramId: chatId
                }
                addWallet.venom(db,bot,data);
            }
            
            //////////////// END OF MENU ADD WALLET//////////////////////////////
            //WALLET> MENU WALLET > EDIT WALLET
            if(selectedQuery.toString().toLowerCase() == 'editwallet'){
                bot.deleteMessage(chatId,query.message.message_id)
                bot.sendMessage(chatId, 'Edit Wallet: ',{reply_markup:{
                    inline_keyboard: [
                        [{text: 'EVM(ETH,BSC,..)',callback_data: 'editevmwallet'},
                        {text: 'SUI',callback_data: 'editsuiwallet'}],
                        [{text: 'BACK', callback_data: 'backtomenuwallet'},
                         {text: 'CLOSE',callback_data: 'close'}],
                        [{text: 'Menu', callback_data: 'backtomenu'}]


                    ]
                }})
            }
            //EDIT EVM WALLET
            if(selectedQuery.toString().toLowerCase() == 'editevmwallet'){
                let data = {
                    telegramId: chatId
                }
                editWallet.evmDisplay(db,bot,data)
            }
            //EDIT SUI WALLET
            if(selectedQuery.toString().toLowerCase() == 'editsuiwallet'){
                let data = {
                    telegramId: chatId
                }
                editWallet.sui(db,bot,data);
            }
            //EDIT VENOM WALLET
            if(selectedQuery.toString().toLowerCase() == 'editvenomwallet'){
                let data = {
                    telegramId: chatId
                }
                editWallet.venom(db,bot,data);
            }
            //////////////// END OF MENU EDIT WALLET//////////////////////////////

            //MENU > WALLET MENU> DELETE WALLET
            if(selectedQuery.toString().toLowerCase() == 'deletewallet'){
                bot.deleteMessage(chatId,query.message.message_id)
                bot.sendMessage(chatId, 'Delete Wallet: ',{reply_markup:{
                    inline_keyboard: [
                        [{text: 'EVM(ETH,BSC,..)',callback_data: 'deleteevmwallet'},
                         {text: 'SUI',callback_data: 'deletesuiwallet'}],
                        [{text: 'BACK', callback_data: 'backtomenuwallet'},
                         {text: 'CLOSE',callback_data: 'close'}],
                        [{text: 'Menu', callback_data: 'backtomenu'}]
                        

                    ]
                }})
            }
            //MENU CLOSE
            // if(selectedQuery.toString().toLowerCase() == 'close'){
            //     bot.deleteMessage(chatId,query.message.message_id);
                
            // }

        })
    }
}


module.exports = {telegram}