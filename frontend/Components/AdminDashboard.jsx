import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [equipmentData, setEquipmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantities, setQuantities] = useState({}); // Track quantities for each equipment
  const id = localStorage.getItem("username");

  // Replace with your actual API URL
  const API_URL = `https://xnv54w0n-8080.inc1.devtunnels.ms/api/services/${id}`;

  // Fetch equipment and medicine data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const result = await response.json();
          console.log(result); // Log the result to see its structure
          if (Array.isArray(result)) {
            setEquipmentData(result);  // Assuming response is an array of equipment data
          } else {
            setError("Data format error: Expected an array.");
          }
        } else {
          setError("Failed to fetch equipment data.");
        }
      } catch (error) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const modify = async ({ equipment, equipmentQuantity }) => {
    try {
      const serviceId = equipment._id;
      const response = await axios.put(
        `https://xnv54w0n-8080.inc1.devtunnels.ms/api/services/${serviceId}`,
        { quantity: Number(equipmentQuantity) }
      );
      console.log("quantity changed");
    } catch (err) {
      console.log("quantity got error");
    }
  };

  const handleQuantityChange = (e, equipmentId) => {
    const value = e.target.value;
    setQuantities({
      ...quantities,
      [equipmentId]: value, // Update the quantity for the specific equipment
    });
  };

  if (loading) {
    return (
      <div className="main-page" style={{ padding: "20px", textAlign: "center" }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-page" style={{ padding: "20px", textAlign: "center" }}>
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <div className="main-page" style={{ padding: "20px", textAlign: "center" }}>
      <h1>Available Equipment and Medicines</h1>
      <div
        className="cards-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {Array.isArray(equipmentData) &&
          equipmentData.map((equipment) => {
            const imageUrl = equipment.picture
              ? `${equipment.picture}`
              : "https://via.placeholder.com/150";
            const equipmentQuantity = quantities[equipment._id] || equipment.quantity; // Get the quantity or default to existing

            return (
              <div
                className="equipment-card"
                key={equipment._id}
                style={{
                  width: "200px",
                  margin: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  textAlign: "center",
                }}
              >
                <img
                  src={imageUrl}
                  alt={equipment.name}
                  onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <div style={{ padding: "10px" }}>
                  <h3>{equipment.name}</h3>
                  <p>Quantity: {equipment.quantity}</p>
                  <p>Price: ${equipment.price}</p>
                  <p>Location: {equipment.username.address}</p>
                  <p>Contact: {equipment.username.contact}</p>
                  <p>Category: {equipment.category}</p>
                  <input
                    placeholder="Enter Quantity"
                    type="number"
                    value={equipmentQuantity}
                    onChange={(e) => handleQuantityChange(e, equipment._id)} // Update quantity for each equipment
                  />
                  <button
                    onClick={() => modify({ equipment, equipmentQuantity })}
                  >
                    Change
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <button
        onClick={() => (window.location.href = "/add-equipment")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Equipment
      </button>
    </div>
  );
};

export default AdminDashboard;
