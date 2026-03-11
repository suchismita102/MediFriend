import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MedicineList from "../Components/MedicineList";
import { getMedicines } from "../api/api";
import Schedule from "./Schedule";
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

function Home() {
  const [medicines, setMedicines] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
    fetchMedicines();
  }, []);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      medicines.forEach((med) => {
        const now = new Date();
        const reminder = new Date(med.nextReminder);
        const diff = (reminder - now) / 1000;

        if (diff <= 0 && diff > -60) {
          new Notification("Medicine Reminder 💊", {
            body: `Time to take ${med.name}`,
          });
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [medicines]);

  const fetchMedicines = async () => {
    const data = await getMedicines();
    if (data.success) {
      setMedicines(data.medicines);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");

    handleSuccess("Logged out successfully");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div>
      {/* Topbar */}
      <div
        className="topbar"
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        {/* App Icon */}
        <img
          src="myicon.jpg"
          alt="MediFriend Icon"
          style={{ width: "30px", height: "30px" }}
        />

        <h2 style={{ color: "#051347" }}>MediFriend</h2>

        <div style={{ display: "flex", gap: "10px", marginLeft: "auto" }}>
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button onClick={() => navigate("/profile")}>Profile</button>
          <button
            onClick={handleLogout}
            style={{ background: "#c74821", color: "#fff" }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="welcome-section" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      {/* Round Profile Button */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
    <button
      onClick={() => navigate("/profile")}
      title="Click to view profile"
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "none",
        backgroundColor: "#5a19b0",
        color: "#fff",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: "px",
      }}
    >
      {loggedInUser ? loggedInUser[0].toUpperCase() : "P"}
    </button>
  {/* Top row: Welcome + Profile */}

    <h2 style={{ margin: 0, fontSize: "27px" }}>Welcome {loggedInUser}</h2>


  </div>

 {/* Second row: Subtitle */}
<p style={{ margin: 0, color: "#0e3562", fontSize: "16px" }}>
  Your Medicine Reminder Assistant
</p>
  {/* Add Medicine Button */}
  <button
    onClick={() => setShowModal(true)}
    style={{
      padding: "10px 20px",
      fontSize: "16px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#275d97",
      color: "#fff",
      cursor: "pointer",
      alignSelf: "start", // aligns button to left
    }}
  >
    + Add Medicine
  </button>
</div>
      {/* Medicine List */}
      <MedicineList medicines={medicines} refresh={fetchMedicines} />

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <Schedule closeModal={() => setShowModal(false)} />
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Home;