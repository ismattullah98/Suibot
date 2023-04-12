module.exports = {
  let findOne = (db,data,callback)=>{
    let query = "SELECT * FROM  WHERE telegramid = ?"
    db.query(query,data.telegramId,callback)
    
  }
  let createOne = (db,data,callback)=>{
    let query = "INSERT INTO allusers "
    db.query(query,data,callback)
  }
  let updateOne = (db,data,callback)=>{
    
  }
}