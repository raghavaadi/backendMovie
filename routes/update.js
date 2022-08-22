const router = require("express").Router();
const db = require("../database/database");

router.route("/").post(async (req, res) => {
  try {
    let result = await db.updateOne(req.body.data, req.body.name);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ status: "Failure" });
  }
});

module.exports = router;
