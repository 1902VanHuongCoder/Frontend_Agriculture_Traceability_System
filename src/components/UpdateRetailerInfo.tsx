import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractABI from '../Test01.json';
import BottomNavigation from './partials/BottomNavigation';

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
        <div className='w-screen h-screen relative'>
            <div className='absolute top-0 left-0 flex justify-center items-center w-full h-full'>
                <div className='relative w-fit h-fit'>
                    <div className="-z-1 absolute top-[20px] -left-[10px] -z-0 bg-green-600 w-6 h-20 transform skew-y-12 rotate-180"></div>
                    <div className="absolute top-[20px] left-[585px] -z-0 bg-green-600 w-6 h-20 transform -skew-y-12 rotate-180"></div>
                    <div className="relative w-[600px] mx-auto flex flex-col gap-2 bg-white h-fit rounded-md">
                        <div className="w-[620px]  -translate-x-[10px] p-3 flex flex-col gap-2 text-center bg-[#41B3A2] shadow-lg">
                            <h1 className="uppercase text-[25px] text-white font-bold drop-shadow-lg">
                                NHÀ BÁN LẺ CẬP NHẬT THÔNG TIN
                            </h1>
                            <p className="text-[18px] text-white">Vui lòng điền đầy đủ thông tin</p>

                        </div>
                        <div className='p-6 flex flex-col gap-y-4'>
                            <div className="flex flex-col gap-2 mb-3">
                                <label htmlFor="" className="font-bold text-[18px]">
                                    Mã sản phẩm
                                </label>
                                <input
                                    type="number"
                                    placeholder="Mã sản phẩm"
                                    value={productId}
                                    onChange={(e) => setProductId(e.target.value)}
                                    className="w-full px-4 py-3 outline-none border-2 focus:border-[#0D7C66] focus:ring-[#0D7C66] transition duration-150 ease-in-out"
                                />
                            </div>
                            <div className="flex flex-col gap-1 mb-3">
                                <label htmlFor="" className="font-bold text-[18px]">
                                    Tên nhà bán lẻ
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nhập tên nhà bán lẻ"
                                    value={retailerName}
                                    onChange={(e) => setRetailerName(e.target.value)}
                                    className="w-full px-4 py-3 outline-none border-2 focus:border-[#0D7C66] focus:ring-[#0D7C66] transition duration-150 ease-in-out"
                                />
                            </div>

                            <button
                                onClick={updateRetailerInfo}
                                className="w-full px-6 py-3 mt-4 bg-[#0D7C66] text-white font-bold text-[16px] hover:bg-[#41B3A2] transition duration-300"
                            >
                                Cập nhật thông tin
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <BottomNavigation />
        </div>
    );
}

export default UpdateRetailerInfo;
