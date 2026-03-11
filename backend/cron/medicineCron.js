const cron = require("node-cron");
const Medicine = require("../Models/Medicine");

// run every minute to mark missed medicines
cron.schedule("* * * * *", async () => {
  try {
    const medicines = await Medicine.find({ status: "pending" });
    const now = new Date();

    for (let med of medicines) {
      const reminder = new Date(med.nextReminder);
      const diffMinutes = (now - reminder) / (1000 * 60);

      if (diffMinutes >= 2) {
        med.status = "missed";
        med.missedCount += 1;
        await med.save();
        console.log(`Medicine missed: ${med.name}`);
      }
    }
  } catch (err) {
    console.log("Cron error:", err);
  }
});

// reset missed → pending at **midnight**
cron.schedule("0 0 * * *", async () => {
  try {
    await Medicine.updateMany(
      { status: "missed" },
      { status: "pending" }
    );
    console.log("Missed medicines reset to pending at midnight");
  } catch (err) {
    console.log("Reset error:", err);
  }
});