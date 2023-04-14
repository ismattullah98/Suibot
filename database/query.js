let sui = {
  findOne: (db, data, callback) => {
    let query = "SELECT * FROM  WHERE telegramid = ?"
    db.query(query, data.telegramId, callback)

  },
  createOne: (db, data, callback) => {
    let query = "INSERT INTO allusers "
    db.query(query, data, callback)
  },
  updateOne: (db, data, callback) => {
  },
}
module.exports =  sui;