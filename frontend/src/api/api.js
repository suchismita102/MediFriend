const API = "http://localhost:8080/medicine";

export const getMedicines = async () => {

  const token = localStorage.getItem("token");

  const res = await fetch(API, {
    headers: {
      Authorization: token
    }
  });

  return res.json();
};

export const addMedicine = async (data) => {

  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(data)
  });

  return res.json();
};

export const deleteMedicine = async (id) => {

  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token
    }
  });

  return res.json();
};

export const updateMedicine = async (id,data) => {

  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(data)
  });

  return res.json();
};

export const markTaken = async (id) => {

  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/taken/${id}`, {
    method: "PUT",
    headers: {
      Authorization: token
    }
  });

  return res.json();
};
export const markMissed = async (id) => {

  const response = await fetch(`http://localhost:8080/medicine/missed/${id}`,{
    method: "PUT",
    headers:{
      "Content-Type":"application/json",
      Authorization: localStorage.getItem("token")
    }
  });

  return response.json();

};