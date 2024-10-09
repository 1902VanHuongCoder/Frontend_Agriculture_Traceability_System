import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import ProductInfo from './components/AgriculturalTrace';
import Login from './components/Login';
import RegisterUser from './components/RegisterUser';
import UpdateDistributorInfo from './components/UpdateDistributorInfo';
import UpdateRetailerInfo from './components/UpdateRetailerInfo';

const Test01: React.FC = () => {
    return (
        <Router>
            <div className="p-8 max-w-xl mx-auto bg-white rounded-lg shadow-lg">
                <Routes>
                    {/* Đường dẫn mặc định đến trang Login */}
                    <Route path="/" element={<>
                        <Login />
                        <RegisterUser />
                    </>} />

                    {/* Đường dẫn đến trang đăng ký người dùng */}
                    <Route path="/register" element={<RegisterUser />} />

                    {/* Đường dẫn đến trang thêm sản phẩm của Farmer */}
                    <Route path="/add-product" element={<AddProduct />} />

                    {/* Đường dẫn đến trang cập nhật thông tin nhà phân phối */}
                    <Route path="/update-distributor-info" element={<UpdateDistributorInfo />} />

                    {/* Đường dẫn đến trang cập nhật thông tin nhà bán lẻ */}
                    <Route path="/update-retailer-info" element={<UpdateRetailerInfo />} />

                    {/* Đường dẫn đến trang hiển thị thông tin sản phẩm */}
                    <Route path="/product" element={<ProductInfo />} />
                </Routes>
            </div>
        </Router>
    );
};

export default Test01;
