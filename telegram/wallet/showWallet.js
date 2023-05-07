const { sui, evm, venom } = require("../../database/query")

let showWallet = {
    evm: (db,bot,data)=>{
        evm.findAllEvm(db,data,(err,res)=>{
            if(res){
                let message = 'List of your Wallet: \n';
                res.forEach((r,index)=>{
                    message += `${index+1}. ${r.namewallet || 'name Wallet'} : \n ${r.evmwallet}\n`
                })
                
                bot.sendMessage(data.telegramId, message)
            }
            //console.log(res);
            if(err) throw err;
        })
    },
    sui: (db,bot,data)=>{
        sui.findOneSui(db,data,(err,res)=>{
            if(res){
                let message = 'List of your Wallet: \n';
                res.forEach((r,index)=>{
                    message += `${index+1}. ${r.namewallet || 'name Wallet'} : \n ${r.evmwallet}\n`
                })
                
                bot.sendMessage(data.telegramId, message)
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
                    message += `${index+1}. ${r.namewallet || 'name Wallet'} : \n ${r.evmwallet}\n`
                })
                
                bot.sendMessage(data.telegramId, message)
            }
            //console.log(res);
            if(err) throw err;
        })
    }
}


module.exports = {showWallet}