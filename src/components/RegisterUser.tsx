import React, { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom'; // Import useNavigate  
import contractABI from '../Test01.json';
import BottomNavigation from './partials/BottomNavigation';
import NotificationContext from '../contexts/NotificationContext';

function RegisterUser() {
    const [userName, setUserName] = useState('');
    const [role, setRole] = useState('');
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const navigate = useNavigate(); // Initialize useNavigate  
    const { setTypeAndMessage } = useContext(NotificationContext);
    useEffect(() => {
        const initializeContract = async () => {
            // Check for Ethereum provider (MetaMask)  
            if ((window as any).ethereum) {
                const provider = new ethers.BrowserProvider((window as any).ethereum);
                const signer = await provider.getSigner();
                // const contractAddress = '0x67b62Ab16413f54f629ef8C687dB94A8Ba9120A6'; // Your contract address  
                const contractAddress = '0xDfDB60cE7F16EA4D5BF60Bc74701b120A8c6c722'; // Your contract address  

                // Initialize contract  
                const contractInstance = new ethers.Contract(contractAddress, contractABI.abi, signer);
                setContract(contractInstance);
            } else {
                setTypeAndMessage('fail', 'Hãy cài đặt MetaMask!');
            }
        };

        initializeContract();
    }, []);

    const registerUser = async () => {
        if (contract) {
            try {
                const tx = await contract.registerUser(userName, role);
                await tx.wait();
                setTypeAndMessage('success', 'Đăng ký tài khoản thành công!');

                // Navigate to the appropriate route based on the role  
                switch (role) {
                    case 'consumer': navigate('/khachhang/truyxuat/nguongoc');
                        break;
                    case 'farmer':
                        navigate('/nongdan/themnongsan');
                        break;
                    case 'distributor':
                        navigate('/nhaphanphoi/themthongtin');
                        break;
                    case 'retailer':
                        navigate('/nhabanle/themthongtin');
                        break;
                    default:
                        setTypeAndMessage('fail', 'Vui lòng chọn vai trò!');
                        break;
                }
            } catch (error) {
                console.error("Registration failed", error);
                setTypeAndMessage('fail', 'Đăng ký tài khoản thất bại!');
            }
        }
    };

    return (
        <div className='w-screen h-screen relative'>
            <div className='absolute top-0 left-0 flex justify-center items-center w-full h-full'>
                <div className='relative w-fit h-fit'>
                    <div className="-z-1 absolute top-[20px] -left-[10px] -z-0 bg-green-600 w-6 h-20 transform skew-y-12 rotate-180"></div>
                    <div className="absolute top-[20px] left-[585px] -z-0 bg-green-600 w-6 h-20 transform -skew-y-12 rotate-180"></div>
                    <div className="relative w-[600px] mx-auto flex flex-col gap-2 bg-white h-fit rounded-md">
                        <div className="w-[620px]  -translate-x-[10px] p-3 flex flex-col gap-2 text-center bg-[#41B3A2] shadow-lg">
                            <h1 className="uppercase text-[25px] text-white font-bold drop-shadow-lg">
                                Đăng ký tài khoản
                            </h1>
                            <p className="text-[18px] text-white">Vui lòng điền đầy đủ thông tin</p>

                        </div>
                        <div className='p-6 flex flex-col gap-y-4'>
                            <div className="flex flex-col gap-2 mb-3">
                                <label htmlFor="userName" className="font-bold text-[18px] text-md opacity-80">
                                    Họ và tên
                                </label>
                                <input
                                    type="text"
                                    id="userName"
                                    placeholder="Nguyen Van A"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="placeholder:italic text-xl w-full px-4 py-3 outline-none border-2 focus:border-[#0D7C66] focus:ring-[#0D7C66] transition duration-150 ease-in-out"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="role" className="font-bold text-[18px] text-md opacity-80">
                                    Chọn vai trò
                                </label>
                                <select
                                    id="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="text-xl w-full px-4 py-3 cursor-pointer outline-none border-2 focus:border-[#0D7C66] focus:ring-[#0D7C66] transition duration-150 ease-in-out"
                                >
                                    <option value="" className='italic'>Chọn vai trò phù hợp</option>
                                    <option value="farmer">Nông dân</option>
                                    <option value="distributor">Nhà phân phối</option>
                                    <option value="retailer">Nhà bán lẻ</option>
                                    <option value="consumer">Khách hàng</option>
                                </select>
                            </div>
                            <button
                                onClick={registerUser}
                                className="px-6 py-3 mt-4 rounded-md bg-[#0D7C66] text-white font-bold text-[16px] hover:bg-[#41B3A2] transition duration-300"
                            >
                                ĐĂNG KÝ
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <BottomNavigation />
        </div>
    );
}

export default RegisterUser;