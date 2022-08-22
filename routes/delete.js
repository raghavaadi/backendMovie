const router = require("express").Router();
const db = require("../database/database");

router.route("/").delete(async (req, res) => {
  try {
    await db.deleteOne(req.body.name).then((resa) => {
      console.log(resa);
      let response = { data: resa, status: "success" };
      res.status(200).json(response);
    });
  } catch (e) {
    res.status(500).json({ status: "Failure" });
  }
});

module.exports = router;
