import { ethers, BigNumberish } from 'ethers'; // Import BigNumber
import contractABI from '../Test01.json';
import { useEffect, useState } from 'react';
import BottomNavigation from './partials/BottomNavigation';

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
                console.log(contractInstance);
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

    console.log(productId);

    const getTrace = async () => {
        if (contract) {
            try {
                let pid = parseInt(productId);
                const productData: Product = await contract.getProductInfo(pid);
                if (!productData) {
                    throw new Error("Product not found");
                }
                // Process productData
            } catch (error) {
                console.error("Error fetching product info:", error);
                alert("Error fetching product info. Please check the product ID and try again.");
            }
        } else {
            console.error("Contract is not initialized");
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
                </div>

            </div>
            {product && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Thông tin sản phẩm:</h2>
                    <p><img src={product.imageHash} alt="" /></p>
                    <p><strong>Tên sản phẩm:</strong> {product.productName}</p>
                    <p><strong>Trạng thái:</strong> {ProductStatus[product.status]}</p>
                    <p><strong>Ngày trồng:</strong> {product.plantingDate}</p>
                    <p><strong>Ngày thu hoạch:</strong> {product.harvestDate}</p>
                    <p><strong>Tên nông dân:</strong> {product.farmerName}</p>
                    {product.retailerName && <p><strong>Nhà bán lẻ:</strong> {product.retailerName}</p>}
                    <p><strong>Khối lượng:</strong>{Number(product.productWeight).toString()} kg</p> {/* Directly use productWeight */}
                </div>
            )}
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



// import { ethers, BigNumberish } from 'ethers'; // Import BigNumber
// import contractABI from '../Test01.json';
// import { useEffect, useState } from 'react';
// import BottomNavigation from './partials/BottomNavigation';

// // Define the Product interface
// interface Product {
//     productId: number; // Thêm productId
//     productName: string;
//     plantingDate: string;
//     harvestDate: string;
//     farmerName: string;
//     distributorName: string;
//     retailerName: string;
//     imageHash: string;
//     productWeight: BigNumberish; // Keep this as BigNumber
//     status: number;
// }

// const Trace = () => {
//     const [products, setProducts] = useState<Product[]>([]); // Thay đổi state thành mảng
//     const [error, setError] = useState("");
//     const [contract, setContract] = useState<ethers.Contract | null>(null);
//     useEffect(() => {
//         const initializeContract = async () => {
//             if ((window as any).ethereum) {
//                 const provider = new ethers.BrowserProvider((window as any).ethereum);
//                 const signer = await provider.getSigner();
//                 const contractAddress = '0x67b62Ab16413f54f629ef8C687dB94A8Ba9120A6';

//                 const contractInstance = new ethers.Contract(contractAddress, contractABI.abi, signer);
//                 setContract(contractInstance);
//             } else {
//                 alert('Please install MetaMask!');
//             }
//         };

//         initializeContract();
//     }, []);

//     const getAllProducts = async () => {
//         console.log("getAllProducts");
//         if (contract) {
//             try {
//                 // Lấy danh sách sản phẩm từ hợp đồng
//                 const productsData: Product[] = await contract.getAllProducts();
//                 setProducts(productsData);
//                 cons
//             } catch (err) {
//                 setError("Có lỗi xảy ra khi tải danh sách sản phẩm.");
//             }
//         }
//     };

//     getAllProducts();

//     return (
//         <div className='w-screen h-screen relative'>
//             <div className='absolute top-0 left-0 flex justify-center items-center w-full h-full'>
//                 <div className='relative w-fit h-fit'>
//                     <div className="-z-1 absolute top-[20px] -left-[10px] -z-0 bg-green-600 w-6 h-20 transform skew-y-12 rotate-180"></div>
//                     <div className="absolute top-[20px] left-[585px] -z-0 bg-green-600 w-6 h-20 transform -skew-y-12 rotate-180"></div>
//                     <div className="relative w-[600px] mx-auto flex flex-col gap-2 bg-white h-fit rounded-md">
//                         <div className="w-[620px]  -translate-x-[10px] p-3 flex flex-col gap-2 text-center bg-[#41B3A2] shadow-lg">
//                             <h1 className="uppercase text-[25px] text-white font-bold drop-shadow-lg">
//                                 TRUY XUẤT NGUỒN GỐC NÔNG SẢN
//                             </h1>
//                             <p className="text-[18px] text-white">Niềm tin khách hàng là trên hết</p>
//                         </div>
//                         <div className='p-6 flex flex-col gap-y-4'>
//                             <button
//                                 onClick={getAllProducts}  // Gọi hàm khi nhấn nút
//                                 className="w-full px-6 py-3 mt-4 bg-[#0D7C66] text-white font-bold text-[16px] hover:bg-[#41B3A2] transition duration-300"
//                             >
//                                 LẤY DANH SÁCH SẢN PHẨM
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {error && <p className="text-red-500 text-center mt-4">{error}</p>} {/* Hiển thị lỗi nếu có */}
//             {products.length > 0 && ( // Kiểm tra nếu có sản phẩm để hiển thị
//                 <div className="mt-6">
//                     <h2 className="text-xl font-semibold mb-2">Danh sách sản phẩm:</h2>
//                     {products.map((product) => (
//                         <div key={product.productId} className="mb-4 border p-4 rounded bg-gray-100">
//                             <p><img src={product.imageHash} alt="" /></p>
//                             <p><strong>Tên sản phẩm:</strong> {product.productName}</p>
//                             <p><strong>Trạng thái:</strong> {ProductStatus[product.status]}</p>
//                             <p><strong>Ngày trồng:</strong> {product.plantingDate}</p>
//                             <p><strong>Ngày thu hoạch:</strong> {product.harvestDate}</p>
//                             <p><strong>Tên nông dân:</strong> {product.farmerName}</p>
//                             {product.retailerName && <p><strong>Nhà bán lẻ:</strong> {product.retailerName}</p>}
//                             <p><strong>Khối lượng:</strong> {Number(product.productWeight).toString()} kg</p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//             <BottomNavigation />
//         </div>
//     );
// };

// // Convert statuses
// const ProductStatus = ["Planted", "Harvested", "Delivered", "Received", "Completed"];

// export default Trace;
