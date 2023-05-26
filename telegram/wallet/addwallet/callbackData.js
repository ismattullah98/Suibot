let db = require('../../../database/database');
let query = require('../../../database/query')
function callbackWallet(bot,data){ bot.on('callback_query',(callbackQuery) =>{
    
    let recordInput = false
    const chatId = callbackQuery.message.chat.id;
    let action = callbackQuery.data;
    if(action === 'skipnamewalletevm'){
        data
        //bot.deleteMessage(chatId, callbackQuery.message.message_id);
        //INSERT TO DB
         query.evm.createOneEvm(db,data,(err,res)=>{
             if(res){
                 console.log(data.evmWallet)
                 bot.sendMessage(data.telegramId,`Wallet: \n ${data.evmWallet}\n Success saved!!!`)
                 return;
             }
             if(err) throw err;
         });
    }
    if(action === 'addnamewalletevm'){
        data
        //bot.deleteMessage(chatId, callbackQuery.message.message_id);
        //console.log(action);
        bot.sendMessage(chatId, 'Please enter the wallet name:')
        const messageListener = (msg) => {
            let text = msg.text;
            let chatId = msg.chat.id;
            data.nameWallet = text;
            query.evm.createOneEvm(db,data,(err,res)=>{
                if(res){
                    bot.sendMessage(chatId,`${data.nameWallet}: \n ${data.evmWallet}\n \n Success saved!!!`)
                    bot.removeListener('message', messageListener);
                }
                if(err) throw err;
            });
        }
        bot.on('message', messageListener);
    }
    if(action === 'skipnamewalletsui'){
        data
        bot.deleteMessage(chatId, callbackQuery.message.message_id);
        query.sui.createOneSui(db,data,(err,res)=>{
            if(res){
                console.log(data.suiWallet)
                bot.sendMessage(data.telegramId, 'Success Saved!!!')
                
            }
            if(err) throw err;
            
        })
        action = '';
    }
    if(action === 'addnamewalletsui'){
        data
        bot.deleteMessage(chatId, callbackQuery.message.message_id);
        console.log(action);
        bot.sendMessage(chatId, 'Please enter the wallet name:')
        bot.on('message', (msg) => {
            const chatId = msg.chat.id;
            const nameWallet = msg.text;
            // Menyimpan nama wallet ke dalam variabel data
            data.nameWallet = nameWallet;
            if(action !== ''){
                query.sui.createOneSui(db,data,(err,res)=>{
                    if(res){
                        console.log(data.suiWallet)
                        bot.sendMessage(data.telegramId,`${data.nameWallet}: \n ${data.evmWallet}\n \n Success saved!!!`)
                    }
                    if(err) throw err;
                    
                })
            }
            action = ''
        })
        ;
    }
    if(action === 'skipnamewalletvenom'){
        data
        bot.deleteMessage(chatId, callbackQuery.message.message_id);
        query.venom.createOneVenom(db,data,(err,res)=>{
            if(res){
                console.log(data.venomWallet)
                bot.sendMessage(data.telegramId, 'Success Saved!!!')
                
            }
            if(err) throw err;
            
        })
        action = '';
    }
    if(action === 'addnamewalletvenom'){
        data
        bot.deleteMessage(chatId, callbackQuery.message.message_id);
        console.log(action);
        bot.sendMessage(chatId, 'Please enter the wallet name:')
        bot.on('message', (msg) => {
            const chatId = msg.chat.id;
            const nameWallet = msg.text;
            // Menyimpan nama wallet ke dalam variabel data
            data.nameWallet = nameWallet;
            if(action === 'addnamewalletvenom'){
                query.venom.createOneVenom(db,data,(err,res)=>{
                    if(res){
                        //console.log(data.venomWallet)
                        bot.sendMessage(data.telegramId,`${data.nameWallet}: \n ${data.evmWallet}\n \n Success saved!!!`)
                        action = '';
                    }
                    if(err) throw err;
                    
                })
            }
            
        });
    }

    //bot.deleteMessage(chatId, callbackQuery.message.message_id);
});
}
module.exports = {callbackWallet}