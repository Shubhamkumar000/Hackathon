import React, { useState } from 'react';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
    address: '',
    contact: '',
    pincode: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      username,
      password,
      email,
      address,
      contact,
      pincode,
    } = formData;

    // API URL for signup (replace with your actual backend URL)
    const endpoint = 'https://xnv54w0n-8080.inc1.devtunnels.ms/api/hospitals';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          username,
          password,
          email,
          address,
          contact,
          pincode,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Admin registration successful!');
        // Handle success, maybe redirect to login
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="signup-container">
      <h1>Admin Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter your address"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            placeholder="Enter your contact number"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            placeholder="Enter your pincode"
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default AdminSignup;