import { ethers, BigNumberish } from 'ethers'; // Import BigNumber
import contractABI from '../Test01.json';
import { useContext, useEffect, useState } from 'react';
import BottomNavigation from './partials/BottomNavigation';
import NotificationContext from '../contexts/NotificationContext';

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
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const { setTypeAndMessage } = useContext(NotificationContext);
    useEffect(() => {
        const initializeContract = async () => {
            if ((window as any).ethereum) {
                const provider = new ethers.BrowserProvider((window as any).ethereum);
                const signer = await provider.getSigner();
                // const contractAddress = '0x67b62Ab16413f54f629ef8C687dB94A8Ba9120A6';
                const contractAddress = '0xDfDB60cE7F16EA4D5BF60Bc74701b120A8c6c722';

                const contractInstance = new ethers.Contract(contractAddress, contractABI.abi, signer);
                setContract(contractInstance);
            } else {
                // alert('Please install MetaMask!');
                setTypeAndMessage('fail', 'Hãy cài đặt MetaMask!');
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
                console.log(err);
                setTypeAndMessage('fail', 'Không tìm thấy nông sản!');
            }
        }
    };

    console.log(product);
    return (
        <div className='w-screen h-screen relative'>
            <div className='absolute top-0 left-0 flex justify-center items-center w-full h-full flex-col'>
                {!product && <div className='relative w-fit h-fit mt-10'>
                    <div className="-z-1 absolute top-[20px] -left-[10px] -z-0 bg-green-600 w-6 h-20 transform skew-y-12 rotate-180"></div>
                    <div className="absolute top-[20px] left-[585px] -z-0 bg-green-600 w-6 h-20 transform -skew-y-12 rotate-180"></div>
                    <div className="relative w-[600px] mx-auto flex flex-col gap-2 bg-white h-fit rounded-md">
                        <div className="w-[620px]  -translate-x-[10px] p-3 flex flex-col gap-2 text-center bg-[#41B3A2] shadow-lg">
                            <h1 className="uppercase text-[25px] text-white font-bold drop-shadow-lg">
                                TRUY XUẤT NGUỒN GỐC NÔNG SẢN
                            </h1>
                            <p className="text-[18px] text-white">Niềm tin khách hàng là trên hết</p>

                        </div>
                        <div className='p-6 flex flex-col gap-y-4'>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">NHẬP MÃ SẢN PHẨM ĐỂ TRA CỨU</label>
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
                                className="w-full px-6 py-3 mt-4 bg-[#0D7C66] text-white font-bold text-[16px] hover:bg-[#41B3A2] transition duration-300"
                            >
                                TRUY XUẤT NGAY
                            </button>
                        </div>
                    </div>
                </div>}
                {product && (
                    <div className="relative mt-6 bg-[rgba(0,0,0,.3)] pt-6 rounded-md flex flex-col items-center gap-y-4 border-dashed border-[2px] border-white border-b-transparent">
                        <button onClick={() => { setProduct(null) }} className='absolute right-6 px-4 py-2 bg-white rounded-md'>TRUY XUẤT NÔNG SẢN KHÁC</button>
                        <div>
                            <div className='w-[400px] h-auto rounded-md overflow-hidden flex justify-center items-center'> {product.imageHash ? <img src={product.imageHash} alt={product.productName} /> : "NO IMAGE"}   </div>
                        </div>
                        <div className='flex text-white'>
                            <p className='border-[1px] border-solid border-white px-4 py-4 border-l-transparent'>Tên nông sản: <span className='font-bold text-[#88f6e0]'>{product.productName}</span></p>
                            <p className='border-[1px] border-solid border-white px-4 py-4'>Nông dân: <span className='font-bold text-[#88f6e0]'>{product.farmerName}</span></p>
                            <p className='border-[1px] border-solid border-white px-4 py-4'>Ngày trồng: <span className='font-bold text-[#88f6e0]'>{product.plantingDate}</span></p>
                            <p className='border-[1px] border-solid border-white px-4 py-4'>Ngày thu hoạch: <span className='font-bold text-[#88f6e0]'>{product.harvestDate}</span></p>
                            <p className='border-[1px] border-solid border-white px-4 py-4'>Nhà phân phối: <span className='font-bold text-[#88f6e0]'>{product.distributorName ? product.distributorName : "Chưa cập nhật"}</span></p>
                            <p className='border-[1px] border-solid border-white px-4 py-4'>Nhà bán lẻ: <span className='font-bold text-[#88f6e0]'>{product.retailerName ? product.retailerName : "Chưa cập nhật"}</span></p>
                            <p className='border-[1px] border-solid border-white px-4 py-4 border-r-transparent'>Khối lượng: <span className='font-bold text-[#88f6e0]'>{Number(product.productWeight).toString()}</span></p>
                        </div>
                    </div>
                )}
            </div>
            <BottomNavigation />
        </div>




        //         <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        //             <h1 className="text-2xl font-semibold text-center mb-4">Tra cứu thông tin sản phẩm</h1>



        //             {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        //             {product && (
        //                 <div className="mt-6">
        //                     <h2 className="text-xl font-semibold mb-2">Thông tin sản phẩm:</h2>
        //                     <p><img src={product.imageHash} alt="" /></p>
        //                     <p><strong>Tên sản phẩm:</strong> {product.productName}</p>
        //                     <p><strong>Trạng thái:</strong> {ProductStatus[product.status]}</p>
        //                     <p><strong>Ngày trồng:</strong> {product.plantingDate}</p>
        //                     <p><strong>Ngày thu hoạch:</strong> {product.harvestDate}</p>
        //                     <p><strong>Tên nông dân:</strong> {product.farmerName}</p>
        //                     {product.distributorName && <p><strong>Nhà phân phối:</strong> {product.distributorName}</p>}
        //                     {product.retailerName && <p><strong>Nhà bán lẻ:</strong> {product.retailerName}</p>}
        //                     <p><strong>Khối lượng:</strong>{Number(product.productWeight).toString()} kg</p> {/* Directly use productWeight */}
        //                 </div>
        //             )}
        //         </div>
    );
};

// Convert statuses
const ProductStatus = ["Planted", "Harvested", "Delivered", "Received", "Completed"];

export default Trace;
