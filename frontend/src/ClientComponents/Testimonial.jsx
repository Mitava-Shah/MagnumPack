import React, { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import quotes from '../assets/quotes.png';
import axios from 'axios'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Testimonial = () => {
    const [current, setCurrent] = useState(0);
    const [testimonials, setTestimonials] = useState([]);
    const [heading, setHeading] = useState("");
    const [subheading, setSubheading] = useState("");

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/testimonial/getActiveTestimonials`, { withCredentials: true });
            const testimonialsWithIds = response.data.data.map((testimonial, index) => ({
                ...testimonial,
            }));
            setTestimonials(testimonialsWithIds);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchHeadings();
        fetchData();
    }, []);

    const fetchHeadings = async () => {
        try {
            const response = await axios.get('/api/pageHeading/heading?pageType=testimonial', { withCredentials: true });
            const { heading, subheading } = response.data;
            setHeading(heading || '');
            setSubheading(subheading || '');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prevCurrent) => (prevCurrent + 1) % testimonials.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    if (testimonials.length === 0) {
        return <div>Loading...</div>;
    }
    const { photo, alt, imgTitle, name, designation, testimony, rating } = testimonials[current];

    const totalStars = 5;
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const unfilledStars = totalStars - filledStars - (hasHalfStar ? 1 : 0);
    
    

    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-xs mx-auto block lg:hidden">
                <div className="flex justify-center">
                    <img
                        src={`/api/image/download/${photo[0]}`}
                        alt={alt[0]}
                        title={imgTitle[0]}
                        className="w-[9rem] h-[9rem] rounded-full object-cover"
                    />
                </div>
                <div className="text-center mt-4">
                    <p className="text-lg font-medium text-gray-800">
                        <ReactQuill
                            readOnly={true}
                            value={testimony}
                            modules={{ toolbar: false }}
                            theme="bubble"
                            className="quill"
                        /></p>
                    <hr className="my-4 border-t border-gray-500" />
                    <p className="text-xl font-semibold text-gray-900">{name}</p>
                    <p className="text-green-600 font-medium">{designation}</p>
                    <div className="flex items-center">
                        {[...Array(Math.floor(rating))].map((_, i) => (
                            <FaStar key={i} className="text-yellow-400" />
                        ))}
                        {rating % 1 !== 0 && <FaStarHalfAlt className="text-yellow-400" />}
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 relative flex-col justify-center items-center hidden lg:flex mt-16 p-32 rounded shadow-lg">
                <h2 className="text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-[url('https://images.pexels.com/photos/5908654/pexels-photo-5908654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-left font-cursive bg-fixed">{heading}</h2>
                <div className="flex flex-col justify-center items-center">
                    <div className="ml-[4rem] bg-white pl-[18rem] pr-[4rem] text-gray-500 pt-[4rem] pb-[4rem] h-[30rem] overflow-hidden">
                        <div>
                            <img src={quotes} alt={name} title={name} className='opacity-[0.4] -mr-[25] h-[5rem] min-w-6' />
                        </div>
                        <blockquote className="text-[30px] italic mb-4 border-b border-b-gray-700 pb-[2rem] ml-[4rem]">
                            <ReactQuill
                                readOnly={true}
                                value={testimony}
                                modules={{ toolbar: false }}
                                theme="bubble"
                                className="quill"
                            />
                        </blockquote>
                        <div className='flex justify-between'>
                            <div>
                                <p className="font-bold text-lg mb-2 text-black">{name}</p>
                                <p className="text-green-600 mb-4 uppercase">{designation}</p>
                            </div>
                            <div className="flex items-center">
                                {[...Array(Math.floor(rating))].map((_, i) => (
                                    <FaStar key={i} className="text-yellow-400" />
                                ))}
                                {rating % 1 !== 0 && <FaStarHalfAlt className="text-yellow-400" />}
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/3 md:absolute lg:left-[6rem] lg:top-20">
                        <img src={`/api/image/download/${photo[0]}`} alt={alt[0]} title={imgTitle[0]} className="h-[10cm] w-[9cm] bg-cover shadow-xl" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Testimonial;
