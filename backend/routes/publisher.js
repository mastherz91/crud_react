var connect = require("../db/conection");
var express = require("express");
var router = express.Router();

router.get("/", async (req, res) => {
  let db = await connect();
  let collection = await db.collection("publisher");
  let query = req.body;
  let results = await collection.find(query).toArray();
  res.send(results).status(200);
});

module.exports = router;