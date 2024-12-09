import React from "react";
import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
  const dummyData = [
    {
      id: 1,
      name: "Ventilator",
      quantity: 5,
      price: 1500,
      location: "Hospital A - Room 101",
      contact: "123-456-7890",
      imageUrl: "https://via.placeholder.com/150",
      category: "Equipment",
    },
    {
      id: 2,
      name: "Oxygen Cylinder",
      quantity: 10,
      price: 200,
      location: "Hospital B - Room 202",
      contact: "987-654-3210",
      imageUrl: "https://via.placeholder.com/150",
      category: "Equipment",
    },
    {
      id: 3,
      name: "Defibrillator",
      quantity: 3,
      price: 5000,
      location: "Hospital C - Room 303",
      contact: "555-111-2222",
      imageUrl: "https://via.placeholder.com/150",
      category: "Equipment",
    },
    {
      id: 4,
      name: "Syringe",
      quantity: 200,
      price: 0.5,
      location: "Pharmacy A",
      contact: "222-333-4444",
      imageUrl: "https://via.placeholder.com/150",
      category: "Medicine",
    },
    {
      id: 5,
      name: "Aspirin",
      quantity: 500,
      price: 5,
      location: "Pharmacy B",
      contact: "666-777-8888",
      imageUrl: "https://via.placeholder.com/150",
      category: "Medicine",
    },
    {
      id: 6,
      name: "Insulin",
      quantity: 50,
      price: 25,
      location: "Hospital D - Room 404",
      contact: "333-444-5555",
      imageUrl: "https://via.placeholder.com/150",
      category: "Medicine",
    },
    {
      id: 7,
      name: "Blood Pressure Monitor",
      quantity: 8,
      price: 100,
      location: "Hospital E - Room 505",
      contact: "111-222-3333",
      imageUrl: "https://via.placeholder.com/150",
      category: "Equipment",
    },
    {
      id: 8,
      name: "Thermometer",
      quantity: 30,
      price: 10,
      location: "Hospital F - Room 606",
      contact: "444-555-6666",
      imageUrl: "https://via.placeholder.com/150",
      category: "Equipment",
    },
    {
      id: 9,
      name: "Antibiotics",
      quantity: 1000,
      price: 2,
      location: "Pharmacy C",
      contact: "777-888-9999",
      imageUrl: "https://via.placeholder.com/150",
      category: "Medicine",
    },
    {
      id: 10,
      name: "Gloves",
      quantity: 1000,
      price: 0.2,
      location: "Hospital G - Room 707",
      contact: "555-666-7777",
      imageUrl: "https://via.placeholder.com/150",
      category: "Equipment",
    },
  ];

  return (
    <div className="main-page" style={{ padding: "20px", textAlign: "center" }}>
      <h1>Available Equipment and Medicines</h1>
      <div className="cards-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {dummyData.map((equipment) => (
          <div
            className="equipment-card"
            key={equipment.id}
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
              src={equipment.imageUrl}
              alt={equipment.name}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <div style={{ padding: "10px" }}>
              <h3>{equipment.name}</h3>
              <p>Quantity: {equipment.quantity}</p>
              <p>Price: ${equipment.price}</p>
              <p>Location: {equipment.location}</p>
              <p>Contact: {equipment.contact}</p>
              <p>Category: {equipment.category}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => window.location.href = "/add-equipment"}
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
