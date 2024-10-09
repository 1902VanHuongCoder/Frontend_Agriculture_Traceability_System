import { ethers, BigNumberish } from 'ethers'; // Import BigNumber
import contractABI from '../../Test01.json';
import { useEffect, useState } from 'react';

// Define the Product interface
interface Product {
    productName: string;
    plantingDate: string;
    harvestDate: string;
    farmerName: string;
    distributorName: string;
    retailerName: string;
    imageHash: string;
    productWeight: BigNumberish; // Keep this as BigNumber
    status: number;
}

const Trace = () => {
    const [productId, setProductId] = useState("");
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState("");
    const [contract, setContract] = useState<ethers.Contract | null>(null);

    useEffect(() => {
        const initializeContract = async () => {
            if ((window as any).ethereum) {
                const provider = new ethers.BrowserProvider((window as any).ethereum);
                const signer = await provider.getSigner();
                const contractAddress = '0x67b62Ab16413f54f629ef8C687dB94A8Ba9120A6';

                const contractInstance = new ethers.Contract(contractAddress, contractABI.abi, signer);
                setContract(contractInstance);
            } else {
                alert('Please install MetaMask!');
            }
        };

        initializeContract();
    }, []);

    const handleInputChange = (e: any) => {
        setProductId(e.target.value);
    };

    const getTrace = async () => {
        if (contract) {
            try {
                // Get the product data from the contract
                const productData: Product = await contract.getProductInfo(productId);



                // Set product with the converted weight
                setProduct(productData);
                console.log(productData);
            } catch (err) {
                setError("Không tìm thấy sản phẩm hoặc có lỗi xảy ra.");
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-center mb-4">Tra cứu thông tin sản phẩm</h1>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Mã sản phẩm</label>
                <input
                    type="text"
                    value={productId}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Nhập mã sản phẩm..."
                />
            </div>

            <button
                onClick={getTrace}
                className="w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-600 transition duration-300"
            >
                Tra cứu
            </button>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            {product && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Thông tin sản phẩm:</h2>
                    <p><img src={product.imageHash} alt="" /></p>
                    <p><strong>Tên sản phẩm:</strong> {product.productName}</p>
                    <p><strong>Trạng thái:</strong> {ProductStatus[product.status]}</p>
                    <p><strong>Ngày trồng:</strong> {product.plantingDate}</p>
                    <p><strong>Ngày thu hoạch:</strong> {product.harvestDate}</p>
                    <p><strong>Tên nông dân:</strong> {product.farmerName}</p>
                    {product.distributorName && <p><strong>Nhà phân phối:</strong> {product.distributorName}</p>}
                    {product.retailerName && <p><strong>Nhà bán lẻ:</strong> {product.retailerName}</p>}
                    <p><strong>Khối lượng:</strong>{Number(product.productWeight).toString()} kg</p> {/* Directly use productWeight */}
                </div>
            )}
        </div>
    );
};

// Convert statuses
const ProductStatus = ["Planted", "Harvested", "Delivered", "Received", "Completed"];

export default Trace;
