import React, { useEffect } from "react";
import { deleteMedicine, markTaken, markMissed } from "../api/api";
import { toast } from "react-toastify";

function MedicineList({ medicines, refresh }) {

  const handleDelete = async (id) => {
    await deleteMedicine(id);
    toast.error("🗑️ Medicine deleted");
    refresh();
  };

  const handleTaken = async (med) => {

    const now = new Date();
    const reminder = new Date(med.nextReminder);

    const diffMinutes =
      (reminder.getTime() - now.getTime()) / (1000 * 60);

    // ❌ Too early
    if (diffMinutes > 30) {
      toast.warning(
        "⏳ You can take this medicine only within 30 minutes before the reminder."
      );
      return;
    }

    // ❌ Too late
    if (diffMinutes < -30) {
      toast.error(
        "❌ You cannot mark this medicine as taken after 30 minutes."
      );
      return;
    }

    await markTaken(med._id);
    toast.success("💊 Medicine marked as taken");
    refresh();
  };

  const formatTime = (dateString) => {

    if (!dateString) return "Not Scheduled";

    const date = new Date(dateString);

    if (isNaN(date)) return "Invalid Reminder";

    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };

  useEffect(() => {

    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const interval = setInterval(() => {

      medicines.forEach(async (med) => {

        const now = new Date();
        const reminder = new Date(med.nextReminder);

        const diffMinutes = (now - reminder) / (1000 * 60);

        // 🔔 Reminder notification
        if (diffMinutes >= 0 && diffMinutes < 2 && med.status === "pending") {

          new Notification("💊 Medicine Reminder", {
            body: `Time to take ${med.name}`
          });

          toast.info(`💊 Time to take ${med.name}`);
        }

        // ❌ Mark missed
        if (diffMinutes >= 2 && med.status === "pending") {

          await markMissed(med._id);
          toast.error(`❌ Missed ${med.name}`);
          refresh();
        }

      });

    }, 30000);

    return () => clearInterval(interval);

  }, [medicines]);

  return (

    <div className="medicine-grid">

      {medicines.map((med) => {

        const status = med.status;

        return (

          <div key={med._id} className="medicine-card">

            <h3>{med.name}</h3>

            <p>Dosage: {med.dosage}</p>

            <p>
              Time: {new Date(`1970-01-01T${med.time}`).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
                hour12: true
              })}
            </p>

            <p>Frequency: {med.frequency}</p>

            <p>Next Reminder: {formatTime(med.nextReminder)}</p>

            <p>
              Status:{" "}
              <span
                style={{
                  color:
                    status === "taken"
                      ? "green"
                      : status === "missed"
                      ? "red"
                      : "orange",
                  fontWeight: "bold"
                }}
              >
                {status.toUpperCase()}
              </span>
            </p>

            <p style={{ color: "green" }}>
              Taken: {med.takenCount}
            </p>

            <p style={{ color: "red" }}>
              Missed: {med.missedCount}
            </p>

            <div className="actions">

              <button
                onClick={() => handleTaken(med)}
                style={{
                  background: "#136f2a",
                  padding: "9px 12px",
                  fontSize: "16px",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Taken
              </button>

              <button
                style={{
                  background: "#c74821",
                  color: "white",
                  border: "none",
                  padding: "9px 12px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
                onClick={() => handleDelete(med._id)}
              >
                Delete
              </button>

            </div>

          </div>

        );

      })}

    </div>

  );
}

export default MedicineList;