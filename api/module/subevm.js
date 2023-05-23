
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
                let hash = `<a href="${providerName.explorer}tx/${tx.hash}">txHash</a>`
                let TrueValue= web3.utils.fromWei(tx.value, 'ether');
                const formattedValue = parseFloat(TrueValue) >= 0.0001 ? parseFloat(TrueValue).toFixed(6).replace(/\.?0*$/, '') : parseFloat(TrueValue);
                let from = '<a href="'+providerName.explorer+'adress/'+tx.from+'">'+tx.from.slice(0,4)+'..'+tx.from.slice(-2)+'</a>'
                message+= `Chain: ${providerName.name} \n 
                You Has Received ${formattedValue} ${providerName.symbol} estimated() ${hash} from ${from} `
                    bot.sendMessage(row.telegramid,message,{parse_mode: 'HTML'})
                  });
            }
            if(res.length == 1){
                let hash = `<a href="${providerName.explorer}tx/${tx.hash}">txHash</a>`
                let TrueValue= web3.utils.fromWei(tx.value, 'ether');
                const formattedValue = parseFloat(TrueValue) >= 0.0001 ? parseFloat(TrueValue).toFixed(6).replace(/\.?0*$/, '') : parseFloat(TrueValue);
                let from = '<a href="'+providerName.explorer+'adress/'+tx.from+'">'+tx.from.slice(0,4)+'..'+tx.from.slice(-2)+'</a>'
                message+= `Chain: ${providerName.name} \n 
                You Has Received ${formattedValue} ${providerName.symbol} estimated() ${hash} from ${from} `
                bot.sendMessage(res[0].telegramid, message,{parse_mode: 'HTML'});
            }
        })
    }
}



module.exports = {subEvm}