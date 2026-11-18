const router = require("express").Router();
const controller = require("../controllers/bookController");

router.get("/", controller.getBooks);
router.post("/", controller.createBook);
router.put("/:id", controller.updateBook);
router.delete("/:id", controller.deleteBook);

module.exports = router;
