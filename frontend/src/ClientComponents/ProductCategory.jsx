import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
// import img1 from '../assets/image1.webp';
// import img2 from '../assets/image2.jpeg';
// import img3 from '../assets/image3.jpeg';
// import img4 from '../assets/image4.webp';
// import img5 from '../assets/image5.webp';
// import img6 from '../assets/image6.jpeg';
import axios from 'axios'
import { Link } from "react-router-dom"




function ProductCategory() {

    const [categories, setCategories] = useState([]);
    const [heading, setHeading] = useState("");
    const [subheading, setSubheading] = useState("");


    const fetchHeadings = async () => {
        try {
            const response = await axios.get('/api/pageHeading/heading?pageType=product', { withCredentials: true });
            const { heading, subheading } = response.data;
            setHeading(heading || '');
            setSubheading(subheading || '');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchHeadings();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/product/getCategoryAndPhoto');
                setCategories(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCategories();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1, // Default for mobile screens
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3, // Tablet screens
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 1, // Tablet screens
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2, // Mobile screens
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 2566,
                settings: {
                    slidesToShow: 5, // Large screens
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    };


    return (
        <div className="px-8 pb-14 pt-8 flex justify-center items-center">
            <div className="relative overflow-hidden">
                <div className="flex justify-center items-center">
                    <p className="text-4xl font-bold text-transparent bg-clip-text bg-[url('https://images.pexels.com/photos/5908654/pexels-photo-5908654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-left font-cursive bg-fixed">{heading}</p>
                </div>
                <Slider {...settings} >
                    {categories.map((product, index) => (
                        <div key={product.id} className='p-4'>
                            <div className='flex flex-col items-center text-center space-y-5'>
                                <div className='relative border-[32px] rounded-full border-white shadow-lg'>
                                    <img src={`/api/logo/download/${product.photo}`} alt={product.alt} title={product.imgTitle} className='h-44 w-44 rounded-full' />
                                    <span className={`absolute right-0 ${index % 2 === 0 ? 'bottom-2' : 'top-2'} bg-green-700 text-white rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold`}>
                                        {`0${index + 1}`}
                                    </span>
                                </div>
                                <Link to={`/category/${product.slug}`} className='text-2xl font-bold hover:text-green-600'>{product.category}</Link>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default ProductCategory;