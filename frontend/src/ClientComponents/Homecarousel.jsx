import React, { useState, useEffect } from 'react';
import Plantimg from "../assets/plantimg.png";
import { FiArrowUpRight } from "react-icons/fi";
import axios from 'axios';
import ReactQuill from 'react-quill';
import SVG from "../assets/circle.svg"
import { Link } from 'react-router-dom';


function Homecarousel() {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/banner/getBannersBySectionHome', { withCredentials: true });
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

    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
    };

    const handlePrev = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + banners.length) % banners.length);
    };

    return (
        <div className="relative h-[110vh] xl:h-[100vh] group w-full mb-16">
            <div className="relative h-full">
                <img src={Plantimg} alt='plant' title='plant' className='absolute top-6 h-[10rem] md:h-[20rem] lg:h-[26rem] z-10' />
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    banners.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <img
                                src={`/api/image/download/${slide.photo[0]}`}
                                alt={`${slide.alt}`}
                                title={`${slide.imgTitle}`}
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 flex flex-col md:flex-row justify-center items-center md:justify-start md:items-start md:pt-[7rem] bg-black/45">
                                <div className='relative w-[230px] h-[230px] z-20 md:w-[40%] xl:w-[30%] flex justify-center items-center'>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" className='flex justify-center items-center w-full h-full text-[#0f0f0fb0] fill-current animate-spinner'>
                                        <path id="textPath" d="M 75,75 m -65,0 a 65,65 0 1,1 130,0 a 65,65 0 1,1 -130,0"></path>
                                        <text className='text-white fill-current w-full' transform="translate(-20, 0)" dominantBaseline="middle" textAnchor="middle">
                                            <textPath href="#textPath" startOffset="50%" textLength="140" lengthAdjust="spacingAndGlyphs" className="uppercase text-[14px]">
                                                100% Sustainable
                                            </textPath>
                                        </text>
                                    </svg> */}
                                    <img src={SVG} alt="100% Sustainable" title='100% Sustainable' className='animate-spinner' />
                                    <a href="https://www.youtube.com/watch?v=ipUuoMCEbDQ" className="absolute mx-auto">
                                        <FiArrowUpRight size={50} fill='none' className="text-white bg-transparent" />
                                    </a>
                                </div>
                                <div className="flex flex-col justify-center items-center md:justify-start md:items-start md:w-[60%] xl:w-[40%]">
                                    <h1 className="lg:text-[90px] text-[46px] text-white mb-4 font-cursive text-center font-bold md:text-start md:text-[52px] animate-slideUpFadeIn">{slide.title}</h1>
                                    <p className="text-white opacity-80 text-center mb-12 font-bold text-[18px] md:text-start animate-slideUpFadeIn"> <ReactQuill
                                        readOnly={true}
                                        value={slide.details}
                                        modules={{ toolbar: false }}
                                        theme="bubble"
                                        className="quill"
                                    /></p>
                                    <Link to="/aboutus" className="animate-slideUpFadeIn rounded-md relative bg-[#2F2858] hover:bg-[#120d30] text-white text-center px-8 py-4 cursor-pointer z-30">
                                        Discover More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full h-16 w-16 border border-white hidden group-hover:block z-10"
                >
                    &#10094;
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full h-16 w-16 border border-white hidden group-hover:block"
                >
                    &#10095;
                </button>
            </div>
        </div>
    );
}

export default Homecarousel;
