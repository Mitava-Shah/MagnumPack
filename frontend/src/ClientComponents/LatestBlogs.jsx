import React, { useState, useEffect } from 'react';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios'
import ReactQuill from 'react-quill';
import "../quill.css"

function LatestBlogs() {

    const [heading, setHeading] = useState("");
    const [subheading, setSubheading] = useState("");
    const [news, setNews] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/news/getLatestActiveNews`, { withCredentials: true });
            const newsWithIds = response.data.data.map((newsItem, index) => ({
                ...newsItem,
            }));
            setNews(newsWithIds);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchHeadings = async () => {
        try {
            const response = await axios.get('/api/pageHeading/heading?pageType=news', { withCredentials: true });
            const { heading, subheading } = response.data;
            setHeading(heading || '');
            setSubheading(subheading || '');
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchData();
        fetchHeadings();
    }, []);

    return (
        <>
            <div className='mt-16'>
                <div>
                    <div className='text-center'>
                        <p className='relative border-none px-4 text-green-700 font-bold text-center text-transparent bg-clip-text bg-[url("https://images.pexels.com/photos/5908654/pexels-photo-5908654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")] bg-left font-cursive bg-fixed text-3xl'>
                            {heading}
                        </p>
                    </div>
                    <div className='flex justify-center text-center items-center py-5 px-4'>
                        <h2 className='text-4xl leading-[3rem] font-bold text-center text-transparent bg-clip-text bg-[url("https://images.pexels.com/photos/5908654/pexels-photo-5908654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")] bg-left font-cursive bg-fixed text-gray-900 mb-4 font-montserrat'>{subheading}</h2>
                    </div>
                </div>

                <div className='md:p-10 xl:flex overflow-hidden'>
                    {news[0] && (
                        <>
                            <style>
                                {`
                             .bg-news-image {
                                 background-size: cover;
                                 background-position: center;
                                 background-image:url(${`/api/image/download/${news[0].photo[0]}`})
                             }
                         `}
                            </style>
                            <div className='bg-news-image relative bg-cover m-4 text-white xl:w-1/2 bg-center space-y-5 p-8 md:pt-32  transition-transform duration-500 transform hover:scale-105'>
                                <div className='absolute inset-0 bg-black/45 z-10'></div>
                                <div className='relative z-20'>
                                    <p className='text-xl font-bold md:text-4xl'>{news[0].title}</p>
                                    <p className='md:text-lg truncate my-4'>
                                        {news[0].details.length > 200 ?
                                            <ReactQuill
                                                readOnly={true}
                                                value={news[0].details.slice(0, 100)}
                                                modules={{ toolbar: false }}
                                                theme="bubble"
                                                className="quill"
                                            />
                                            : news[0].details}
                                    </p>
                                    <Link to={`/blog/${news[0].slug}`} className='hidden font-medium md:flex items-center gap-2 cursor-pointer'>CONTINUE READING <FaArrowRight /></Link>
                                </div>
                            </div>
                        </>
                    )}
                    <div className='md:flex xl:w-1/2'>
                        {news.slice(1).map((item, index) => (
                            <div key={item._id} className='p-4 md:w-1/2'>
                                <div className='relative'>
                                    <div className='overflow-hidden'>
                                        <img className='hover:scale-110 duration-500 h-[7cm] w-full object-cover' src={`/api/image/download/${item.photo[0]}`} alt={item.alt[0]} title={item.imgTitle[0]} />
                                    </div>
                                    <div className='absolute -bottom-10'>
                                        <p className='bg-green-600 justify-center items-center text-center font-bold text-4xl p-2 text-white'>{new Date(item.date).getDate()}</p>
                                        <p className='bg-blue-950 text-white p-2'>{new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                                    </div>
                                </div>
                                <div className='space-y-3 pt-16'>
                                    <p className='font-medium text-gray-600'>{item.postedBy} <span>.</span> <span>{new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span></p>
                                    <Link to={`/blog/${item.slug}`} className="font-bold text-2xl hover:text-green-600 transition-all duration-500 inline bg-[linear-gradient(to_right,_#43A047,_#43A047_100%)] bg-[0_100%] bg-no-repeat [background-size:0_2px] [transition:all_.3s,_background-size_.8s] outline-[none] hover:no-underline hover:opacity-100 hover:[background-size:100%_2px]">{item.title}</Link>
                                    <Link to={`/blog/${item.slug}`} className='font-medium flex items-center gap-2 cursor-pointer hover:text-green-500'>CONTINUE READING <FaArrowRight /></Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default LatestBlogs;
