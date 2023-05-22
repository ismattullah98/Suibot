let query = require('../database/query')

isRecording = false
let deleteWallet = {
    //EVM WALLET
    evm: (db,bot,data)=>{
      bot.sendMessage(data.telegramId,'Are You Sure Want To Delete This Wallet?');
    },
    //SUI WALLET
    sui: (db,bot,data)=>{
      
    },
    //VENOM WALLET
    venom: (db,bot,data)=>{
      
    }
}


module.exports = deleteWallet;