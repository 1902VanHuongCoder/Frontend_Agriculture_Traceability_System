// AddProduct.js
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import TestContract from '../Test.json'; // Path to the ABI JSON file


const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [imageHash, setImageHash] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [farmLocation, setFarmLocation] = useState('');
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
      const initializeContract = async () => {
          // Check for Ethereum provider (MetaMask)
          if ((window as any).ethereum) {
              const provider = new ethers.BrowserProvider((window as any).ethereum);
              const signer = await provider.getSigner();
              const contractAddress = '0xdAb120DCdd63FD5cd84a3878f3928195885fDB70'; // Your contract address

              // Initialize contract
              const contractInstance = new ethers.Contract(contractAddress, TestContract.abi, signer);
              setContract(contractInstance);
              // await loadFarmerData(contractInstance);
          } else {
              alert('Please install MetaMask!');
          }
      };

      initializeContract();
  }, []);


  const addProduct = async () => {
    if(contract){
    try {
      
      const tx = await contract.addProduct(imageHash, productName, plantingDate, harvestDate, "Farmer Name", farmLocation);
      await tx.wait();
     
    } catch (error) {
      console.error(error);
     
    }}
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <input
        type="text"
        className="border p-2 mb-4 w-full"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        type="text"
        className="border p-2 mb-4 w-full"
        placeholder="Image Hash (IPFS)"
        value={imageHash}
        onChange={(e) => setImageHash(e.target.value)}
      />
      <input
        type="date"
        className="border p-2 mb-4 w-full"
        value={plantingDate}
        onChange={(e) => setPlantingDate(e.target.value)}
      />
      <input
        type="date"
        className="border p-2 mb-4 w-full"
        value={harvestDate}
        onChange={(e) => setHarvestDate(e.target.value)}
      />
      <input
        type="text"
        className="border p-2 mb-4 w-full"
        placeholder="Farm Location"
        value={farmLocation}
        onChange={(e) => setFarmLocation(e.target.value)}
      />
      <button onClick={addProduct} className="bg-green-600 text-white p-2 w-full rounded">Add Product</button>
    </div>
  );
};

export default AddProduct;
