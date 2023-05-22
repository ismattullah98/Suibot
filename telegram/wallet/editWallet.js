let query = require('../../database/query')
isRecording = false
let editWallet = {
    //EVM WALLET
    evmDisplay: (db,bot,data)=>{
        query.evm.findAllEvm(db,data,(err,res)=>{
            if(err) throw err;
            if(res){
                console.log(res[0].codewallet)
                let message = 'List of your Wallet: \n';
                res.forEach((r,index)=>{
                    message += `${index + 1}. ${r.namewallet || '0x'+r.evmwallet.slice(3, 5)+'..'+ r.evmwallet.slice(-2)} :\n \`${r.evmwallet}\` \n /edit\\_${r.codewallet.replace('_', '\\_')} \n `;
                })
                bot.sendMessage(data.telegramId, message, {parse_mode: 'Markdown'})
            }
        })
    },
    evmExecute: (db,bot,data)=>{

    },
    //SUI WALLET
    suiDisplay: (db,bot,data)=>{
        query.sui.findAllSui(db,data,(err,res)=>{
            if(err) throw err;
            if(res){
                let message = 'List of your Wallet: \n';
                res.forEach((r,index)=>{
                    message += `${index + 1}. ${r.namewallet || '0x'+r.suiwallet.slice(3, 5)+'..'+ r.suiwallet.slice(-2)} :\n\`${r.suiwallet}\` \n /edit\\_${r.codewallet.replace('_', '\\_')} \n`;
                })
                
                bot.sendMessage(data.telegramId, message, {parse_mode: 'Markdown'})
                bot.sendMessage(data.telegramId, 'SELECT Wallet do you want to edit') 
            }
        })
    },
    suiExecute: (db,bot,data)=>{

    },
    //VENOM WALLET
    venomDisplay: (db,bot,data)=>{
        query.venom.findOneVenom(db,data,(err,res)=>{
            if(err) throw err;
            if(res){
                let message = 'List of your Wallet: \n';
                res.forEach((r,index)=>{
                    message += `${index + 1}. ${r.namewallet || '0x'+r.venomwallet.slice(3, 5)+'..'+ r.venomwallet.slice(-2)} :\n\`${r.venomwallet}\` \n /edit\\_${r.codewallet.replace('_', '\\_')} \n`;
                })
                
                bot.sendMessage(data.telegramId, message, {parse_mode: 'Markdown'}) 
            }
        })
    },
    venomExecute: (db,bot,data)=>{

    }
}


module.exports = {editWallet};