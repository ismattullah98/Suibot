let query = require('../../../database/query');
const callbackEditWallet = require('./callbackData');
isRecording = false
let editWallet = {
    //EVM WALLET
    evmDisplay: (db,bot,data)=>{
        query.evm.findAllEvm(db,data,(err,res)=>{
            if(err) throw err;
            if (res.length > 0) {
                const limit = 10; // Jumlah wallet yang ingin ditampilkan dalam setiap grup
                const wallets = res; // Array wallet yang ingin ditampilkan
              
                // Fungsi untuk mengirim pesan dengan grup wallet
                const sendWallets = (chatId, wallets, startIndex) => {
                  let message = '';
              
                  wallets.forEach((r, index) => {
                    const currentIndex = startIndex + index;
                    message += `${currentIndex + 1}. ${r.namewallet || '0x'+r.evmwallet.slice(3, 5)+'..'+ r.evmwallet.slice(-2)} :\n \`${r.evmwallet}\` \n /edit\\_${r.codewallet.replace('_', '\\_')} \n \n`;
                  });
              
                  setTimeout(() => {
                    bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
                  }, (startIndex + 1) * 150); // Jeda 0,5 detik sebelum mengirim pesan
              
                  // Jika masih ada wallet yang tersisa
                  if (wallets.length > limit) {
                    const remainingWallets = wallets.slice(limit);
                    // Cek apakah ada grup berikutnya atau tidak
                    if (remainingWallets.length > 0) {
                      const nextStartIndex = startIndex + limit;
                      // Kirim grup wallet berikutnya dengan indeks yang sesuai setelah jeda 0,5 detik
                      sendWallets(chatId, remainingWallets, nextStartIndex);
                    }
                  }
                };
              
                const totalWallets = wallets.length;
                const numGroups = Math.ceil(totalWallets / limit);
              
                for (let i = 0; i < numGroups; i++) {
                  const startIndex = i * limit;
                  const groupWallets = wallets.slice(startIndex, startIndex + limit);
                  sendWallets(data.telegramId, groupWallets, startIndex);
                }
              } else {
                bot.sendMessage(data.telegramId, '404 Wallet NotFound, add wallet first!!! \n Click /setevmwallet');
              }
              
        })
    },
    evmExecute: (db,bot,data)=>{
            
    },
    //SUI WALLET
    suiDisplay: (db,bot,data)=>{
        query.sui.findAllSui(db,data,(err,res)=>{
            if(err) throw err;
            if (res.length > 0) {
                const limit = 10; // Jumlah wallet yang ingin ditampilkan dalam setiap grup
                const wallets = res; // Array wallet yang ingin ditampilkan
              
                // Fungsi untuk mengirim pesan dengan grup wallet
                const sendWallets = (chatId, wallets, startIndex) => {
                  let message = '';
              
                  wallets.forEach((r, index) => {
                    const currentIndex = startIndex + index;
                    message += `${currentIndex + 1}. ${r.namewallet || '0x'+r.suiwallet.slice(3, 5)+'..'+ r.suiwallet.slice(-2)} :\n \`${r.suiwallet}\` \n /edit\\_${r.codewallet.replace('_', '\\_')} \n \n `;
                  });
              
                  setTimeout(() => {
                    bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
                  }, (startIndex + 1) * 150); // Jeda 0,5 detik sebelum mengirim pesan
              
                  // Jika masih ada wallet yang tersisa
                  if (wallets.length > limit) {
                    const remainingWallets = wallets.slice(limit);
                    // Cek apakah ada grup berikutnya atau tidak
                    if (remainingWallets.length > 0) {
                      const nextStartIndex = startIndex + limit;
                      // Kirim grup wallet berikutnya dengan indeks yang sesuai setelah jeda 0,5 detik
                      sendWallets(chatId, remainingWallets, nextStartIndex);
                    }
                  }
                };
              
                const totalWallets = wallets.length;
                const numGroups = Math.ceil(totalWallets / limit);
              
                for (let i = 0; i < numGroups; i++) {
                  const startIndex = i * limit;
                  const groupWallets = wallets.slice(startIndex, startIndex + limit);
                  sendWallets(data.telegramId, groupWallets, startIndex);
                }
              }else{
                bot.sendMessage(data.telegramId, '404 Wallet NotFound, add wallet first!!! \n Click /setsuiwallet');
              }
        })
    },
    suiExecute: (db,bot,data)=>{

    },
    //VENOM WALLET
    venomDisplay: (db,bot,data)=>{
        query.venom.findAllVenom(db,data,(err,res)=>{
            if(err) throw err;
            if (res.length > 0) {
                const limit = 10; // Jumlah wallet yang ingin ditampilkan dalam setiap grup
                const wallets = res; // Array wallet yang ingin ditampilkan
              
                // Fungsi untuk mengirim pesan dengan grup wallet
                const sendWallets = (chatId, wallets, startIndex) => {
                  let message = '';
              
                  wallets.forEach((r, index) => {
                    const currentIndex = startIndex + index;
                    message += `${currentIndex + 1}. ${r.namewallet || '0x'+r.venomwallet.slice(3, 5)+'..'+ r.venomwallet.slice(-2)} :\n \`${r.venomwallet}\` \n /edit\\_${r.codewallet.replace('_', '\\_')} \n \n `;
                  });
              
                  setTimeout(() => {
                    bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
                  }, (startIndex + 1) * 100); // Jeda 0,5 detik sebelum mengirim pesan
              
                  // Jika masih ada wallet yang tersisa
                  if (wallets.length > limit) {
                    const remainingWallets = wallets.slice(limit);
                    // Cek apakah ada grup berikutnya atau tidak
                    if (remainingWallets.length > 0) {
                      const nextStartIndex = startIndex + limit;
                      // Kirim grup wallet berikutnya dengan indeks yang sesuai setelah jeda 0,5 detik
                      sendWallets(chatId, remainingWallets, nextStartIndex);
                    }
                  }
                };
              
                const totalWallets = wallets.length;
                const numGroups = Math.ceil(totalWallets / limit);
              
                for (let i = 0; i < numGroups; i++) {
                  const startIndex = i * limit;
                  const groupWallets = wallets.slice(startIndex, startIndex + limit);
                  sendWallets(data.telegramId, groupWallets, startIndex);
                }
              }else{
                bot.sendMessage(data.telegramId, '404 Wallet NotFound, add wallet first!!! \n Click /setvenomwallet');
              }
        })
    },
    venomExecute: (db,bot,data)=>{

    }
}


module.exports = {editWallet};