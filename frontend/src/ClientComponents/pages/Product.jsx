import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import WhatsAppButton from '../Whatsapp';
import SplashScreen from './Splashscreen';

function Product() {
    const [isSplashVisible, setIsSplashVisible] = useState(true);

    const handleSplashEnd = () => {
        setIsSplashVisible(false);
    };
    const { categoryslug } = useParams();
    const [products, setProducts] = useState([]);
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    const formattedCategory = categoryslug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/banner/getBannersBySectionProducts', { withCredentials: true });
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


    const fetchProducts = async () => {
        try {
            const response = await axios.get(`/api/product/getProductByCategory?categoryslug=${categoryslug}`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [categoryslug]);



    return (
        <>
            <SplashScreen
                onTransitionEnd={handleSplashEnd}
                isVisible={isSplashVisible}
            />

            <WhatsAppButton />
            {(products.length === 0)
                ?
                <div className='flex  flex-col justify-center items-center h-screen'>
                    <p className='text-[20px] text-gray-600 font-bold'>Product Not Available</p>
                    <iframe src="https://lottie.host/embed/2e9b4a2d-8077-453b-ad11-b5f4af18d553/W5kbbt9Jax.json" className='w-[20rem] h-[20rem]'></iframe>
                </div>
                :
                <>
                    {
                        banners.map((banner, index) => (
                            <div
                                key={index}
                                className='relative bg-cover bg-center bg-no-repeat'
                                style={{
                                    backgroundImage: `url(/api/image/download/${banner.photo})`,
                                }}
                            >
                                <div className='flex justify-center items-center h-[70vh] mb-10'>
                                    <h1 className='font-bold text-white text-5xl z-10'>{formattedCategory}</h1>
                                    <div className='absolute inset-0 bg-black opacity-40 z-1'></div>
                                </div>
                            </div>
                        ))
                    }
                    < div className='bg-gray-100 p-5'>
                        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                            {products.map(product => (
                                <div key={product.id} className='p-5 bg-white rounded-2xl'>
                                    <div className=''>
                                        <img src={`/api/image/download/${product.photo[0]}`} alt={product.title} className='h-[7cm] w-full object-cover' />
                                    </div>
                                    <div className='space-y-4 py-3 text-center'>
                                        <p className='text-base font-medium text-gray-700 uppercase'>{product.subtitle}</p>
                                        <p className='text-3xl font-semibold'>{product.title}</p>
                                        <Link to={`/product/${product.slug}`} className="border-2 border-blue-950 flex justify-center items-center hover:text-white btn-2 scale-50 py-8 px-12  bg-white text-blue-950 rounded-full text-3xl font-bold cursor-pointer overflow-hidden">
                                            View Products
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div >
                </>
            }

        </>

    );
}

export default Product;