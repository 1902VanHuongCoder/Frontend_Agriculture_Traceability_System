import React, { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractABI from '../Test01.json';
import BottomNavigation from './partials/BottomNavigation';
import NotificationContext from '../contexts/NotificationContext';

function AddProduct() {
    const [productName, setProductName] = useState('');
    const [imageHash, setImageHash] = useState('');
    const [plantingDate, setPlantingDate] = useState('');
    const [harvestDate, setHarvestDate] = useState('');
    const [farmerName, setFarmerName] = useState('');
    const [agriculturalCode, setAgriculturalCode] = useState('');
    const [contract, setContract] = useState<ethers.Contract | null>(null);
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
                // await loadFarmerData(contractInstance);
            } else {
                setTypeAndMessage('fail', 'Hãy cài đặt MetaMask!');
            }
        };

        initializeContract();
    }, []);


    const addProduct = async () => {
        if (contract) {
            try {

                const tx = await contract.addProduct(agriculturalCode, imageHash, productName, plantingDate, harvestDate, farmerName); // Call the addProduct function
                await tx.wait(); // Wait for the transaction to be mined
                setTypeAndMessage('success', 'Thêm nông sản thành công!');

            } catch (error) {
                console.error(error);
                setTypeAndMessage('fail', 'Chỉ nông dân có thể thêm nông sản!');
            }
        };
    }

    return (

        <div className='w-screen h-screen relative'>
            <div className='absolute top-0 left-0 flex justify-center items-center w-full h-full'>
                <div className='relative w-fit h-fit'>
                    <div className="-z-1 absolute top-[20px] -left-[10px] -z-0 bg-green-600 w-6 h-20 transform skew-y-12 rotate-180"></div>
                    <div className="absolute top-[20px] left-[585px] -z-0 bg-green-600 w-6 h-20 transform -skew-y-12 rotate-180"></div>
                    <div className="relative w-[600px] mx-auto flex flex-col gap-2 bg-white h-fit rounded-md">
                        <div className="w-[620px]  -translate-x-[10px] p-3 flex flex-col gap-2 text-center bg-[#41B3A2] shadow-lg">
                            <h1 className="uppercase text-[25px] text-white font-bold drop-shadow-lg">
                                THÊM NÔNG SẢN
                            </h1>
                            <p className="text-[18px] text-white">Vui lòng điền đầy đủ thông tin</p>

                        </div>
                        <div className='p-6 flex flex-col gap-y-4'>
                            <div className="flex flex-col gap-2 mb-3">
                                <label htmlFor="" className="font-bold text-[18px]">
                                    Mã nông sản
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nhập mã nông sản"
                                    value={agriculturalCode}
                                    onChange={(e) => setAgriculturalCode(e.target.value)}
                                    className="w-full px-4 py-3 outline-none border-2 focus:border-[#0D7C66] focus:ring-[#0D7C66] transition duration-150 ease-in-out"
                                />
                            </div>
                            <div className="flex flex-col gap-2 mb-3">
                                <label htmlFor="" className="font-bold text-[18px]">
                                    Tên nông sản
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nhập tên nông sản"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    className="w-full px-4 py-3 outline-none border-2 focus:border-[#0D7C66] focus:ring-[#0D7C66] transition duration-150 ease-in-out"
                                />
                            </div>
                            <div className="flex flex-col gap-1 mb-3">
                                <label htmlFor="" className="font-bold text-[18px]">
                                    Địa chỉ hình ảnh
                                </label>
                                <input
                                    type="text"
                                    placeholder="Thêm địa chỉ hình ảnh"
                                    value={imageHash}
                                    onChange={(e) => setImageHash(e.target.value)}
                                    className="w-full px-4 py-3 outline-none border-2 focus:border-[#0D7C66] focus:ring-[#0D7C66] transition duration-150 ease-in-out"
                                />
                            </div>

                            <div className="flex flex-col gap-1 mb-3">
                                <label htmlFor="" className="font-bold text-[18px]">
                                    Ngày gieo trồng
                                </label>
                                <input
                                    type="date"
                                    placeholder="Planting Date"
                                    value={plantingDate}
                                    onChange={(e) => setPlantingDate(e.target.value)}
                                    className="w-full px-4 py-3 outline-none border-2 focus:border-[#0D7C66] focus:ring-[#0D7C66] transition duration-150 ease-in-out"
                                />
                            </div>

                            <div className="flex flex-col gap-1 mb-3">
                                <label htmlFor="" className="font-bold text-[18px]">
                                    Ngày thu hoạch
                                </label>
                                <input
                                    type="date"
                                    placeholder="Harvest Date"
                                    value={harvestDate}
                                    onChange={(e) => setHarvestDate(e.target.value)}
                                    className="w-full px-4 py-3 outline-none border-2 focus:border-[#0D7C66] focus:ring-[#0D7C66] transition duration-150 ease-in-out"
                                />
                            </div>

                            <div className="flex flex-col gap-1 mb-3">
                                <label htmlFor="" className="font-bold text-[18px]">
                                    Tên nông dân
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nhập tên nông dân"
                                    value={farmerName}
                                    onChange={(e) => setFarmerName(e.target.value)}
                                    className="w-full px-4 py-3 outline-none border-2 focus:border-[#0D7C66] focus:ring-[#0D7C66] transition duration-150 ease-in-out"
                                />
                            </div>

                            <button
                                onClick={addProduct}
                                className="w-full px-6 py-3 mt-4 bg-[#0D7C66] text-white font-bold text-[16px] hover:bg-[#41B3A2] transition duration-300"
                            >
                                THÊM NÔNG SẢN
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <BottomNavigation />
        </div>
    );
}

export default AddProduct;
