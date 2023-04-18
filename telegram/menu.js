let q = require('../database/query');
let db = require('../database/database');
const { logic, addWallet } = require('./logicmenu');
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
                        [{text: 'BACK',callback_data: 'backtomenuwallet'}],
                        [{text: 'CLOSE',callback_data: 'close'}]

                    ]
                }})
            }
            //SHOW EVM WALLET
            if(selectedQuery.toString().toLowerCase() == 'showevmwallet'){
                let data = {
                    telegramId: chatId
                }
                q.evm.findOneEvm(db,data,(err,res)=>{
                    if(res){
                        let message = 'List of your Wallet: \n';
                        res.forEach((r,index)=>{
                            message += `${index+1}. ${r.namewallet || 'Your Wallet'} : \n ${r.evmwallet}\n`
                        })
                        
                        bot.sendMessage(data.telegramId, message)
                    }
                    //console.log(res);
                    if(err) throw err;
                })
            }
            //SHOW SUI WALLET
            if(selectedQuery.toString().toLowerCase() == 'showsuiwallet'){
                let data = {
                    telegramId: chatId
                }
                q.sui.findOneSui(db,data,(err,res)=>{
                    console.log(res);
                    if(err) throw err;
                })
            }
            //////////////// END OF MENU SHOW WALLET ////////////////////////////
            //WALLET->MENU WALLET->ADD WALLET
            if(selectedQuery.toString().toLowerCase() == 'addwallet'){
                bot.deleteMessage(chatId,query.message.message_id)
                bot.sendMessage(chatId, 'Add Wallet: ',{reply_markup:{
                    inline_keyboard: [
                        [{text: 'EVM(ETH,BSC,..)',callback_data: 'addevmwallet'},
                        {text: 'SUI',callback_data: 'addsuiwallet'}],
                        [{text: 'BACK', callback_data: 'backtomenuwallet'}],
                        [{text: 'CLOSE',callback_data: 'close'}] 

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
                addWallet.sui(bot,data);
            }
            
            //////////////// END OF MENU ADD WALLET//////////////////////////////
            //MENU EDIT WALLET
            if(selectedQuery.toString().toLowerCase() == 'editwallet'){
                bot.deleteMessage(chatId,query.message.message_id)
                bot.sendMessage(chatId, 'Edit Wallet: ',{reply_markup:{
                    inline_keyboard: [
                        [{text: 'EVM(ETH,BSC,..)',callback_data: 'editevmwallet'},
                        {text: 'SUI',callback_data: 'editsuiwallet'}],
                        [{text: 'BACK', callback_data: 'backtomenuwallet'}],
                        [{text: 'CLOSE',callback_data: 'close'}] 

                    ]
                }})
            }
            //MENU DELETE WALLET
            if(selectedQuery.toString().toLowerCase() == 'deletewallet'){
                bot.deleteMessage(chatId,query.message.message_id)
                bot.sendMessage(chatId, 'Delete Wallet: ',{reply_markup:{
                    inline_keyboard: [
                        [{text: 'EVM(ETH,BSC,..)',callback_data: 'deleteevmwallet'},
                        {text: 'SUI',callback_data: 'deletesuiwallet'}],
                        [{text: 'BACK', callback_data: 'backtomenuwallet'}],
                        [{text: 'CLOSE',callback_data: 'close'}] 

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