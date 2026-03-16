const cron = require("node-cron");
const Medicine = require("../Models/Medicine");
//
// run every minute
cron.schedule("* * * * *", async () => {

  try {

    const medicines = await Medicine.find({
      nextReminder: { $ne: null }
    });

    const now = new Date();

    for (let med of medicines) {

      if (!med.nextReminder) continue;

      const reminder = new Date(med.nextReminder);

      const diffMinutes = (now - reminder) / (1000 * 60);

      // mark missed after 30 minutes
      if (diffMinutes >= 30 && med.status === "pending") {

        med.status = "missed";
        med.missedCount += 1;

        const next = new Date(reminder);

        if (med.frequency === "daily") {
          next.setDate(next.getDate() + 1);
        }

        if (med.frequency === "weekly") {
          next.setDate(next.getDate() + 7);
        }

        if (med.frequency === "once") {
          med.nextReminder = null;
        } else {
          med.nextReminder = next;
        }

        await med.save();

        console.log(`Medicine missed: ${med.name}`);

      }

    }

  } catch (err) {

    console.log("Cron error:", err);

  }

});