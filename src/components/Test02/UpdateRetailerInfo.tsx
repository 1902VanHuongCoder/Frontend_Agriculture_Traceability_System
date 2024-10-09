import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractABI from '../../Test01.json';

function UpdateRetailerInfo() {
    const [productId, setProductId] = useState('');
    const [retailerName, setRetailerName] = useState('');
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



    const updateRetailerInfo = async () => {
        if (contract) {
            try {

                const tx = await contract.updateRetailerInfo(productId, retailerName);
                await tx.wait();
                alert("Retailer info updated successfully!");

            } catch (error) {
                console.error("Update failed", error);
            }
        };
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold">Update Retailer Info</h1>
            <input
                type="number"
                placeholder="Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="block w-full p-2 mt-2 border rounded"
            />
            <input
                type="text"
                placeholder="Retailer Name"
                value={retailerName}
                onChange={(e) => setRetailerName(e.target.value)}
                className="block w-full p-2 mt-2 border rounded"
            />
            <button
                onClick={updateRetailerInfo}
                className="block w-full p-2 mt-4 bg-yellow-500 text-white rounded"
            >
                Update Info
            </button>
        </div>
    );
}

export default UpdateRetailerInfo;
