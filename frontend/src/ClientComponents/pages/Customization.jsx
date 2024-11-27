import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Steps from '../Steps';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import WhatsAppButton from '../Whatsapp';
import SplashScreen from './Splashscreen';


// Set the app element for the modal (optional)
Modal.setAppElement('#root');

function Customization() {
    const [heading, setHeading] = useState("");
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [subheading, setSubheading] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        product1: '',
        quantity1: '',
        product2: '',
        quantity2: '',
        message: '',
        ipaddress: '',
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_id: '',
        gclid: '',
        gcid_source: '',
        utm_content: '',
        utm_term: '',
    });

    const [isSplashVisible, setIsSplashVisible] = useState(true);

    const handleSplashEnd = () => {
        setIsSplashVisible(false);
    };


    const fetchHeadings = async () => {
        try {
            const response = await axios.get('/api/pageHeading/heading?pageType=custominquiries', { withCredentials: true });
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

        const fetchClientIp = async () => {
            try {
                const response = await axios.get('https://api.ipify.org?format=json');
                setFormData(prevFormData => ({
                    ...prevFormData,
                    ipaddress: response.data.ip
                }));
            } catch (error) {
                console.error('Error fetching IP address', error);
            }
        };

        fetchClientIp();

        // Get UTM parameters from the URL
        const params = new URLSearchParams(window.location.search);
        setFormData(prevFormData => ({
            ...prevFormData,
            utm_source: params.get('utm_source') || '',
            utm_medium: params.get('utm_medium') || '',
            utm_campaign: params.get('utm_campaign') || '',
            utm_id: params.get('utm_id') || '',
            gclid: params.get('gclid') || '',
            gcid_source: params.get('gcid_source') || '',
            utm_content: params.get('utm_content') || '',
            utm_term: params.get('utm_term') || ''
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/custominquiry/createcustominquiries', formData);
            setFormData({
                name: '',
                company: '',
                email: '',
                phone: '',
                product1: '',
                quantity1: '',
                product2: '',
                quantity2: '',
                message: '',
                ipaddress: '',
                utm_source: '',
                utm_medium: '',
                utm_campaign: '',
                utm_id: '',
                gclid: '',
                gcid_source: '',
                utm_content: '',
                utm_term: '',
            });

            // Open modal on successful submission
            setModalIsOpen(true);
            // Clear form fields
            setFormData({})

        } catch (error) {
            console.error('Error submitting form', error);

        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/banner/getBannersBySectionCustomPackaging', { withCredentials: true });
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

    const productBoxes = [
        {
            image: 'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg',
            title: 'Clear Cups and Bowls',
            description: 'MOQ: From 30,000/size'
        },
        {
            image: 'https://images.pexels.com/photos/5804418/pexels-photo-5804418.jpeg',
            title: 'Paper Bags',
            description: 'MOQ: From 20,000/size'
        },
        {
            image: 'https://images.pexels.com/photos/1287725/pexels-photo-1287725.jpeg',
            title: 'Paper Cups',
            description: 'MOQ: From 25,000/size'
        },
        {
            image: 'https://images.pexels.com/photos/1162737/pexels-photo-1162737.jpeg',
            title: 'Paper Straws',
            description: 'MOQ: From 50,000/size'
        },
        {
            image: 'https://images.pexels.com/photos/1520788/pexels-photo-1520788.jpeg',
            title: 'Clamshell Boxes',
            description: 'MOQ: From 15,000/size'
        },
        {
            image: 'https://images.pexels.com/photos/1362614/pexels-photo-1362614.jpeg',
            title: 'Salad Containers',
            description: 'MOQ: From 12,000/size'
        },
        {
            image: 'https://images.pexels.com/photos/5611992/pexels-photo-5611992.jpeg',
            title: 'Cutlery Sets',
            description: 'MOQ: From 40,000/size'
        },
        {
            image: 'https://images.pexels.com/photos/5991180/pexels-photo-5991180.jpeg',
            title: 'Paper Sleeves',
            description: 'MOQ: From 10,000/size'
        },
        {
            image: 'https://images.pexels.com/photos/231043/pexels-photo-231043.jpeg',
            title: 'Pizza Boxes',
            description: 'MOQ: From 8,000/size'
        },
        {
            image: 'https://images.pexels.com/photos/659934/pexels-photo-659934.jpeg',
            title: 'Sandwich Wraps',
            description: 'MOQ: From 15,000/size'
        }
    ];

    return (
        <div>
            <SplashScreen
                onTransitionEnd={handleSplashEnd}
                isVisible={isSplashVisible}
            />
            <WhatsAppButton />
            {banners.map((banner, index) => (
                <div
                    key={index}
                    className='relative bg-cover bg-center bg-no-repeat'
                    style={{
                        backgroundImage: `url(/api/image/download/${banner.photo})`,
                    }}
                >
                    <div className='flex justify-center items-center h-[70vh] mb-10'>
                        <h1 className='font-bold text-white text-5xl z-10'>{banner.title}</h1>
                        <div className='absolute inset-0 bg-black opacity-40 z-1'></div>
                    </div>
                </div>
            ))}
            <Steps />
            <div className='flex flex-col lg:flex-row lg:gap-32 gap-4 lg:px-16 px-4 bg-gray-100 py-8'>
                <div className='lg:w-[40%] w-full '>
                    <p className='text-[30px] text-green-700 mb-8 font-bold'>{heading}</p>
                    <p className='text-[16px] text-black'>
                        {subheading}
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="lg:w-[60%] w-full bg-white p-8 rounded-md shadow-md"
                >
                    <h2 className="text-2xl font-bold mb-6 text-gray-700">Get Quote</h2>
                    <div className='grid lg:grid-cols-2 md:grid-cols-1 lg:gap-4  gap-0 mb-4'>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="company" className="block text-gray-700 font-semibold mb-2">Company</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
                            />
                        </div>
                    </div>
                    <div className='grid lg:grid-cols-2 md:grid-cols-1 lg:gap-4  gap-0 mb-4'>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
                            />
                        </div>
                    </div>
                    <div className='grid lg:grid-cols-2 md:grid-cols-1 lg:gap-4  gap-0 mb-4'>
                        <div className="mb-4">
                            <label htmlFor="product1" className="block text-gray-700 font-semibold mb-2">What products are you interested in?</label>
                            <select
                                id="product1"
                                name="product1"
                                value={formData.product1}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
                                required
                            >
                                <option value="">Select a product</option>
                                <option value="Product A">Product A</option>
                                <option value="Product B">Product B</option>
                                <option value="Product C">Product C</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="quantity1" className="block text-gray-700 font-semibold mb-2">Annual Quantity</label>
                            <input
                                type="number"
                                id="quantity1"
                                name="quantity1"
                                value={formData.quantity1}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
                                required
                            />
                        </div>
                    </div>
                    <div className='grid lg:grid-cols-2 md:grid-cols-1 lg:gap-4  gap-0 mb-4 '>
                        <div className="mb-4">
                            <label htmlFor="product2" className="block text-gray-700 font-semibold mb-2">What products are you interested in?</label>
                            <select
                                id="product2"
                                name="product2"
                                value={formData.product2}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
                            >
                                <option value="">Select a product</option>
                                <option value="Product X">Product X</option>
                                <option value="Product Y">Product Y</option>
                                <option value="Product Z">Product Z</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="quantity2" className="block text-gray-700 font-semibold mb-2">Annual Quantity</label>
                            <input
                                type="number"
                                id="quantity2"
                                name="quantity2"
                                value={formData.quantity2}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <div className='px-16 py-8'>
                <p className='text-[24px] text-green-700 mb-4 font-bold'>Our Popular Products</p>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
                    {productBoxes.map((product, index) => (
                        <div key={index} className='border border-gray-200 rounded-md p-4'>
                            <img src={product.image} alt={product.title} className='w-full h-48 object-cover mb-4' />
                            <h3 className='text-xl font-semibold mb-2'>{product.title}</h3>
                            <p className='text-gray-700'>{product.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Submission Successful"
                className="fixed inset-0 flex items-center justify-center z-50 p-4"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className="bg-[#f5faf7ed] p-6 rounded-lg shadow-lg w-full max-w-md relative">
                    <h2 className="text-2xl font-bold mb-4 text-green-700">Thank You!</h2>
                    <p className="mb-4">Your message has been successfully sent.</p>
                    <p className='mb-4'> We will get back to you soon.</p>
                    <button
                        onClick={() => setModalIsOpen(false)}
                        className=" text-black px-4 py-2  absolute top-2 right-2"
                    >
                        <FaTimes size={25} />
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default Customization;
