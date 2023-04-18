let query = require('../database/query');
let isRecording = false;
let addWallet = {
    evm: (db,bot,data)=>{        
        let isRecording = false;

        query.allusers.findOneUser(db,data,(err,result)=>{
            if(result){
                //console.log(result)
                //IF PREMIUM
                if(result[0].premium == 1){
                    let limitBeginer = 100
                    bot.sendMessage(data.telegramId, 'Silahkan Masukan EVM wallet dan nama wallet (eth,bsc,polygon,etc). example: ')
                }
                //IF FREE USER
                if(result[0].premium ===0){
                    let limitBasic = 10
                    //CHECK LIMIT
                    query.evm.findOneEvm(db,data,(err,res)=>{
                        //IF LIMIT REACHED
                        if(res.length>=limitBasic){
                            bot.sendMessage(data.telegramId, `Limit wallet (${res.length}/${limitBasic})\n Anda Sudah Mencapai LIMIT,tidak dapat lagi menambah Wallet`);

                        }
                        //IF NO LIMIT
                        else{
                            bot.sendMessage(data.telegramId, `Limit wallet (${res.length}/${limitBasic})\nSilahkan Masukan EVM wallet (eth,bsc,polygon,etc)`);
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
                                    //INSERT TO DB
                                    query.evm.createOneEvm(db,data,(err,res)=>{
                                        if(res){
                                            console.log(data.evmWallet)
                                            bot.sendMessage(data.telegramId, 'Success Saved!!!')
                                            
                                        }
                                        if(err) throw err;
                                        
                                    })
                                }else{
                                    bot.sendMessage(data.telegramId, 'Invalid Format Wallet,')

                                }
                            }
                            })
                        }
                    })
                    
                    
                    
                }
            }
            if(err) throw err;
        })
        
    },
    //
    sui: (db,bot,data)=>{        
        let isRecording = false;

        query.allusers.findOneUser(db,data,(err,result)=>{
            if(result){
                //console.log(result)
                //IF PREMIUM
                if(result[0].premium == 1){
                    let limitBeginer = 100
                    bot.sendMessage(data.telegramId, 'Silahkan Masukan EVM wallet dan nama wallet (eth,bsc,polygon,etc). example: ')
                }
                //IF FREE USER
                if(result[0].premium ===0){
                    let limitBasic = 10
                    //CHECK LIMIT
                    query.sui.findOneSui(db,data,(err,res)=>{
                        //IF LIMIT REACHED
                        if(res.length>=limitBasic){
                            bot.sendMessage(data.telegramId, `Limit wallet (${res.length}/${limitBasic})\n Anda Sudah Mencapai LIMIT,tidak dapat lagi menambah Wallet`);

                        }
                        //IF NO LIMIT
                        else{
                            bot.sendMessage(data.telegramId, `Limit wallet (${res.length}/${limitBasic})\nSilahkan Masukan SUI wallet anda`);
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
                                    query.sui.createOneSui(db,data,(err,res)=>{
                                        if(res){
                                            console.log(data.suiWallet)
                                            bot.sendMessage(data.telegramId, 'Success Saved!!!')
                                            
                                        }
                                        if(err) throw err;
                                        
                                    })
                                }else{
                                    bot.sendMessage(data.telegramId, 'Invalid Format Wallet,')

                                }
                            }
                            })
                        }
                    })
                    
                    
                    
                }
            }
            if(err) throw err;
        })
        
    },
}


module.exports = {addWallet};