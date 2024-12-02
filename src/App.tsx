import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import Product from './components/Trace';
import RegisterUser from './components/registerUser';
import UpdateDistributorInfo from './components/UpdateDistributorInfo';
import UpdateRetailerInfo from './components/UpdateRetailerInfo';
import Introduction from './components/Introduction';
import VideoBackground from './components/partials/VideoBackground';

const App: React.FC = () => {
  return (
    <Router>
      <div className="relative w-screen h-screen ">
        <VideoBackground /> {/* Video background  */}
        <Routes>
          {/* Đường dẫn mặc định đến trang Login */}
          <Route path="/" element={<Introduction />} />

          {/* Đường dẫn đến trang đăng ký người dùng */}
          <Route path="/dangkytaikhoan" element={<RegisterUser />} />

          {/* Đường dẫn đến trang thêm sản phẩm của Farmer */}
          <Route path="/nongdan/themnongsan" element={<AddProduct />} />

          {/* Đường dẫn đến trang cập nhật thông tin nhà phân phối */}
          <Route path="/nhaphanphoi/themthongtin" element={<UpdateDistributorInfo />} />

          {/* Đường dẫn đến trang cập nhật thông tin nhà bán lẻ */}
          <Route path="/nhabanle/themthongtin" element={<UpdateRetailerInfo />} />

          {/* Đường dẫn đến trang hiển thị thông tin sản phẩm */}
          <Route path="/khachhang/truyxuat/nguongoc" element={<Product />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
