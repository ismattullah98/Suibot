const connection = require("../../database/database")
const { evm } = require("../../database/query")
let BOT_TOKEN = process.env.BOT_TOKEN;
var token = BOT_TOKEN;
var bot = new TelegramBot(token, {polling: true});

let subEvm = {
    findByWalet: (wallet,tx)=>{
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