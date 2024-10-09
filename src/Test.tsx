import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import ProductTraceabilityABI from './ProductTraceabilityABI.json';
import './App.css';

const Test: React.FC = () => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [farmers, setFarmers] = useState<any[]>([]);
  const [newFarmerName, setNewFarmerName] = useState('');
  const [newFarmerLocation, setNewFarmerLocation] = useState('');
  const [newFarmerProductDetails, setNewFarmerProductDetails] = useState('');

  useEffect(() => {
    const initializeContract = async () => {
      // Check for Ethereum provider (MetaMask)
      if ((window as any).ethereum) {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const signer = await provider.getSigner();
        const contractAddress = '0x49B8dB3B6A6367b136E132EE93bCb69edD3a6A5E'; // Your contract address

        // Initialize contract
        const contractInstance = new ethers.Contract(contractAddress, ProductTraceabilityABI.abi, signer);
        setContract(contractInstance);

        // Load farmers after contract initialization
        await loadFarmers(contractInstance);
      } else {
        alert('Please install MetaMask!');
      }
    };

    initializeContract();
  }, []);

  const loadFarmers = async (contractInstance: ethers.Contract) => {
    const farmersData = await contractInstance.getFarmers();
    setFarmers(farmersData);
  };

  const addFarmer = async () => {
    if (contract) {
      try {
        const tx = await contract.addFarmer(newFarmerName, newFarmerLocation, newFarmerProductDetails);
        await tx.wait(); // Wait for the transaction to be mined
        await loadFarmers(contract); // Reload farmers after adding a new one
        // Reset input fields
        setNewFarmerName('');
        setNewFarmerLocation('');
        setNewFarmerProductDetails('');
      } catch (error) {
        console.error('Error adding farmer:', error);
      }
    }
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline text-slate-500">
        Hello world!
      </h1>
      <h1>Product Traceability</h1>
      <h2>Add Farmer</h2>
      <input
        type="text"
        placeholder="Name"
        value={newFarmerName}
        onChange={(e) => setNewFarmerName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={newFarmerLocation}
        onChange={(e) => setNewFarmerLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder="Product Details"
        value={newFarmerProductDetails}
        onChange={(e) => setNewFarmerProductDetails(e.target.value)}
      />
      <button onClick={addFarmer}>Add Farmer</button>

      <h2>Farmers List</h2>
      <ul>
        {farmers.map((farmer, index) => (
          <li key={index}>
            Name: {farmer.name}, Location: {farmer.location}, Product Details: {farmer.productDetails}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
