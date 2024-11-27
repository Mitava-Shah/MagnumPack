import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from 'axios';
import InquiryForm from "./InquiryForm"
import WhatsAppButton from '../Whatsapp';
import SplashScreen from './Splashscreen';


function ProductDetail() {
    const { slugs } = useParams(); // Get the slug from URL parameters
    const [productData, setProductData] = useState(null);
    const [productDetails, setProductDetails] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [sliderRef, setSliderRef] = useState(null);
    const [description, setDescription] = useState(true); // Default to description view
    const [information, setInformation] = useState(false);
    const [review, setReview] = useState(false);
    const [showInquiryForm, setShowInquiryForm] = useState(false);
    const [isSplashVisible, setIsSplashVisible] = useState(true);


    const handleSplashEnd = () => {
        setIsSplashVisible(false);
    };

    useEffect(() => {
        if (showInquiryForm) {
            // Disable scrolling
            document.body.style.overflow = 'hidden';
        } else {
            // Enable scrolling
            document.body.style.overflow = '';
        }

        // Cleanup function to ensure scrolling is re-enabled if the component is unmounted
        return () => {
            document.body.style.overflow = '';
        };
    }, [showInquiryForm]);


    useEffect(() => {
        // Fetch product data from the backend
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/product/getDataBySlug?slugs=${slugs}`);
                const { productData, productDetailData } = response.data;
                setProductData(productData);
                setProductDetails(productDetailData);
                setSelectedImage(productData?.photo[0]); // Set the first image as default
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchData();
    }, [slugs]);

    const handleThumbnailClick = (img) => {
        setSelectedImage(img);
        const index = productData?.photo.indexOf(img);
        if (sliderRef) {
            sliderRef.slickGoTo(index);
        }
    };

    const CustomPrevArrow = (props) => (
        <div
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white bg-[#0f0f0f54] rounded-full h-8 w-8 flex justify-center items-center"
            onClick={props.onClick}         
            >
            <IoIosArrowBack size={25} />
        </div>
    );

    const CustomNextArrow = (props) => (
        <div
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white bg-[#0f0f0f54] rounded-full h-8 w-8 flex justify-center items-center"
            onClick={props.onClick} 
        >
            <IoIosArrowForward size={25} />
        </div>
    );

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        beforeChange: (current, next) => {
            if (sliderRef) {
                setSelectedImage(productData?.photo[next]);
            }
        },
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };

    if (!productData || !productDetails) {
        return <div>Loading...</div>;
    }

    const formattedProduct = slugs
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');




    return (
        <>
            <SplashScreen
                onTransitionEnd={handleSplashEnd}
                isVisible={isSplashVisible}
            />
            <WhatsAppButton />
            {showInquiryForm && (
                <InquiryForm
                    productName={formattedProduct}
                    onClose={() => setShowInquiryForm(false)}
                />
            )}
            <div
                className='relative flex justify-center items-center bg-cover bg-fixed h-[70vh] mb-10'
                style={{
                    backgroundImage: `url(/api/image/download/${selectedImage})`
                }}
            >
                <h1 className='flex justify-center items-center font-bold text-white z-10 text-5xl'>{formattedProduct}</h1>
                <div className='bg-[#0b0b0b] content-[""] h-full left-[0] opacity-40 absolute top-[0] w-full z-1 [transition:all_0.35s_ease-in-out]'></div>
            </div>
            <div className='flex w-full flex-col lg:flex-row gap-8 items-center justify-center '>
                <div className='lg:mb-16 w-full lg:w-1/2'>
                    <div className='relative'>
                        <Slider {...settings} ref={setSliderRef} className='mb-4'>
                            {productData?.photo.map((img, index) => (
                                <div key={index} className=''>
                                    <img src={`/api/image/download/${img}`} alt={`Product Image ${index + 1}`} className='w-full h-[8cm] lg:h-[10cm] object-cover' />
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className='flex gap-4 md:gap-12 lg:gap-12'>
                        {productData?.photo.map((img, index) => (
                            <div
                                key={index}
                                className={`border-2 ${selectedImage === img ? 'border-blue-500' : 'border-gray-400'}`}
                                onClick={() => handleThumbnailClick(img)}
                            >
                                <img src={`/api/image/download/${img}`} alt={`Thumbnail ${index + 1}`} className=' w-[4cm] h-[2cm] md:w-[4cm] md:h-[3cm] lg:w-[4cm] lg:h-[3cm] object-cover cursor-pointer' />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-full lg:w-1/3 text-center lg:text-start mx-8 lg:mx-0'>
                    <h1 className='text-3xl font-bold mb-4'>{productData.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: productData.details }} className='mb-4' />
                    <button
                        onClick={() => setShowInquiryForm(true)}
                        className='border-2 border-blue-950 flex justify-center items-center hover:text-white btn-2 scale-50 py-8 px-12  bg-white text-blue-950 rounded-full text-3xl font-bold cursor-pointer overflow-hidden'
                    >
                        Inquiry Now
                    </button>
                </div>
            </div>
            <div className='flex flex-col lg:flex-row lg:gap-8 justify-center items-center lg:border-b-2 lg:border-b-gray-300 py-4 mb-8'>
                <div
                    className={`cursor-pointer py-2 px-4 w-full lg:w-auto text-center border-2 border-gray-400 lg:border-0 font-bold ${description ? ' text-green-600 lg:text-black lg:border-b-4 lg:border-b-green-600' : 'lg:border-b-0'} transition-all duration-300`}
                    onClick={() => { setDescription(true); setInformation(false); setReview(false); }}
                >
                    Description
                </div>
                <div className={`cursor-pointer py-2 px-4 w-full lg:w-auto text-center border-b-2 border-gray-400 lg:border-0 font-bold ${information ? 'text-green-600 lg:text-black lg:border-b-4 lg:border-b-green-600' : 'lg:border-b-0'} transition-all duration-300`}
                    onClick={() => { setInformation(true); setReview(false); setDescription(false); }}>Additional Information</div>
                <div className={`cursor-pointer py-2 px-4 w-full lg:w-auto text-center border-b-2 border-gray-400 lg:border-0 font-bold ${review ? 'text-green-600 lg:text-black lg:border-b-4 lg:border-b-green-600' : 'lg:border-b-0'} transition-all duration-300`}
                    onClick={() => { setReview(true); setDescription(false); setInformation(false); }}>Review</div>
            </div>
            {description && (
                <div className="overflow-x-auto lg:px-16 pb-8">
                    <table className="table-auto w-full text-left border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-2">Product Code</th>
                                <th className="border border-gray-300 p-2">Variants</th>
                                <th className="border border-gray-300 p-2">Size</th>
                                <th className="border border-gray-300 p-2">Pcs/Ctn</th>
                                <th className="border border-gray-300 p-2">MOQ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-2">{productDetails.productCode}</td>
                                <td className="border border-gray-300 p-2">{productDetails.variants}</td>
                                <td className="border border-gray-300 p-2">{productDetails.size}</td>
                                <td className="border border-gray-300 p-2">{productDetails.pcs}</td>
                                <td className="border border-gray-300 p-2">{productDetails.moq}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            {information && (
                <div className='p-4'>
                    <h2 className='text-xl font-bold mb-2'>Additional Information</h2>
                    <p>Details about additional information...</p>
                </div>
            )}
            {review && (
                <div className='p-4'>
                    <h2 className='text-xl font-bold mb-2'>Reviews</h2>
                    <p>Customer reviews and feedback...</p>
                </div>
            )}
        </>
    );
}

export default ProductDetail;
