let query = require('../../../database/query');
const { callbackWallet } = require('./callbackData');
let isRecording = false;
let addWallet = {
    evm: (db,bot,data)=>{        
        let isRecording = false;

        query.allusers.findOneUser(db,data,(err,result)=>{
            if(result){
                    let limit = result[0].limit
                    //CHECK LIMIT
                    query.evm.findAllEvm(db,data,(err,res)=>{
                        //IF LIMIT REACHED
                        if(res.length>=limit){
                            bot.sendMessage(data.telegramId, `Limit wallet (${res.length}/${limit})\n Anda Sudah Mencapai LIMIT,tidak dapat lagi menambah Wallet`);

                        }
                        //IF NO LIMIT
                        else{
                            bot.sendMessage(data.telegramId, `Limit wallet (${res.length}/${limit})\nSilahkan Masukan EVM wallet (eth,bsc,polygon,etc)`);
                            isRecording= true;
                            bot.on('message',(msg)=>{
                            let data = {
                                telegramId: msg.chat.id,
                                evmWallet: msg.text,
                            }
                            if(isRecording == true){
                                isRecording = false
                                //console.log(data.evmWallet)
                                if(data.evmWallet && data.evmWallet.match(/^0x[a-fA-F0-9]{40}$/)){
                                    //Give Name Wallet?
                                    bot.sendMessage(data.telegramId, 'SET name Wallet',{reply_markup:{
                                        inline_keyboard: [
                                            [
                                                {text: 'SKIP',callback_data: 'skipnamewalletevm'},
                                                {text: 'ADD NAME',callback_data: 'addnamewalletevm'}
                                            ],
                                        ]
                                    }})//
                                    callbackWallet(bot,data)
                                }else{
                                    bot.sendMessage(data.telegramId, 'Invalid Format Wallet,')

                                }
                            }
                            })
                        }
                    })
                    
                    
                    
                
            }
            if(err) throw err;
        })
        
    },
    //
    sui: (db,bot,data)=>{        
        let isRecording = false;

        query.allusers.findOneUser(db,data,(err,result)=>{
            if(result){
                let limit = result[0].limit
                    //CHECK LIMIT
                    query.sui.findAllSui(db,data,(err,res)=>{
                        //IF LIMIT REACHED
                        if(res.length>=limit){
                            bot.sendMessage(data.telegramId, `Limit wallet (${res.length}/${limit})\n Anda Sudah Mencapai LIMIT,tidak dapat lagi menambah Wallet`);

                        }
                        //IF NO LIMIT
                        else{
                            bot.sendMessage(data.telegramId, `Limit wallet (${res.length}/${limit})\nSilahkan Masukan SUI wallet anda`);
                            isRecording= true;
                            bot.on('message',(msg)=>{
                            let data = {
                                telegramId: msg.chat.id,
                                suiWallet: msg.text,
                            }
                            if(isRecording == true){
                                isRecording = false
                                //console.log(data.evmWallet)
                                if(data.suiWallet && data.suiWallet.match(/^0x[a-fA-F0-9]{64}$/)){
                                    //INSERT TO DB
                                    bot.sendMessage(data.telegramId, 'SET name Wallet',{reply_markup:{
                                        inline_keyboard: [
                                            [
                                                {text: 'SKIP',callback_data: 'skipnamewalletsui'},
                                                {text: 'ADD NAME',callback_data: 'addnamewalletsui'}
                                            ],
                                        ]
                                    }})//
                                    callbackWallet(bot,data)
                                    
                                }else{
                                    bot.sendMessage(data.telegramId, 'Invalid Format Wallet,')

                                }
                            }
                            })
                        }
                    })
            }
            if(err) throw err;
        })
        
    },

    venom: (db,bot,data)=>{        
        let isRecording = false;

        query.allusers.findOneUser(db,data,(err,result)=>{
            if(result){
                let limit = result[0].limit
                    //CHECK LIMIT
                    query.venom.findOneVenom(db,data,(err,res)=>{
                        //IF LIMIT REACHED
                        if(res.length>=limit){
                            bot.sendMessage(data.telegramId, `Limit wallet (${res.length}/${limit})\n Anda Sudah Mencapai LIMIT,tidak dapat lagi menambah Wallet`);

                        }
                        //IF NO LIMIT
                        else{
                            bot.sendMessage(data.telegramId, `Limit wallet (${res.length}/${limit})\nSilahkan Masukan Venom wallet anda`);
                            isRecording= true;
                            bot.on('message',(msg)=>{
                            let data = {
                                telegramId: msg.chat.id,
                                venomWallet: msg.text,
                            }
                            if(isRecording == true){
                                isRecording = false
                                //console.log(data.evmWallet)
                                if(data.venomWallet && data.venomWallet.match(/^0:[a-fA-F0-9]{64}$/)){
                                    bot.sendMessage(data.telegramId, 'SET name Wallet',{reply_markup:{
                                        inline_keyboard: [
                                            [
                                                {text: 'SKIP',callback_data: 'skipnamewalletvenom'},
                                                {text: 'ADD NAME',callback_data: 'addnamewalletvenom'}
                                            ],
                                        ]
                                    }})//
                                    //INSERT TO DB
                                    callbackWallet(bot,data);
                                }else{
                                    bot.sendMessage(data.telegramId, 'Invalid Format Wallet,')

                                }
                            }
                            })
                        }
                    })
                    
                    
                    
                
            }
            if(err) throw err;
        })
        
    },
}


module.exports = {addWallet};