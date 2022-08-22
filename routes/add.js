const router = require("express").Router();
const db = require("../database/database");

router.route("/").put(async (req, res) => {
  let result = await db.addOne(req.body);
  res.status(200).json(result);
});

module.exports = router;
