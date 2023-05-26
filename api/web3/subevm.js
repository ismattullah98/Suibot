
const connection = require("../../database/database")
const { evm } = require("../../database/query")


let subEvm = {
    findByWalet: (tx,providerName,bot,web3)=>{
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
                let nameWallet = `<a href="${providerName.explorer}adress/${row.evmwallet}">${row.namewallet? row.namewallet:tx.to.slice(0,4)+'..'+tx.to.slice(-2)}</a>`
                let hash = `<a href="${providerName.explorer}tx/${tx.hash}">txHash</a>`
                let TrueValue= web3.utils.fromWei(tx.value, 'ether');
                const formattedValue = parseFloat(TrueValue) >= 0.0001 ? parseFloat(TrueValue).toFixed(6).replace(/\.?0*$/, '') : parseFloat(TrueValue);
                let from = '<a href="'+providerName.explorer+'adress/'+tx.from+'">'+tx.from.slice(0,4)+'..'+tx.from.slice(-2)+'</a>'
                
                message+= `Chain: ${providerName.name} \n ${nameWallet} You Has Received ${formattedValue} ${providerName.symbol} from ${from} check the transaction ${hash} here `
                    bot.sendMessage(row.telegramid,message,{parse_mode: 'HTML'})
                  });
            }
            if(res.length == 1){
                
                //console.log(res[0].namewallet)
                let nameWallet = `<a href="${providerName.explorer}adress/${tx.to}">${res[0].namewallet? res[0].namewallet:tx.to.slice(0,4)+'..'+tx.to.slice(-2)}</a>`
                let hash = `<a href="${providerName.explorer}tx/${tx.hash}">txHash</a>`
                let TrueValue= web3.utils.fromWei(tx.value, 'ether');
                const formattedValue = parseFloat(TrueValue) >= 0.0001 ? parseFloat(TrueValue).toFixed(6).replace(/\.?0*$/, '') : parseFloat(TrueValue);
                let from = '<a href="'+providerName.explorer+'adress/'+tx.from+'">'+tx.from.slice(0,4)+'..'+tx.from.slice(-2)+'</a>'
                
                message+= `Chain: ${providerName.name} \n ${nameWallet} You Has Received ${formattedValue} ${providerName.symbol} from ${from} check the transaction ${hash} here`
                bot.sendMessage(res[0].telegramid, message,{parse_mode: 'HTML'});
            }
        })
    }
}



module.exports = {subEvm}