require('dotenv').config()
const crypto = require('crypto');
const tableUsers = process.env.TABLE_USERS;
const tableSui = process.env.TABLE_W_SUI;
const tableEvm = process.env.TABLE_W_EVM;
const tableVenom = process.env.TABLE_W_VENOM;
let allusers = {
  findOneUser: (db,data,callback)=>{
    let find = 'SELECT * FROM `'+tableUsers+'` WHERE `telegramid` = ?'
    db.query(find, data.telegramId,callback);
  },
  createOneUser: (db,data,callback)=>{
    let Dinput = {
      id: 1,
      telegramid: data,
      premium: 0,
      limit: 10,
    }
    let create = 'INSERT INTO `'+tableUsers+'` (`telegramid`,`premium`,`limit`) VALUES (?,?,?); '
    db.query(create, [ Dinput.telegramid, Dinput.premium, Dinput.limit], callback);

  },
  updateOneUser: (db,data,callback)=>{

  },
  deleteOneUser: (db,data,callback)=>{

  }
}

//SUI QUERY
let sui = {
  findOneSui: (db, data, callback) => {
    let find = 'SELECT * FROM `'+tableSui+'` WHERE `telegramid` = ? and `codewallet` = ?'
    db.query(find, [data.telegramId,data.codeWallet], callback)

  },
  findOneSuiByCodeWallet: (db, data, callback) => {
    let find = 'SELECT * FROM `'+tableSui+'` WHERE `telegramid` = ? and `codewallet` = ?'
    db.query(find, [data.telegramId,data.codeWallet], callback)

  },
  findAllSui: (db, data, callback) => {
    let find = 'SELECT * FROM `'+tableSui+'` WHERE `telegramid` = ?'
    db.query(find, data.telegramId, callback)

  },
  createOneSui: (db, data, callback) => {
    let randomBuffer = crypto.randomBytes(10)
    let randomString = randomBuffer.toString('hex')
    let nameWallet = data.nameWallet
    let codeWallet = 'sui_'+ randomString;
    let create = 'INSERT INTO `'+tableSui+'` (`telegramid`, `suiwallet`, `namewallet`, `codewallet`) VALUES (?,?,?,?) '
    db.query(create, [data.telegramId,data.suiWallet,nameWallet? nameWallet: '',codeWallet], callback)
  },
  updateOneSui: (db, data, callback) => {
    let update = 'UPDATE `'+tableSui+'` SET `suiwallet` = ? WHERE `telegramid` = ?'
    db.query(update, [data.suiWallet, data.telegramId], callback)
  },
  updateOneSuiWalletByCode: (db, data, callback) => {
    let update = 'UPDATE `'+tableSui+'` SET `suiwallet` = ? WHERE `telegramid` = ? AND `codewallet`=?' 
    db.query(update, [data.suiWallet, data.telegramId,data.codeWallet], callback)
  },
  updateOneSuiNameWalletByCode: (db, data, callback) => {
    let update = 'UPDATE `'+tableSui+'` SET `namewallet` = ? WHERE `telegramid` = ? AND `codewallet`=?' 
    db.query(update, [data.nameWallet, data.telegramId,data.codeWallet], callback)
  },
  deleteOneSuiByCode: (db,data,callback)=>{
    let del = 'DELETE FROM `'+tableSui+'` WHERE `telegramid`= ? AND `codewallet`=?'
      db.query(del,[data.telegramId, data.codeWallet], callback)
  }
}
//EVM QUERY
let evm = {
  //FIND
  findAllEvm:(db,data,callback)=>{
    let findAll = 'SELECT * FROM `'+tableEvm+'` WHERE `telegramid` = ?'
    db.query(findAll,data.telegramId,callback)
  },
  findOneEvmByWallet:(db,data,callback)=>{
    let find = 'SELECT * FROM `'+tableEvm+'` WHERE `evmwallet` = ?'
    db.query(find,[data.evmWallet],callback)
  },
  findOneEvmByCodeWallet:(db,data,callback)=>{
    let find = 'SELECT * FROM `'+tableEvm+'` WHERE `codewallet` = ? AND `telegramid` =?'
    db.query(find,[data.codeWallet,data.telegramId],callback)
  },
  //CREATE
  createOneEvm: (db, data, callback) => {
    let randomBuffer = crypto.randomBytes(10)
    let randomString = randomBuffer.toString('hex')
    let codeWallet = 'evm_'+ randomString
    let create = 'INSERT INTO `'+tableEvm+'` (`telegramid`,`evmwallet`, `namewallet`, `codewallet`) VALUES (?,?,?,?)'
    db.query(create, [data.telegramId,data.evmWallet,data.nameWallet? data.nameWallet:'' ,codeWallet], callback)
  },
  createOneEvmPremium: (db, data, callback) => {
    let create = 'INSERT INTO `'+tableEvm+'` (`telegramid`, `evmwallet`, `namewallet`, `codewallet`) VALUES (?,?,?,?)'
    db.query(create, [data.telegramId,data.evmWallet,data.nameWallet], callback)
  },
  //UPDATE
  updateOneEvmWalletByCode: (db, data, callback) => {
    let update = 'UPDATE `'+tableEvm+'` SET `evmwallet` = ? WHERE `telegramid` = ? AND `codewallet` = ?'
    db.query(update, [data.evmWallet,data.telegramId,data.codeWallet], callback)
  },
  updateOneEvmNameByCode: (db, data, callback) => {
    let update = 'UPDATE `'+tableEvm+'` SET `namewallet` = ? WHERE `telegramid` = ? AND `codewallet` = ?'
    db.query(update, [data.nameWallet,data.telegramId,data.codeWallet], callback)
  },
  updateOneEvmPremium: (db, data, callback) => {
    let update = 'UPDATE `'+tableEvm+'` SET `evmwallet` = ? WHERE `telegramid` = ? AND `codewallet` = ?'
    db.query(update, [data.telegramid,data.evmwallet,data.codeWallet], callback)
  },
  deleteOneEvm: (db,data,callback)=>{
    let del = 'Delete'
      db.query(del,[data.telegramId, data.codeWallet], callback)
  },
  deleteOneEvmByCode: (db,data,callback)=>{
    let del = 'DELETE FROM `'+tableEvm+'` WHERE `telegramid`= ? AND `codewallet`=?'
      db.query(del,[data.telegramId, data.codeWallet], callback)
  }
}

//VENOM QUERY
let venom = {
  findOneVenom: (db, data, callback) => {
    let find = 'SELECT * FROM `'+tableVenom+'` WHERE `telegramid` = ?'
    db.query(find, data.telegramId, callback)

  },
  findOneVenomByCode: (db, data, callback) => {
    let find = 'SELECT * FROM `'+tableVenom+'` WHERE `telegramid` = ? AND `codewallet` = ?'
    db.query(find, [data.telegramId,data.codeWallet], callback)

  },
  createOneVenom: (db, data, callback) => {
    let randomBuffer = crypto.randomBytes(10)
    let randomString = randomBuffer.toString('hex')
    let codeWallet = 'venom_'+randomString;
    let create = 'INSERT INTO `'+tableVenom+'` (`telegramid`, `venomwallet`, `namewallet`, `codewallet`) VALUES (?,?,?,?)'
    db.query(create, [data.telegramId,data.venomWallet,data.nameWallet? data.nameWallet:'',codeWallet], callback)
  },
  updateOneVenom: (db, data, callback) => {
    let update = 'UPDATE `'+tableVenom+'` SET `venomwallet` = ? WHERE `telegramid` = ? and `codewallet` = ?'
    db.query(update, [data.venomWallet,data.telegramId,data.codeWallet], callback)
  },
  updateOneVenomByCode: (db, data, callback) => {
    let update = 'UPDATE `'+tableVenom+'` SET `venomwallet` = ? WHERE `telegramid` = ? and `codewallet` = ?'
    db.query(update, [data.venomWallet,data.telegramId,data.codeWallet], callback)
  },
  updateOneVenomNameByCode: (db, data, callback) => {
    let update = 'UPDATE `'+tableVenom+'` SET `namewallet` = ? WHERE `telegramid` = ? and `codewallet` = ?'
    db.query(update, [data.nameWallet,data.telegramId,data.codeWallet], callback)
  },
  deleteOneVenomByCode: (db,data,callback)=>{
    let del = 'DELETE FROM `'+tableVenom+'` WHERE `telegramid`= ? AND `codewallet`=?'
      db.query(del,[data.telegramId, data.codeWallet], callback)
  }
}

module.exports =  {sui,evm,venom,allusers};