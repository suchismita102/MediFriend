import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "../utils";
import { ToastContainer } from "react-toastify";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // Fetch profile from backend
  const fetchProfile = async () => {
    try {
      const response = await fetch("http://localhost:8080/profile", {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });

      const result = await response.json();

      if (result.success) {
        setUser({
          name: result.user.name,
          email: result.user.email,
          password: "",
          profilePic: result.user.profilePic
        });
      }
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  /* ADD THIS */
      useEffect(()=>{
          document.body.className = "auth-page";
          return ()=>{
              document.body.className = "";
          }
      },[]);
  

  // Always update state when typing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

const updateProfile = async (e) => {
  e.preventDefault();

  // Name validation
  if (user.name && (user.name.trim().length < 5 || user.name.trim().length > 100)) {
    return handleError("Name must be between 5 and 100 characters");
  }

  // Password validation
  if (user.password && (user.password.length < 4 || user.password.length > 100)) {
    return handleError("Password must be between 4 and 100 characters");
  }

  try {
    const response = await fetch("http://localhost:8080/profile/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify(user)
    });

    const result = await response.json();

    if (result.success) {
      handleSuccess(result.message);
      setIsEditing(false);
      localStorage.setItem("loggedInUser", result.user.name);
      setUser({ ...result.user, password: "" }); // reset password field
    } else {
      handleError(result.message); // email conflict or other backend error
    }
  } catch (err) {
    handleError(err);
  }
};

  return (
    <div className="container">
      <h1>My Profile</h1>

      {/* PROFILE IMAGE */}
      <div style={{ marginBottom: "20px" }}>
        <img
          src={user.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          alt="profile"
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            objectFit: "cover"
          }}
        />
      </div>

      {!isEditing ? (
        <>
          <p style={{ fontSize: "20px" }}>
            <b>Name:</b> {user.name}
          </p>
          <p style={{ fontSize: "20px" }}>
            <b>Email:</b> {user.email}
          </p>

          <br />

          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          <br /><br />
          <button onClick={() => navigate("/home")}>Back to Home</button>
        </>
      ) : (
        <form onSubmit={updateProfile}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Profile Picture URL</label>
            <input
              type="text"
              name="profilePic"
              placeholder="Paste image URL"
              value={user.profilePic}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>New Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter new password"
              value={user.password}
              onChange={handleChange}
            />
            <small>Leave empty to keep existing password (4–100 chars if changing)</small>
          </div>

          <br />

          <button type="submit">Save Changes</button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </form>
      )}

      <ToastContainer />
    </div>
  );
}

export default Profile;