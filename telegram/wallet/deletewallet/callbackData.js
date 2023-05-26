let db = require('../../../database/database')
let query = require('../../../database/query')
let callbackDelete = {
    evm: (bot,data)=>{
        query.evm.findAllEvm(db,data,(err,res)=>{
            if(res.length > 0){
                let message = 'List of your Wallet: \n';
                res.forEach((r,index)=>{
                    message += `${index + 1}. ${r.namewallet || '0x'+r.evmwallet.slice(3, 5)+'..'+ r.evmwallet.slice(-2)} :\n\`${r.evmwallet}\` \n /delete\\_${r.codewallet.replace('_', '\\_')} \n \n`;
                })
                
                bot.sendMessage(data.telegramId, message, {parse_mode: 'Markdown'})
            }if(res.length == 0){
              bot.sendMessage(data.telegramId, 'Belum ada Wallet yang di Tambahkan')
            }
            //console.log(res);
            if(err) throw err;
        });
    },
    sui: (bot,data)=>{
        query.sui.findAllSui(db,data,(err,res)=>{
            if(res.length > 0){
                let message = 'List of your Wallet: \n';
                res.forEach((r,index)=>{
                    message += `${index + 1}. ${r.namewallet || '0x'+r.suiwallet.slice(3, 5)+'..'+ r.suiwallet.slice(-2)} :\n\`${r.suiwallet}\` \n /delete\\_${r.codewallet.replace('_', '\\_')} \n \n`;
                })
                
                bot.sendMessage(data.telegramId, message, {parse_mode: 'Markdown'})
            }if(res.length == 0){
              bot.sendMessage(data.telegramId, '404 Wallet Not Found')
            }
            //console.log(res);
            if(err) throw err;
        });
    },
    venom: (bot,data)=>{
        query.venom.findOneVenom(db,data,(err,res)=>{
            if(res.length > 0){
                let message = 'List of your Wallet: \n';
                res.forEach((r,index)=>{
                    message += `${index + 1}. ${r.namewallet || '0x'+r.venomwallet.slice(3, 5)+'..'+ r.venomwallet.slice(-2)} :\n\`${r.venomwallet}\` \n /delete\\_${r.codewallet.replace('_', '\\_')} \n \n`;
                })
                
                bot.sendMessage(data.telegramId, message, {parse_mode: 'Markdown'})
            }if(res.length == 0){
              bot.sendMessage(data.telegramId, '404 Wallet Not Found')
            }
            //console.log(res);
            if(err) throw err;
        });
    },
}


module.exports = {callbackDelete}