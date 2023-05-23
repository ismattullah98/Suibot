
const connection = require("../../database/database")
const { evm } = require("../../database/query")


let subEvm = {
    findByWalet: (wallet,tx,bot)=>{
        let data = {
            evmWallet: wallet
        }
        evm.findOneEvmByWallet(connection, data, (err,res)=>{
            if(err) throw err;
            
            if(res.length>1){
                //res.map()
            }
            if(res.length == 1){
                let message = 'transaksi masuk'+tx
                bot.sendMessage(res.telegramid, message);
            }
        })
    }
}



module.exports = {subEvm}