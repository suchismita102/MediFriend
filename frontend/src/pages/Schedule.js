import React, { useState } from "react";
import { handleSuccess, handleError } from "../utils";
import { addMedicine } from "../api/api";//gur

function Schedule({ closeModal, refresh }) {

  const [medicine, setMedicine] = useState({
    name: "",
    dosage: "",
    time: "",
    frequency: "daily"
  });

  const handleChange = (e) => {
    setMedicine({
      ...medicine,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const result = await addMedicine(medicine);

      if (result.success) {

        handleSuccess("Medicine Added Successfully");

        setMedicine({
          name: "",
          dosage: "",
          time: "",
          frequency: "daily"
        });

        if(refresh){
          refresh();     // ✅ reload medicine list
        }

        if(closeModal){
          closeModal();  // ✅ close popup automatically
        }

      } else {
        handleError(result.message || "Error adding medicine");
      }

    } catch (err) {
      handleError("Server Error");
    }
  };

 return (
  <div className="modal-form">

    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
      <h1>Add Medicine</h1>

      {/* Close button */}
      <button
        type="button"
        onClick={closeModal}
        style={{
          background:"#d7631b",
          padding:"7px 8px",
          fontSize:"14px"
        }}
      >
        Close
      </button>
    </div>

    <form onSubmit={handleSubmit}>

      <input
        name="name"
        placeholder="Medicine Name"
        value={medicine.name}
        onChange={handleChange}
        required
      />

      <input
        name="dosage"
        placeholder="Dosage (e.g. 1 pill)"
        value={medicine.dosage}
        onChange={handleChange}
        required
      />

      <input
        type="time"
        name="time"
        value={medicine.time}
        onChange={handleChange}
        required
      />

      <select
        name="frequency"
        value={medicine.frequency}
        onChange={handleChange}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>

      <button type="submit" 
      style={{
          background:"#136f2a",
          padding:"9px 8px",
          fontSize:"20px"
        }}
        >Add Medicine</button>

    </form>

  </div>
);
}

export default Schedule;