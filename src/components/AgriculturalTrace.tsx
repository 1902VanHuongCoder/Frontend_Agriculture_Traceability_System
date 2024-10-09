import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import TestContract from '../Test.json'; // Đường dẫn đến file ABI JSON

// Khai báo kiểu cho Product
interface Product {
  productId: number;
  imageHash: string;
  productName: string;
  plantingDate: string;
  harvestDate: string;
  farmerName: string;
  farmLocation: string;
  distributorName: string;
  receivingDateDistributor: string;
  deliveryDateRetailer: string;
  productWeight: number;
  retailerName: string;
  receivingDateRetailer: string;
  productStatus: string;
}

const ProductInfo: React.FC = () => {
  const [productId, setProductId] = useState<number | ''>(''); // Có thể là số hoặc chuỗi
  const [productInfo, setProductInfo] = useState<Product | null>(null); // Thông tin sản phẩm
  const [contract, setContract] = useState<ethers.Contract | null>(null); // Contract

  useEffect(() => {
    const initializeContract = async () => {
      // Kiểm tra provider Ethereum (MetaMask)
      if ((window as any).ethereum) {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const signer = await provider.getSigner();
        const contractAddress = '0xdAb120DCdd63FD5cd84a3878f3928195885fDB70'; // Địa chỉ contract của bạn

        // Khởi tạo contract
        const contractInstance = new ethers.Contract(contractAddress, TestContract.abi, signer);
        setContract(contractInstance);
      } else {
        alert('Please install MetaMask!');
      }
    };

    initializeContract();
  }, []);

  const fetchProductInfo = async () => {
    if (contract && typeof productId === 'number') {
      try {
        const product: Product = await contract.getProductInfo(productId);
        setProductInfo(product);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Get Product Info</h2>
      <input
        type="number"
        className="border p-2 mb-2"
        placeholder="Enter Product ID"
        value={productId}
        onChange={(e) => setProductId(Number(e.target.value) || '')} // Chuyển đổi thành số
      />
      <button onClick={fetchProductInfo} className="bg-blue-500 text-white p-2">Fetch Product Info</button>

      {productInfo && (
        <div className="mt-4 p-4 border">
          <h3 className="text-lg font-bold">Product Details</h3>
          <p><strong>Product ID:</strong> {productInfo.productId.toString()}</p>
          <p><strong>Product Name:</strong> {productInfo.productName}</p>
          <p><strong>Image Hash:</strong> {productInfo.imageHash}</p>
          <p><strong>Planting Date:</strong> {productInfo.plantingDate}</p>
          <p><strong>Harvest Date:</strong> {productInfo.harvestDate}</p>
          <p><strong>Farmer Name:</strong> {productInfo.farmerName}</p>
          <p><strong>Farm Location:</strong> {productInfo.farmLocation}</p>
          <p><strong>Distributor Name:</strong> {productInfo.distributorName}</p>
          <p><strong>Receiving Date by Distributor:</strong> {productInfo.receivingDateDistributor}</p>
          <p><strong>Delivery Date to Retailer:</strong> {productInfo.deliveryDateRetailer}</p>
          <p><strong>Product Weight:</strong> {productInfo.productWeight.toString()}</p>
          <p><strong>Retailer Name:</strong> {productInfo.retailerName}</p>
          <p><strong>Receiving Date by Retailer:</strong> {productInfo.receivingDateRetailer}</p>
          <p><strong>Product Status:</strong> {productInfo.productStatus}</p>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
