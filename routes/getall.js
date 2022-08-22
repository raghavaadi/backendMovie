const router = require("express").Router();
const db = require("../database/database");

router.route("/").get(async (req, res) => {
  try {
    let result = await db.getall(req.body).then((resa) => {
      let response = { data: resa, status: "success" };
      res.status(200).json(response);
    });
  } catch (e) {
    res.status(500).json({ status: "Failure" });
  }
});

module.exports = router;
