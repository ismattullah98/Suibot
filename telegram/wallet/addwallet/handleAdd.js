let query = require('../../../database/query')
const Blowfish = require('blowfish');
const crypto = require('crypto')
const CryptoJS = require('node-cryptojs-aes').CryptoJS;

const handleEvmWallet = (db, bot, data) => {
    query.allusers.findOneUser(db, data, (err, result) => {
      if (result) {
        const limit = result[0].limit;
  
        query.evm.findAllEvm(db, data, (err, res) => {
          if (res.length >= limit) {
            bot.sendMessage(data.telegramId, `Limit wallet (${res.length}/${limit})\n Anda Sudah Mencapai LIMIT, tidak dapat lagi menambah Wallet`);
          } else {
            bot.sendMessage(data.telegramId, `Limit wallet (${res.length}/${limit})\nSilahkan Masukan EVM wallet (eth,bsc,polygon,etc)`);
  
            const messageListener = (msg) => {
              const walletData = {
                telegramId: msg.chat.id,
                evmWallet: msg.text,
              };
  
              if (walletData.evmWallet && walletData.evmWallet.match(/^0x[a-fA-F0-9]{40}$/)) {
                bot.sendMessage(msg.chat.id, 'SET name Wallet', {
                  reply_markup: {
                    inline_keyboard: [
                      [
                        { text: 'SKIP', callback_data: `skipnameevm${walletData.evmWallet}` },
                        { text: 'ADD NAME', callback_data: `addnameevm${walletData.evmWallet}` }
                      ],
                    ]
                  }
                });
  
                const callbackListener = (callbackQuery) => {
                  const action = callbackQuery.data;
                  const chatId = callbackQuery.message.chat.id;
  
                  if (action.startsWith('skipnameevm')) {
                    const input = action.slice(11);
                    const data = {
                      telegramId: chatId,
                      evmWallet: input,
                      nameWallet: '',
                    };
  
                    query.evm.createOneEvm(db, data, (err, res) => {
                      if (res) {
                        console.log(res);
                        bot.sendMessage(chatId, `Wallet: \n ${data.evmWallet}\n Success saved!!!`);
                      } else if (err) {
                        console.error('Error input ke DB', err);
                      }
                    });
                  }
                  if (action.startsWith('addnameevm')) {
                    const input = action.slice(10);
                    const data = {
                      telegramId: chatId,
                      evmWallet: input,
                      nameWallet: '',
                    };
                    bot.sendMessage(chatId, 'Please enter the wallet name:');
                    const nameListener = (msg) => {
                      let text = msg.text;
                      data.nameWallet = text;
                      query.evm.createOneEvm(db, data, (err, res) => {
                        if (res) {
                          bot.sendMessage(msg.chat.id, `${data.nameWallet}: \n ${data.evmWallet}\n Success saved!!!`);
                        }
                        if (err) throw err;
                      });
                      bot.removeListener('message', nameListener);
                    };
                    bot.on('message', nameListener);
                  }
  
                  bot.removeListener('callback_query', callbackListener);
                };
  
                bot.on('callback_query', callbackListener);
  
                bot.removeListener('message', messageListener);
              } else {
                bot.sendMessage(walletData.telegramId, 'Invalid Format Wallet');
                bot.removeListener('message', messageListener);
              }
            };
  
            bot.on('message', messageListener);
          }
        });
      }
  
      if (err) throw err;
    });
  };
  
  const handleSuiWallet = (db, bot, data) => {
    query.allusers.findOneUser(db, data, (err, result) => {
      if (result) {
        const limit = result[0].limit;
  
        query.sui.findAllSui(db, data, (err, res) => {
          if (res.length >= limit) {
            bot.sendMessage(data.telegramId, `Limit wallet (${res.length}/${limit})\n Anda Sudah Mencapai LIMIT, tidak dapat lagi menambah Wallet`);
          } else {
            bot.sendMessage(data.telegramId, `Limit wallet (${res.length}/${limit})\n Silahkan Masukan Sui wallet anda`);
  
            let messageListener = (msg) => {
              let walletData = {
                telegramId: msg.chat.id,
                suiWallet: msg.text,
              };
              if (walletData.suiWallet && walletData.suiWallet.match(/^0x[a-fA-F0-9]{64}$/)) {
                query.sui.createOneSui(db,walletData,(err,res)=>{
                    bot.sendMessage(walletData.telegramId, 'SET name Wallet', {
                        reply_markup: {
                            inline_keyboard: [
                            [
                                { text: 'SKIP', callback_data: `skipnamesui_${res.insertId}` },
                                { text: 'ADD NAME', callback_data: `addnamesui_${res.insertId}` }
                            ],
                            ]
                        }
                        });
                });
                

                const callbackListener = (callbackQuery) => {
                const action = callbackQuery.data;

                if (action.startsWith('skipnamesui_')) {
                    let input = action.slice(12)

                    const data = {
                    telegramId: callbackQuery.message.chat.id,
                    id: input,
                    };

                    query.sui.findOneSuiById(db, data, (err, res) => {
                    if (res.length>0) {
                        console.log(res);
                        bot.sendMessage(callbackQuery.message.chat.id, `${res[0].suiwallet.slice(0,5)+'..'} ${res[0].suiwallet.slice(-5)} : \n ${res[0].suiwallet}\n Success saved!!!`);
                    } else if (err) {
                        console.error('Error input ke DB', err);
                    }
                    });
                }
                if (action.startsWith('addnamesui_')) {
                    const input = action.slice(11);
                    const data = {
                    telegramId: callbackQuery.message.chat.id,
                    id: input,
                    
                    };

                    bot.sendMessage(callbackQuery.message.chat.id, 'Please enter the wallet name:');
                    //Event Listener
                    const messageListener = (msg) => {
                    let text = msg.text;
                    data.nameWallet = text;
                    query.sui.updateOneSuiById(db, data, (err, res) => {
                        if (res) {
                            query.sui.findOneSuiById(db,data,(err,result)=>{
                                if(res){
                                    bot.sendMessage(callbackQuery.message.chat.id, `${result[0].namewallet}: \n ${result[0].suiwallet}\n Success saved!!!`);
                                    bot.removeListener('message', messageListener);
                                }
                            })

                        // bot.sendMessage(msg.chat.id, ` Success saved!!!`);
                        // bot.removeListener('message', messageListener);
                        }
                        if (err) throw err;
                    });
                    };
                    bot.on('message', messageListener);
                }

                bot.removeListener('callback_query', callbackListener);
                };

                bot.on('callback_query', callbackListener);

                bot.removeListener('message', messageListener);

              } else {
                bot.sendMessage(walletData.telegramId, 'Invalid Format Wallet');
                bot.removeListener('message', messageListener);
              }
            };
  
            bot.on('message', messageListener);
          }
        });
      }
  
      if (err) throw err;
    });
  };
  
  
  const handleVenomWallet = (db, bot, data) => {
    query.allusers.findOneUser(db, data, (err, result) => {
      if (result) {
        const limit = result[0].limit;
  
        query.venom.findAllVenom(db, data, (err, res) => {
          if (res.length >= limit) {
            bot.sendMessage(data.telegramId, `Limit wallet (${res.length}/${limit})\n Anda Sudah Mencapai LIMIT, tidak dapat lagi menambah Wallet`);
          } else {
            bot.sendMessage(data.telegramId, `Limit wallet (${res.length}/${limit})\nSilahkan Masukan Venom wallet (0:64Char)`);
  
            const messageListener = (msg) => {
              const walletData = {
                telegramId: msg.chat.id,
                venomWallet: msg.text,
              };
  
              if (walletData.venomWallet && walletData.venomWallet.match(/^0:[a-fA-F0-9]{64}$/)) {
                query.venom.createOneVenom(db,walletData,(err,res)=>{
                    bot.sendMessage(walletData.telegramId, 'SET name Wallet', {
                        reply_markup: {
                            inline_keyboard: [
                            [
                                { text: 'SKIP', callback_data: `skipnamevenom${res.insertId}` },
                                { text: 'ADD NAME', callback_data: `addnamevenom${res.insertId}` }
                            ],
                            ]
                        }
                        });
                });
  
                const callbackListener = (callbackQuery) => {
                  const action = callbackQuery.data;
                  const chatId = callbackQuery.message.chat.id;
                  
  
                  if (action.startsWith('skipnamevenom')) {
                    const input = action.slice(13);
                    const data = {
                        telegramId: callbackQuery.message.chat.id,
                        id: input,
                        };
    
                        query.venom.findOneVenomById(db, data, (err, res) => {
                        if (res.length>0) {
                            console.log(res);
                            bot.sendMessage(callbackQuery.message.chat.id, `${res[0].venomwallet.slice(0,5)+'..'} ${res[0].venomwallet.slice(-5)} : \n ${res[0].venomwallet}\n Success saved!!!`);
                        } else if (err) {
                            console.error('Error input ke DB', err);
                        }
                        });
                  }
                  if (action.startsWith('addnamevenom')) {
                    setTimeout(()=>{
                        bot.deleteMessage(chatId,callbackQuery.message.message_id);
                    },500)
                    const input = action.slice(12);
                    const data = {
                      telegramId: chatId,
                      id: input,
                    };
                    bot.sendMessage(chatId, 'Please enter the wallet name:');
                    const messageListener = (msg) => {
                      let text = msg.text;
                      data.nameWallet = text;
                      query.venom.updateOneVenomNameById(db, data, (err, res) => {
                        if (res) {
                            query.venom.findOneVenomById(db,data,(err,result)=>{
                                if(result){
                                    console.log(result)
                                    bot.sendMessage(callbackQuery.message.chat.id, `${result[0].namewallet}: \n ${result[0].venomwallet}\n Success saved!!!`);
                                    bot.removeListener('message', messageListener);
                                }
                            })
                        }
                        if (err) throw err;
                      });
                    };
                    bot.on('message', messageListener);
                  }
  
                  bot.removeListener('callback_query', callbackListener);
                };
  
                bot.on('callback_query', callbackListener);
  
                bot.removeListener('message', messageListener);
              } else {
                bot.sendMessage(walletData.telegramId, 'Invalid Format Wallet');
                bot.removeListener('message', messageListener);
              }
            };
  
            bot.on('message', messageListener);
          }
        });
      }
  
      if (err) throw err;
    });
  };
  
  
  module.exports = {
    evm: handleEvmWallet,
    sui: handleSuiWallet,
    venom: handleVenomWallet,
  };
  