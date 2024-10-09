import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import TestContract from '../Test.json'; // Path to the ABI JSON file


const UpdateDistributorInfo = () => {
    const [productId, setProductId] = useState('');
    const [distributorName, setDistributorName] = useState('');
    const [receivingDate, setReceivingDate] = useState('');
    const [productWeight, setProductWeight] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
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

    const updateDistributorInfo = async () => {
        if (contract) {
            try {

                const tx = await contract.updateDistributorInfo(productId, distributorName, receivingDate, productWeight, deliveryDate);
                await tx.wait();

            } catch (error) {
                console.error(error);

            }
        }

    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Update Distributor Info</h2>
            <input
                type="text"
                className="border p-2 mb-4 w-full"
                placeholder="Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
            />
            <input
                type="text"
                className="border p-2 mb-4 w-full"
                placeholder="Distributor Name"
                value={distributorName}
                onChange={(e) => setDistributorName(e.target.value)}
            />
            <input
                type="date"
                className="border p-2 mb-4 w-full"
                value={receivingDate}
                onChange={(e) => setReceivingDate(e.target.value)}
            />
            <input
                type="number"
                className="border p-2 mb-4 w-full"
                placeholder="Product Weight (kg)"
                value={productWeight}
                onChange={(e) => setProductWeight(e.target.value)}
            />
            <input
                type="date"
                className="border p-2 mb-4 w-full"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
            />
            <button onClick={updateDistributorInfo} className="bg-yellow-500 text-white p-2 w-full rounded">Update Info</button>
        </div>
    );
};

export default UpdateDistributorInfo;
