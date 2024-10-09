import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractABI from '../../Test01.json';

function AddProduct() {
    const [productName, setProductName] = useState('');
    const [imageHash, setImageHash] = useState('');
    const [plantingDate, setPlantingDate] = useState('');
    const [harvestDate, setHarvestDate] = useState('');
    const [farmerName, setFarmerName] = useState('');
    const [contract, setContract] = useState<ethers.Contract | null>(null);

    useEffect(() => {
        const initializeContract = async () => {
            // Check for Ethereum provider (MetaMask)
            if ((window as any).ethereum) {
                const provider = new ethers.BrowserProvider((window as any).ethereum);
                const signer = await provider.getSigner();
                const contractAddress = '0x67b62Ab16413f54f629ef8C687dB94A8Ba9120A6'; // Your contract address

                // Initialize contract
                const contractInstance = new ethers.Contract(contractAddress, contractABI.abi, signer);
                setContract(contractInstance);
                // await loadFarmerData(contractInstance);
            } else {
                alert('Please install MetaMask!');
            }
        };

        initializeContract();
    }, []);


    const addProduct = async () => {
        if (contract) {
            try {

                const tx = await contract.addProduct(imageHash, productName, plantingDate, harvestDate, farmerName);
                await tx.wait();
                alert("Product added successfully!");

            } catch (error) {
                console.error(error);
                console.error("Adding product failed", error);
            }
        };
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold">Add Product</h1>
            <input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="block w-full p-2 mt-2 border rounded"
            />
            <input
                type="text"
                placeholder="Image Hash"
                value={imageHash}
                onChange={(e) => setImageHash(e.target.value)}
                className="block w-full p-2 mt-2 border rounded"
            />
            <input
                type="date"
                placeholder="Planting Date"
                value={plantingDate}
                onChange={(e) => setPlantingDate(e.target.value)}
                className="block w-full p-2 mt-2 border rounded"
            />
            <input
                type="date"
                placeholder="Harvest Date"
                value={harvestDate}
                onChange={(e) => setHarvestDate(e.target.value)}
                className="block w-full p-2 mt-2 border rounded"
            />
            <input
                type="text"
                placeholder="Farmer Name"
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                className="block w-full p-2 mt-2 border rounded"
            />
            <button
                onClick={addProduct}
                className="block w-full p-2 mt-4 bg-green-500 text-white rounded"
            >
                Add Product
            </button>
        </div>
    );
}

export default AddProduct;
