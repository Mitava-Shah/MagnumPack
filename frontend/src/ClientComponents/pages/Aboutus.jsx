import React, { useState, useEffect } from 'react'
import MissionAndVision from '../MissionVision'
import OurTeam from '../OurTeam'
import Certificates from '../Certificates'
import AboutUs from '../Aboutus'
import axios from "axios"
import WhatsAppButton from '../Whatsapp';
import SplashScreen from './Splashscreen'


function Aboutus() {

    const [isSplashVisible, setIsSplashVisible] = useState(true);

    const handleSplashEnd = () => {
        setIsSplashVisible(false);
    };

    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/banner/getBannersBySectionAboutus', { withCredentials: true });
            setBanners(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className=''>

            <SplashScreen
                onTransitionEnd={handleSplashEnd}
                isVisible={isSplashVisible}
            />
            <WhatsAppButton />
            {banners.map((banner, index) => (
                <div
                    key={index}
                    className='banner-background'
                    title={banner.imgTitle}
                    aria-label={banner.imgTitle}
                    role="img"
                >
                    <style>
                        {`
                    .banner-background {
                        background-size: cover;
                        background-position: center;
                        background-repeat: no-repeat;
                        position: relative;
                        background-image: url(/api/image/download/${banner.photo})
                `}
                    </style>
                    <div className='flex justify-center items-center h-[70vh] mb-10'>
                        <h1 className='font-bold text-white text-5xl z-10'>{banner.title}</h1>
                        <div className='absolute inset-0 bg-black opacity-40 z-1'></div>
                    </div>
                </div>
            ))}
            <AboutUs />
            <MissionAndVision />
            <Certificates />
            <OurTeam />
        </div>
    )
}

export default Aboutus
