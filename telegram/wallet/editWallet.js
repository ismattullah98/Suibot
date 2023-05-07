let query = require('../../database/query')
isRecording = false
let editWallet = {
    //EVM WALLET
    evmDisplay: (db,bot,data)=>{
        query.evm.findAllEvm(db,data,(err,res)=>{
            if(err) throw err;
            if(res){
                let message = 'List of your Wallet: \n';
                res.forEach((r,index)=>{
                    message += `${index+1}. ${r.namewallet || 'name Wallet'} : \n ${r.evmwallet}\n`
                })
                
                bot.sendMessage(data.telegramId, message)
                bot.sendMessage(data.telegramId, 'SELECT Wallet do you want to delete') 
            }
        })
    },
    evmExecute: (db,bot,data)=>{

    },
    //SUI WALLET
    suiDisplay: (db,bot,data)=>{

    },
    suiExecute: (db,bot,data)=>{

    },
    //VENOM WALLET
    venomDisplay: (db,bot,data)=>{

    },
    venomExecute: (db,bot,data)=>{

    }
}


module.exports = {editWallet};