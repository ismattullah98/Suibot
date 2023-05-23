
const connection = require("../../database/database")
const { evm } = require("../../database/query")


let subEvm = {
    findByWalet: (tx,providerName,bot)=>{
        console.log(tx)
        let data = {
            evmWallet: tx.to
        }
        evm.findOneEvmByWallet(connection, data, (err,res)=>{
            //console.log(res)
            let message = ''
            if(err) throw err;
            
            if(res.length>1){
                res.map(row => {
                    message+= `-${providerName.name} \n <a href=${providerName.explorer}tx/${tx.hash}>txHash<a>`
                    bot.sendMessage(row.telegramid,message,{parse_mode: 'HTML'})
                  });
            }
            if(res.length == 1){
                message+= `-${providerName.name} \n <a href=${providerName.explorer}tx/${tx.hash}>txHash</a>`
                bot.sendMessage(res[0].telegramid, message,{parse_mode: 'HTML'});
            }
        })
    }
}



module.exports = {subEvm}