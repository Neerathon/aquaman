const { Storage } = require("megajs")
const { MongoClient } = require("mongodb")

const Db = process.env.ATLAS_URI
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

var _db
var _conn
var _megaCloud

module.exports = {

  connectToServer: async function (callback) {
    // client.connect(function (err, db) {
    //   // Verify we got a good "db" object
    //   if (err || !db) {
    //     return callback(err)
    //   }
    //   _db = db.db("Neerathon");
    //   console.log("Successfully connected to MongoDB.")
    
    //   return callback()
    // })

    if (_db && _conn)
      return _db

    _conn = await client.connect()
    _db = await _conn.db(process.env.ATLAS_DATABASE)
    console.log("Successfully connected to MongoDB")
  },
 
  getDb: function () {
    return _db
  },

  connectToMegaCloud: async function() {
    _megaCloud = await new Storage({
      email: process.env.MEGA_EMAIL,
      password: process.env.MEGA_PASSWORD
    }).ready
  },

  getMegaCloud: function () {
    return _megaCloud
  }
}