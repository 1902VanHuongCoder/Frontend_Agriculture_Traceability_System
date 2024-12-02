import React from 'react'
import VideoBackground from './partials/VideoBackground'
import { useNavigate } from 'react-router-dom';

const Introduction = () => {
    const navigate = useNavigate();
    const handleNavigateTo = (path: string) => {
        navigate(path);
    }
    return (
        <div className='w-screen h-screen relative'>
            <VideoBackground />
            <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col'>
                <h1 className='text-[100px] text-white font-bold drop-shadow-md'>AGRICULTURAL <span className='text-[#88f6e0]'>TRACEABILITY</span> SYSTEM</h1>
                <p className='text-[100px] text-black -translate-y-[80px]  blur-md'>AGRICULTURAL TRACEABILITY SYSTEM</p>
                <div className='flex items-center gap-x-10 -translate-y-[120px]'>
                    <button onClick={() => handleNavigateTo('/dangkytaikhoan')} className='border-[2px] border-solid border-white text-white backdrop-blur-sm px-6 py-4 rounded-md text-lg font-bold hover:text-[#88f6e0] shadow-xl'>ĐĂNG KÝ TÀI KHOẢN</button>
                    <button onClick={() => handleNavigateTo("/nongdan/themnongsan")} className='border-[2px] border-solid border-white text-white backdrop-blur-sm px-6 py-4 rounded-md text-lg font-bold hover:text-[#88f6e0] shadow-xl'>THÊM NÔNG SẢN</button>
                    <button onClick={() => handleNavigateTo("/nhaphanphoi/themthongtin")} className='border-[2px] border-solid border-white text-white backdrop-blur-sm px-6 py-4 rounded-md text-lg font-bold hover:text-[#88f6e0] shadow-xl'>THÊM THÔNG TIN PHÂN PHỐI</button>
                    <button onClick={() => handleNavigateTo("/nhabanle/themthongtin")} className='border-[2px] border-solid border-white text-white backdrop-blur-sm px-6 py-4 rounded-md text-lg font-bold hover:text-[#88f6e0] shadow-xl'>THÊM THÔNG TIN BÁN LẺ</button>
                    <button onClick={() => handleNavigateTo("/khachhang/truyxuat/nguongoc")} className='border-[2px] border-solid border-white text-white backdrop-blur-sm px-6 py-4 rounded-md text-lg font-bold hover:text-[#88f6e0] shadow-xl'>TRUY XUẤT</button>
                </div>
                <p className='mt-4 text-white font-semibold text-xl italic absolute bottom-10 left-11'>CODER: VĂN HƯỞNG - HOÀNG ANH</p>
            </div>
        </div>
    )
}

export default Introduction