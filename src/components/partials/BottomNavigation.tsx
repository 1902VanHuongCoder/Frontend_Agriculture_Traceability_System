import React from 'react'
import { useNavigate } from 'react-router-dom';

const BottomNavigation = () => {
    const navigate = useNavigate();
    const handleNavigateTo = (path: string) => {
        navigate(path);
    }
    return (
        <div className='absolute bottom-5 w-screen h-fit'>
            <div className='flex items-center gap-x-10 justify-center'>
                <button onClick={() => handleNavigateTo('/dangkytaikhoan')} className='border-[2px] border-solid border-white text-white backdrop-blur-sm px-6 py-4 rounded-md text-lg font-bold hover:text-[#88f6e0] shadow-xl'>ĐĂNG KÝ TÀI KHOẢN</button>
                <button onClick={() => handleNavigateTo("/nongdan/themnongsan")} className='border-[2px] border-solid border-white text-white backdrop-blur-sm px-6 py-4 rounded-md text-lg font-bold hover:text-[#88f6e0] shadow-xl'>THÊM NÔNG SẢN</button>
                <button onClick={() => handleNavigateTo("/nhaphanphoi/themthongtin")} className='border-[2px] border-solid border-white text-white backdrop-blur-sm px-6 py-4 rounded-md text-lg font-bold hover:text-[#88f6e0] shadow-xl'>THÊM THÔNG TIN PHÂN PHỐI</button>
                <button onClick={() => handleNavigateTo("/nhabanle/themthongtin")} className='border-[2px] border-solid border-white text-white backdrop-blur-sm px-6 py-4 rounded-md text-lg font-bold hover:text-[#88f6e0] shadow-xl'>THÊM THÔNG TIN BÁN LẺ</button>
                <button onClick={() => handleNavigateTo("/khachhang/truyxuat/nguongoc")} className='border-[2px] border-solid border-white text-white backdrop-blur-sm px-6 py-4 rounded-md text-lg font-bold hover:text-[#88f6e0] shadow-xl'>TRUY XUẤT</button>
            </div>
        </div>
    )
}

export default BottomNavigation