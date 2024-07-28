var db = require('conection')
var express = require('express');
var router = express.Router();


// Get a list of 50 posts
router.get("/", async (req, res) => {
    let collection = await db.collection("hero_information");
    let results = await collection.find({})
      .limit(50)
      .toArray();
  
    res.send(results).status(200);
  });
  

module.exports = router;

