const router = require("express").Router();
const ensureAuthenticated = require("../Middlewares/Auth");

const {
  addMedicine,
  getMedicines,
  deleteMedicine,
  updateMedicine,
  markTaken,
  markMissed
} = require("../Controllers/MedicineController");

router.post("/add", ensureAuthenticated, addMedicine);

router.get("/", ensureAuthenticated, getMedicines);

router.delete("/:id", ensureAuthenticated, deleteMedicine);

router.put("/:id", ensureAuthenticated, updateMedicine);

router.put("/taken/:id", ensureAuthenticated, markTaken);

router.put("/missed/:id", ensureAuthenticated, markMissed);

module.exports = router;