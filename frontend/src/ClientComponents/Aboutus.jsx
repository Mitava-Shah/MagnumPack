import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import "../quill.css";


function AboutUs() {
    const [pageContent, setPageContent] = useState({});
    const [counter, setCounter] = useState(0); 
    const [hasAnimated, setHasAnimated] = useState(false); 
    const componentRef = useRef(null); 

    const isHomePage = window.location.href.includes("aboutus");

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/aboutus/getActiveAboutus`, { withCredentials: true });
            setPageContent(response.data || '');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    startCounterAnimation();
                }
            },
            { threshold: 0.5 } // Adjust the threshold as needed
        );

        if (componentRef.current) {
            observer.observe(componentRef.current);
        }

        return () => {
            if (componentRef.current) {
                observer.unobserve(componentRef.current);
            }
        };
    }, [pageContent.counterno, hasAnimated]);

    const startCounterAnimation = () => {
        if (pageContent.counterno) {
            let start = 0;
            const end = parseInt(pageContent.counterno, 10);
            if (start < end) {
                const duration = 3000; // Duration of the animation (in ms)
                const incrementTime = Math.floor(duration / end); // Time between increments

                const counterInterval = setInterval(() => {
                    start += 1;
                    setCounter(start);
                    if (start === end) {
                        clearInterval(counterInterval);
                    }
                }, incrementTime);
            }
        }
    };

    return (
        <div ref={componentRef} className="background-img bg-left py-20 mb-16">
            <style>
                {`
                    .background-img {
                        background-size: cover;
                        background-repeat: no-repeat;
                        position: relative;
                        background-image: url(/api/image/download/${pageContent.photo})
                `}
            </style>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center ">
                <div className='w-0 h-0 [border-left:10px_solid_transparent] [border-right:10px_solid_transparent] [border-bottom:20px_solid_black] absolute -top-5 left-[10.4rem] md:left-[12.9rem] lg:left-[13.4rem] xl:left-[19.4rem]'></div>
                <div className="pr-8 md:ml-[2rem] mt-[6rem] text-center md:text-left">
                    <div className="bg-blue-950 w-40 h-40 flex items-center justify-center mb-4 absolute -top-5 xl:left-[10rem]">
                        <p className="text-white text-[50px] font-semibold text-center ">
                            {counter}{pageContent.sign}<br />{pageContent.countername}
                        </p>
                    </div>
                    <h2 className="text-4xl font-bold text-green-700 mb-4  font-cursive">{pageContent.heading}</h2>
                    <p className="text-gray-700 mb-6 md:w-[60%]">
                        <ReactQuill
                            readOnly={true}
                            value={pageContent.shortDescription}
                            modules={{ toolbar: false }}
                            theme="bubble"
                            className="quill"
                        />
                    </p>
                    {isHomePage ? (
                        <p className='text-gray-700 mb-6 md:w-[60%]'>
                            <ReactQuill
                                readOnly={true}
                                value={pageContent.longDescription}
                                modules={{ toolbar: false }}
                                theme="bubble"
                                className="quill"
                            />
                        </p>
                    ) : (
                        <Link to="/aboutus" className="bg-blue-950 text-white py-3 px-8 rounded hover:bg-green-600 transition duration-300">
                            Read More
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
