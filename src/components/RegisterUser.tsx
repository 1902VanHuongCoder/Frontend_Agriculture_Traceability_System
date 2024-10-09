// RegisterUser.js
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import TestContract from '../Test.json'; // Path to the ABI JSON file

const RegisterUser = () => {
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


    const [userName, setUserName] = useState('');
    const [role, setRole] = useState('farmer');

    const registerUser = async () => {
        if (contract) {
            try {
                const tx = await contract.registerUser(userName, role);
                await tx.wait();
            } catch (error) {
                console.error(error);
                console.log("Đăng ký tài khoản người dùng không thành công!");
            }
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Register User</h2>
            <input
                type="text"
                className="border p-2 mb-4 w-full"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <select
                className="border p-2 mb-4 w-full"
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="farmer">Farmer</option>
                <option value="distributor">Distributor</option>
                <option value="retailer">Retailer</option>
                <option value="consumer">Consumer</option>
            </select>
            <button onClick={registerUser} className="bg-blue-600 text-white p-2 w-full rounded">Register</button>
        </div>
    );
};

export default RegisterUser;
