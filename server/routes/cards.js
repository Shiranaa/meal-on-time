var express = require("express");
var router = express.Router();
const cards = require("../controllers/cards");

router.get("/", cards.getCards);
router.get("/export", cards.exportToFile);
router.get("/:id", cards.findCard);
router.get("/sort/:dir", cards.sortCards);
router.patch("/:id", cards.updateCard);

module.exports = router;
