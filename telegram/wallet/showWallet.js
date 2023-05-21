const { sui, evm, venom } = require("../../database/query")
 
let showWallet = {
    evm: (db,bot,data)=>{
        evm.findAllEvm(db,data,(err,res)=>{
            if(res > 0){
                let message = 'List of your Wallet: \n';
                res.forEach((r,index)=>{
                    message += `${index + 1}. ${r.namewallet || '0x'+r.evmwallet.slice(3, 5)+'..'+ r.evmwallet.slice(-2)} :\n\`${r.evmwallet}\` \n`;
                })
                
                bot.sendMessage(data.telegramId, message, {parse_mode: 'Markdown'})
            }if(res == 0){
              bot.sendMessage(data.telegramId, 'Belum ada Wallet yang di Tambahkan')
            }
            //console.log(res);
            if(err) throw err;
        })
    },
    sui: (db,bot,data)=>{
        sui.findAllSui(db,data,(err,res)=>{
            if(res){
                console.log(res)
                let message = 'List of your Wallet: \n';
                res.forEach((r,index)=>{
                    message += `${index + 1}. ${r.namewallet || '0x'+r.suiwallet.slice(3, 5)+'..'+ r.suiwallet.slice(-2)} :\n\`${r.suiwallet}\` \n`;
                })
                
                bot.sendMessage(data.telegramId, message, {parse_mode: 'Markdown'})
            }
            //console.log(res);
            if(err) throw err;
        })
    },
    venom: (db,bot,data)=>{
        venom.findOneVenom(db,data,(err,res)=>{
            if(res){
                let message = 'List of your Wallet: \n';
                res.forEach((r,index)=>{
                    message += `${index + 1}. ${r.namewallet || '0x'+r.venomwallet.slice(3, 5)+'..'+ r.venomwallet.slice(-2)} :\n\`${r.evmwallet}\` \n`;
                })
                
                bot.sendMessage(data.telegramId, message, {parse_mode: 'Markdown'})
            }
            //console.log(res);
            if(err) throw err;
        })
    }
}


module.exports = {showWallet}