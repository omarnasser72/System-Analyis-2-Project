// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You may need to install axios: npm install axios

// Define your functional component
const Companies = () => {
  // State to store the list of companies
  const [companies, setCompanies] = useState([]);

  // Function to fetch companies data from backend
  const fetchCompanies = async () => {
    try {
      const response = await axios.get('/api/companies'); // Update the endpoint as per your backend
      setCompanies(response.data); // Assuming your backend returns an array of companies
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  // useEffect hook to fetch data when component mounts
  useEffect(() => {
    fetchCompanies();
  }, []); // Empty dependency array means this effect runs only once after the first render

  // Render function
  return (
    <div>
      <h1>Companies</h1>
      <ul>
        {companies.map(company => (
          <li key={company._id}>
            <h2>{company.name}</h2>
            <p>{company.info}</p>
            <p>{company.major}</p>
            <p>Created at: {new Date(company.createdAt).toLocaleString()}</p>
            {/* Assuming createdAt is part of your schema */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Companies;
