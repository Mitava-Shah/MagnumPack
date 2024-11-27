import React, { useEffect, useState } from 'react';
import { FaRegCircleUser } from "react-icons/fa6";
import { PiQuotesBold } from "react-icons/pi";
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import axios from 'axios';
import Slider from 'react-slick';
import { useParams, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import "../../quill.css";
import WhatsAppButton from '../Whatsapp';
import SplashScreen from './Splashscreen';


function BlogDetail() {
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");

    const [postedBy, setPostedBy] = useState("");
    const [date, setDate] = useState("");

    const { slugs } = useParams();
    const [Photos, setPhotos] = useState([]);
    const [photoAlts, setPhotoAlts] = useState([]);
    const [news, setNews] = useState([]);
    const [facebooklink, setFacebooklink] = useState("");
    const [twitterlink, setTwitterlink] = useState("");
    const [youtubelink, setYoutubelink] = useState("");
    const [linkedinlink, setLinkedinlink] = useState("");

    const [isSplashVisible, setIsSplashVisible] = useState(true);

    const handleSplashEnd = () => {
        setIsSplashVisible(false);
    };




    const fetchData = async (pageIndex) => {
        try {
            const response = await axios.get(`
/api/news/getLatestActiveNews`, { withCredentials: true });
            const newsWithIds = response.data.data.map((newsItem, index) => ({
                ...newsItem,
            }));
            setNews(newsWithIds);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchHeader = async () => {
        try {
            const response = await axios.get('/api/header/getHeader', { withCredentials: true });
            const header = response.data;
            setFacebooklink(header.facebooklink || "");
            setTwitterlink(header.twitterlink || "");
            setYoutubelink(header.youtubelink || "");
            setLinkedinlink(header.linkedinlink || "");
        } catch (error) {
            console.error(error);
        }
    };

    const fetchNews = async () => {
        try {
            const response = await axios.get(`/api/news/getNewsById?slugs=${slugs}`, { withCredentials: true });
            const news = response.data.data;
            setTitle(news.title);
            setDetails(news.details);
            setPhotos(news.photo);
            setDate(news.date);
            setPhotoAlts(news.alt);
            setPostedBy(news.postedBy);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchNews();
        fetchData();
        fetchHeader();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        arrows: false
    };

    // Extract content before, quoted content, and content after
    const extractContentParts = (text) => {
        const regex = /"([^"]*)"/g;
        const matches = [...text.matchAll(regex)];
        if (matches.length > 0) {
            const quotedMessage = matches[0][1]; // Get the first quoted message
            const beforeQuoted = text.split(matches[0][0])[0]; // Content before the quoted message
            const afterQuoted = text.split(matches[0][0])[1]; // Content after the quoted message
            return { beforeQuoted, quotedMessage, afterQuoted };
        }
        return { beforeQuoted: text, quotedMessage: '', afterQuoted: '' };
    };

    const { beforeQuoted, quotedMessage, afterQuoted } = extractContentParts(details);


    return (
        <>
            <SplashScreen
                onTransitionEnd={handleSplashEnd}
                isVisible={isSplashVisible}
            />
            <WhatsAppButton />
            <div className='relative flex justify-center items-center bg-fixed h-[70vh] mb-10 bg-no-repeat bg-cover '
                style={{
                    backgroundImage: `url(/api/image/download/${Photos[0]})`,
                }}
            >
                <h1 className='flex justify-center items-center font-bold text-white z-10 text-5xl w-[55%] text-center'>{title}</h1>
                <div className='bg-[#0b0b0b] content-[""] h-full left-[0] opacity-40 absolute top-[0] w-full z-1 [transition:all_0.35s_ease-in-out]'></div>
            </div>

            <div className='p-7 md:px-14 lg:flex lg:gap-10 2xl:px-[40rem]'>
                {/* LHS */}
                <div className='lg:w-2/3'>
                    <div className='relative'>
                        <div className='overflow-hidden'>
                            <img className='hover:scale-110 duration-500 w-full object-cover' src={`/api/image/download/${Photos[0]}`} alt={photoAlts[0]} />
                        </div>
                        <div className='absolute -bottom-10'>
                            <p className='bg-green-600 justify-center items-center text-center font-bold text-4xl p-2 text-white'>{new Date(date).getDate()}</p>
                            <p className='bg-blue-950 text-white p-2'>{new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                        </div>
                    </div>
                    <div className='pt-16'>
                        <div className='flex items-center gap-2'>
                            <FaRegCircleUser className='text-green-500' />
                            <p className='text-gray-600 font-medium'>{postedBy}</p>
                        </div>
                        <div className='py-5 space-y-5 font-medium text-gray-600'>
                            <ReactQuill
                                readOnly={true}
                                value={beforeQuoted}
                                modules={{ toolbar: false }}
                                theme="bubble"
                                className="quill"
                            />
                        </div>
                    </div>
                    {quotedMessage && (
                        <div className='bg-green-700 relative overflow-hidden'>
                            <p className='p-10 top-2 text-blue-200 font-semibold text-xl text-start md:pr-52'>
                                <div className='text-green-200'>
                                    <ReactQuill
                                        readOnly={true}
                                        value={quotedMessage}
                                        modules={{ toolbar: false }}
                                        theme="bubble"
                                        className="quill"
                                    />
                                </div>
                            </p>
                            <div className='text-green-800 flex justify-end absolute -bottom-8 right-4'>
                                <PiQuotesBold size={96} className='rotate-180' />
                            </div>
                        </div>
                    )}
                    <div className='py-5 space-y-5 font-medium text-gray-600'>
                        <ReactQuill
                            readOnly={true}
                            value={afterQuoted}
                            modules={{ toolbar: false }}
                            theme="bubble"
                            className="quill"
                        />
                    </div>
                </div>

                {/* RHS */}
                {/* RHS */}
                <div className='lg:w-1/3 space-y-12'>
                    {/* recent post */}
                    <div className=' bg-gray-100 rounded'>
                        <div className='p-5 py-10'>
                            <p className="text-2xl font-semibold mb-6 ">Recent Post</p>
                            <hr className='border rounded w-1/6 border-green-500 my-4' />
                            <Slider {...settings}>
                                {news.map((post) => (
                                    <div key={post.id} className='p-4 w-full md:w-full'>
                                        <div className='relative'>
                                            <img src={`/api/image/download/${post.photo[0]}`} alt={post.alt[0]} className='rounded w-full object-cover h-[20rem]' />

                                        </div>
                                        <div className='pt-5 space-y-3'>
                                            <p className='text-gray-500 font-nunito'>{post.date}</p>
                                            <p onClick={() => window.location.href = `/blog/${post.slug}`} className="font-bold text-2xl hover:text-green-600 transition-all duration-500  inline bg-[linear-gradient(to_right,_#43A047,_#43A047_100%)] bg-[0_100%] bg-no-repeat [background-size:0_2px] [transition:all_.3s,_background-size_.8s] outline-[none] hover:no-underline hover:opacity-100 hover:[background-size:100%_2px]">
                                                {post.title}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>

                    {/* category */}
                    <div className='my-5 bg-gray-100'>
                        <div className='p-5 py-10'>
                            <p className="text-2xl font-semibold mb-6 ">Categories List</p>
                            <hr className='border rounded w-1/6 border-green-500 my-4' />
                            <ul className='space-y-3 font-semibold'>
                                <li className='flex items-center gap-2 text-gray-600 text-lg   rounded hover:text-white cursor-pointer justify-between'>National <span className='bg-white p-2 rounded-2xl'>69</span></li>
                                <li className='flex items-center gap-2 text-gray-600 text-lg  rounded  hover:text-white cursor-pointer justify-between'>National <span className='bg-white p-2 rounded-2xl'>25</span></li>
                                <li className='flex items-center gap-2 text-gray-600 text-lg   rounded  hover:text-white cursor-pointer justify-between'>Sports <span className='bg-white p-2 rounded-2xl'>18</span></li>
                                <li className='flex items-center gap-2 text-gray-600 text-lg   rounded  hover:text-white cursor-pointer justify-between'> Megazine <span className='bg-white p-2 rounded-2xl'>37</span></li>
                                <li className='flex items-center gap-2 text-gray-600 text-lg   rounded  hover:text-white cursor-pointer justify-between'>Health <span className='bg-white p-2 rounded-2xl'>12</span></li>
                            </ul>
                        </div>
                    </div>

                    {/* follow us  */}

                    <div className='my-5 bg-gray-100'>
                        <div className='p-5 py-10 px-14'>
                            <p className="text-2xl font-semibold mb-6 ">Follow Us</p>
                            <hr className='border rounded w-1/6 border-green-500 my-4' />
                            <div className='flex flex-wrap gap-2 '>
                                <a href={facebooklink} className='bg-blue-800 text-white p-4 h-12 w-12 flex justify-center items-center'><FaFacebookF /></a>
                                <a href={twitterlink} className='bg-sky-400 text-white p-4 h-12 w-12 flex justify-center items-center'><FaTwitter /></a>
                                <a href={youtubelink} className='bg-red-500 text-white p-4 h-12 w-12 flex justify-center items-center'><FaYoutube /></a>
                                <a href={linkedinlink} className='bg-blue-700 text-white p-4 h-12 w-12 flex justify-center items-center'><FaLinkedinIn /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogDetail;
