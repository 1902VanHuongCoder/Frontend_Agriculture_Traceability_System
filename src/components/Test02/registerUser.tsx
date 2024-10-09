import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom'; // Import useNavigate  
import contractABI from '../../Test01.json';

function RegisterUser() {
    const [userName, setUserName] = useState('');
    const [role, setRole] = useState('');
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const navigate = useNavigate(); // Initialize useNavigate  

    useEffect(() => {
        console.log("Hello");
        const initializeContract = async () => {
            // Check for Ethereum provider (MetaMask)  
            if ((window as any).ethereum) {
                const provider = new ethers.BrowserProvider((window as any).ethereum);
                const signer = await provider.getSigner();
                const contractAddress = '0x67b62Ab16413f54f629ef8C687dB94A8Ba9120A6'; // Your contract address  

                // Initialize contract  
                const contractInstance = new ethers.Contract(contractAddress, contractABI.abi, signer);
                setContract(contractInstance);
            } else {
                alert('Please install MetaMask!');
            }
        };

        initializeContract();
    }, []);

    const registerUser = async () => {
        if (contract) {
            try {
                const tx = await contract.registerUser(userName, role);
                await tx.wait();
                alert("User registered successfully!");

                // Navigate to the appropriate route based on the role  
                switch (role) {
                    case 'customer': navigate('/customer-trace');
                        break;
                    case 'farmer':
                        navigate('/add-product');
                        break;
                    case 'distributor':
                        navigate('/update-distributor-info');
                        break;
                    case 'retailer':
                        navigate('/update-retailer-info');
                        break;
                    default:
                        alert('No valid role selected');
                        break;
                }
            } catch (error) {
                console.error("Registration failed", error);
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold">Register User</h1>
            <input
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="block w-full p-2 mt-2 border rounded"
            />
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="block w-full p-2 mt-2 border rounded"
            >
                <option value="">Select role</option>
                <option value="farmer">Farmer</option>
                <option value="distributor">Distributor</option>
                <option value="retailer">Retailer</option>
                <option value="consumer">Consumer</option>
            </select>
            <button
                onClick={registerUser}
                className="block w-full p-2 mt-4 bg-blue-500 text-white rounded"
            >
                Register
            </button>
        </div>
    );
}

export default RegisterUser;