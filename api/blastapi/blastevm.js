
// const { Blast,BlastNetwork,BlastSubscriptionPlan, } = require('@bwarelabs/blast-sdk-js');
// const db = require('../../database/database');

// let config = {
//     projectId: process.env.BLAST_ID,
//     network: BlastNetwork.ETH_MAINNET,
//     rateLimit: BlastSubscriptionPlan.Free,
// }

// console.log(config)
// const blast = new Blast(config);
// const gasPrice = blast.wsProvider.eth.getGasPrice((err,res)=>{
//     if(err){
//         console.log('error saat mengambil data:',err)
//     }
//     console.log(res)
// }).catch((err)=>{console.log('error saat terhubung')});


// let subscribe = [];
// // blast.wsProvider.eth.getBlockNumber((err,res)=>{
// //     if(err){console.log('error on blast',err)}
// //     if(res){console.log('now block is:',res)};
// // })
// // blast.wsProvider.eth((err,res)=>{
    
// //     console.log(res);
// // })
// let blastProvider = [
//     //  blast.wsProvider(process.env.WSS_ARB_TEST),
//     //  blast.wsProvider(process.env.WSS_ARB),
    
// ];


// function startSubscribe(){
//     for (let i = 0; i < blastProvider.length; i++){
//         const web3 = blastProvider[i];
//         const providerName = getProviderName(i);

//         // const sub = web3.ethweb3.net.listening().then(()=>{
//         //     console.log('terhubung ke web3 blockchain:'+providerName.name)
//         // });

//         // subscribe.push(sub);
//     }
// }

// function getTransaction(){}

// function getProviderName(index){
//     switch(index){
//         case 0: return{
//             name: 'ARBITRUM TESTNET',
//             explorer: 'https://goerli.arbiscan.io',
//             symbol: 'ETH'
//         };
//         case 1: return{
//             name: 'ARBITRUM',
//             explorer: 'https://arbiscan.io/',
//             symbol: 'ETH'
//         };
//         default:
//         return `Blockchain-${index}`;

//     }
// }

// //startSubscribe()
// module.exports = {subscribe}