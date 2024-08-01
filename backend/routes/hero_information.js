const { ObjectId } = require("mongodb");
var connect = require("../db/conection");
var express = require("express");
var router = express.Router();

// Get a list of 50 posts
router.get("/", async (req, res) => {
  let db = await connect();
  let collection = await db.collection("hero_information");
  let results = await collection.find({}).toArray();

  res.send(results).status(200);
});

//buscador de info
router.get("/info", async (req, res) => {
  let db = await connect();
  let collection = await db.collection("hero_information");
  let query = req.body;
  let results = await collection.find(query).toArray();
  res.send(results).status(200);
});

router.post("/", async (req, res) => {
  let db = await connect();
  let collection = await db.collection("hero_information");
  let newDocument = req.body;
  let results = await collection.insertOne(newDocument);
  res.send(results).status(200);
});


router.delete("/:id", async (req, res) => {
  let db = await connect();
  let collection = await db.collection("hero_information");
  const query={_id:new ObjectId(req.params.id)}
  let results = await collection.deleteOne(query);
  res.send(results).status(200);
});

router.put("/:id", async (req, res) => {
  let db = await connect();
  let collection = await db.collection("hero_information");
  const query = { _id:new ObjectId(req.params.id) };
  const updates = {
    $set: req.body,
  };
  let results = await collection.updateOne(query, updates);
  res.send(results).status(200);
});

module.exports = router;
