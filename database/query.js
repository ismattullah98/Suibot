//require('../.env').config()

let allusers = {
  findOneUser: (db,data,callback)=>{
    let find = "SELECT * FROM allusers WHERE telegramid = ?"
    db.query(find,data.telegramId,callback);
  },
  createOneUser: (db,data,callback)=>{
    let Dinput = {
      id: '',
      telegramid: data,
      premium: 0
    }
    let create = "INSERT INTO allusers (id,telegramid,premium) VALUES (?,?,?)"
    db.query(create,[Dinput.id,Dinput.telegramid,Dinput.premium], callback);

  },
  updateOneUser: (db,data,callback)=>{

  },
  deleteOneUser: (db,data,callback)=>{

  }
}

//SUI QUERY
let sui = {
  findOneSui: (db, data, callback) => {
    let find = "SELECT * FROM sui WHERE telegramid = ?"
    db.query(find, data.telegramId, callback)

  },
  createOneSui: (db, data, callback) => {
    let create = "INSERT INTO sui (id,telegramid,suiwallet,namewallet) VALUES (?,?,?,?) "
    db.query(create, ['',data.telegramId,data.suiWallet,''||data.nameWallet], callback)
  },
  updateOneSui: (db, data, callback) => {
    let update = "UPDATE sui SET suiwallet = ? WHERE telegramid = ?"
    db.query(update, data, callback)
  },
}
//EVM QUERY
let evm = {
  //FIND
  findOneEvm:(db,data,callback)=>{
    let findOne = "SELECT * FROM evm WHERE telegramid = ?"
    db.query(findOne,data.telegramId,callback)
  },
  findOneEvmPremium:(db,data,callback)=>{
    let find = "SELECT * FROM evm WHERE telegramid = ? AND evmwallet = ?"
    db.query(find,[data.telegramId,data.evmWallet],callback)
  },
  //CREATE
  createOneEvm: (db, data, callback) => {
    let create = "INSERT INTO evm (id,telegramid,evmwallet,namewallet) VALUES (?,?,?,?)"
    db.query(create, ['',data.telegramId,data.evmWallet,''||data.nameWallet], callback)
  },
  createOneEvmPremium: (db, data, callback) => {
    let create = "INSERT INTO evm (idtelegramid,evmwallet,namewallet) VALUES (?,?,?,?)"
    db.query(create, ['',data.telegramId,data.evmWallet,data.nameWallet], callback)
  },
  //UPDATE
  updateOneEvm: (db, data, callback) => {
    let update = "UPDATE evm SET evmwallet = ? WHERE telegramid = ?"
    db.query(update, [data.evmWallet,data.telegramid], callback)
  },
  updateOneEvmPremium: (db, data, callback) => {
    let update = "UPDATE evm SET evmwallet = ? WHERE telegramid = ? AND namewallet = ?"
    db.query(update, [data.telegramid,data.evmwallet,data.nameWallet], callback)
  },
}

module.exports =  {sui,evm,allusers};