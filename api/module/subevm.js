
const connection = require("../../database/database")
const { evm } = require("../../database/query")


let subEvm = {
    findByWalet: (tx,bot)=>{
        console.log(tx)
        let data = {
            evmWallet: tx.to
        }
        evm.findOneEvmByWallet(connection, data, (err,res)=>{
            console.log(res)
            if(err) throw err;
            
            if(res.length>1){
                //res.map()
            }
            if(res.length == 1){
                let message = 'transaksi masuk: '+tx
                bot.sendMessage(res.telegramid, message);
            }
        })
    }
}



module.exports = {subEvm}