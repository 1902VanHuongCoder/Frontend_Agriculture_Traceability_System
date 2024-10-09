import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Dùng để điều hướng giữa các trang
import { ethers } from 'ethers';
import TestContract from '../Test.json'; // Đường dẫn đến file ABI

const Login = () => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const navigate = useNavigate(); // Hook để điều hướng

  const connectWallet = async () => {
    // Kiểm tra provider Ethereum (MetaMask)
    if ((window as any).ethereum) {
      try {
        // Yêu cầu kết nối ví
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const signer = await provider.getSigner();
        const contractAddress = '0xdAb120DCdd63FD5cd84a3878f3928195885fDB70'; // Địa chỉ hợp đồng của bạn

        // Khởi tạo hợp đồng
        const contractInstance = new ethers.Contract(contractAddress, TestContract.abi, signer);
        setContract(contractInstance);

        // Lấy địa chỉ ví hiện tại
        const userAddress = await signer.getAddress();

        // Gọi hàm để lấy thông tin người dùng đã đăng ký từ hợp đồng
        const userInfo = await contractInstance.getUserInfo(userAddress);
        const { userName, role } = userInfo;

        // Lưu trữ thông tin người dùng
        setUserName(userName);
        setUserRole(role);

        // Điều hướng dựa trên vai trò của người dùng
        if (role === 'farmer') {
          navigate('/add-product');
        } else if (role === 'distributor') {
          navigate('/update-distributor-info');
        } else if (role === 'retailer') {
          navigate('/update-retailer-info');
        } else if (role === 'consumer') {
          navigate('/product');
        } else {
          console.error('Invalid role:', role);
        }

      } catch (error) {
        console.error('Error connecting to wallet or fetching user info:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <button
        onClick={connectWallet}
        className="bg-blue-600 text-white p-4 rounded transition duration-300 hover:bg-blue-700 mb-4"
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default Login;
