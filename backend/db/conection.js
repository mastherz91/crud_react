
const { MongoClient } = require('mongodb')
require('dotenv').config()

const connect = async function() {
  const connectionString = process.env.ATLAS_URI;

  const client = new MongoClient(connectionString);

  let conn;
  try {
    conn = await client.connect();
    return conn.db("heroes");
  } catch(e) {
    console.error(e);
  } 
}


module.exports = connect;