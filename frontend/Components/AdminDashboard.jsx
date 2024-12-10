import React, { useState, useEffect } from "react";
import axios from "axios";
import './AdminDashboard.css';

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

  // Function to modify the quantity on the server
  const modify = async ({ equipment, equipmentQuantity }) => {
    try {
      const serviceId = equipment._id;
      const response = await axios.put(
        `https://xnv54w0n-8080.inc1.devtunnels.ms/api/services/${serviceId}`,
        { quantity: Number(equipmentQuantity) }
      );
      if (response.status === 200) {
        console.log("Quantity updated successfully!");
      } else {
        console.log("Error updating quantity:", response.status);
      }
    } catch (err) {
      console.log("Error while modifying quantity:", err);
    }
  };

  // Handle input change for quantity
  const handleQuantityChange = (e, equipmentId) => {
    const value = e.target.value;
    if (value >= 0) { // Ensure the value is a positive number
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [equipmentId]: value, // Update the quantity for the specific equipment
      }));
    }
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
      <div className="cards-container">
        {Array.isArray(equipmentData) &&
          equipmentData.map((equipment) => {
            const imageUrl = equipment.picture
              ? `${equipment.picture}`
              : "https://via.placeholder.com/150";
            const equipmentQuantity = quantities[equipment._id] || equipment.quantity; // Get the quantity or default to existing
            const isShortage = equipmentQuantity < 10; // Check if there's a shortage

            return (
              <div className="equipment-card" key={equipment._id}>
                <img
                  src={imageUrl}
                  alt={equipment.name}
                  onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                />
                <div style={{ padding: "10px" }}>
                  <h3>{equipment.name}</h3>
                  <p>Quantity: {equipment.quantity}</p>
                  <p>Price: ₹{equipment.price}</p>
                  <p>Location: {equipment.username.address}</p>
                  <p>Contact: {equipment.username.contact}</p>
                  <p>Category: {equipment.category}</p>

                  {/* Conditionally render the shortage alert if quantity is less than 10 */}
                  {isShortage && (
                    <p className="shortage-alert">
                      Shortage Alert!
                    </p>
                  )}

                  <input
                    placeholder="Enter Quantity"
                    type="number"
                    value={quantities[equipment._id] || equipment.quantity}
                    onChange={(e) => handleQuantityChange(e, equipment._id)} // Update quantity for each equipment
                  />
                  <button
                    onClick={() => modify({ equipment, equipmentQuantity: quantities[equipment._id] || equipment.quantity })}
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
        className="add-equipment-button"
      >
        Add Equipment
      </button>
    </div>
  );
};

export default AdminDashboard;
