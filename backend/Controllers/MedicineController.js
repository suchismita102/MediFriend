const Medicine = require("../Models/Medicine");

const addMedicine = async (req, res) => {
  try {

    const { name, dosage, time, frequency } = req.body;

    const now = new Date();
    const [hours, minutes] = time.split(":");

    const reminderDate = new Date();

    reminderDate.setHours(parseInt(hours));
    reminderDate.setMinutes(parseInt(minutes));
    reminderDate.setSeconds(0);
    reminderDate.setMilliseconds(0);

    if (reminderDate < now) {
      reminderDate.setDate(reminderDate.getDate() + 1);
    }

    const medicine = new Medicine({
      name,
      dosage,
      time,
      frequency,
      userId: req.user._id,
      nextReminder: reminderDate
    });

    await medicine.save();

    res.json({
      success: true,
      medicine
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};

const getMedicines = async (req, res) => {

  const medicines = await Medicine.find({
    userId: req.user._id
  });

  res.json({
    success: true,
    medicines
  });

};

const deleteMedicine = async (req, res) => {

  await Medicine.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Medicine deleted"
  });

};

const updateMedicine = async (req, res) => {

  const updated = await Medicine.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({
    success: true,
    medicine: updated
  });

};

const markTaken = async (req, res) => {

  const med = await Medicine.findById(req.params.id);

  med.status = "taken";
  med.takenCount += 1;

  // move reminder to next day
  const next = new Date(med.nextReminder);
  next.setDate(next.getDate() + 1);

  med.nextReminder = next;

  await med.save();

  res.json({
    success: true,
    medicine: med
  });

};
const markMissed = async (req, res) => {

  const med = await Medicine.findById(req.params.id);

  if (med.status !== "taken") {
    med.status = "missed";
    med.missedCount += 1;
  }

  await med.save();

  res.json({
    success: true,
    medicine: med
  });

};

module.exports = {
  addMedicine,
  getMedicines,
  deleteMedicine,
  updateMedicine,
  markTaken,
  markMissed
};