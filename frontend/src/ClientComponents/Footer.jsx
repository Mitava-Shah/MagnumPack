import React, { useEffect, useState } from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { AiOutlinePhone } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from 'axios';

const Footer = () => {
    const [news, setNews] = useState([]);
    const [address, setAddress] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [email, setEmail] = useState("");
    const [whitelogo, setWhiteLogo] = useState([]);
    const [menuListings, setMenuListings] = useState([]);
    const currentYear = new Date().getFullYear();

    const menuPaths = {
        about: "/aboutus",
        blog: "/blog",
        contact: "/contact",
        custompackaging: "/custom-packaging",
    };

    useEffect(() => {
        const fetchFooterColorLogo = async () => {
            try {
                const response = await axios.get('/api/logo/footerwhite');
                setWhiteLogo(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchFooterColorLogo();
    }, []);

    useEffect(() => {
        const fetchMenuListings = async () => {
            try {
                const response = await axios.get('/api/menulisting/getMenulisting', { withCredentials: true });
                setMenuListings(response.data.menuListings);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMenuListings();
    }, []);

    useEffect(() => {
        const fetchFooter = async () => {
            try {
                const response = await axios.get('/api/footer/getFooter', { withCredentials: true });
                const footer = response.data;
                setAddress(footer.address || "");
                setPhoneNo(footer.phoneNo || "");
                setEmail(footer.email || "");
            } catch (error) {
                console.error(error);
            }
        };

        fetchFooter();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/news/getLatestActiveNews`, { withCredentials: true });
                const newsWithIds = response.data.data.map((newsItem) => ({
                    ...newsItem,
                }));
                setNews(newsWithIds);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const recentPosts = news.slice(0, 2);

    // Filter out "Home" and "Product" menu items
    const filteredMenuItems = menuListings
        .filter(item => !item.pagename.toLowerCase().includes('home') && !item.pagename.toLowerCase().includes('product'))
        .map((item) => {
            const pagenameLower = item.pagename.toLowerCase();
            let path = item.path;

            if (pagenameLower.includes('about')) {
                path = menuPaths.about;
            } else if (pagenameLower.includes('blog')) {
                path = menuPaths.blog;
            } else if (pagenameLower.includes('contact')) {
                path = menuPaths.contact;
            } else if (pagenameLower.includes('custom')) {
                path = menuPaths.custompackaging;
            }

            return {
                ...item,
                path
            };
        });

    return (
        <footer className="bg-green-900 text-white py-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-12">
                <div className="space-y-4">
                    <img src={`/api/logo/download/${whitelogo.photo}`} alt={whitelogo.alt} title={whitelogo.imgTitle} className='w-[5cm] h-[2.5cm]' />
                    <p className='text-[#e9e8e8]'>
                        Happen active county. Winding morning ambition shyness evident to poor. Because elderly new to the point to main success.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4">Explore</h3>
                    <ul className="text-[14px] grid grid-cols-1  gap-2 font-semibold text-[#e9e8e8]">
                        {filteredMenuItems.map((item, index) => (
                            <li key={index}>
                                <Link to={item.path} className="hover:underline">{item.pagename}</Link>
                                {item.subItems && item.subItems.length > 0 && (
                                    <ul className="ml-4">
                                        {item.subItems.map((subItem, subIndex) => (
                                            <li key={subIndex}>
                                                <Link to={subItem.path} className="hover:underline">{subItem.title}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
                    <ul className="space-y-4">
                        {recentPosts.map((post, index) => (
                            <li key={index} className="flex space-x-4 text-[#e9e8e8]">
                                <img src={`/api/image/download/${post.photo}`} alt={post.alt} title={post.imgTitle} className="h-16 w-16 rounded object-cover" />
                                <div>
                                    <p className="text-sm">{post.date || (index === 0 ? '12 SEP, 2023' : '18 JUL, 2023')}</p>
                                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4">Contact Info</h3>
                    <ul className="space-y-4 text-[#e9e8e8]">
                        <li className="flex space-x-2">
                            <div className="h-[1cm] w-[1.5cm] xl:w-[2cm] bg-[#14151445] border-dashed border flex items-center rounded-full justify-center">
                                <IoHomeOutline size={20} className="" title='Address'/>
                            </div>
                            <div>
                                <p className="font-bold">ADDRESS:</p>
                                <p>{address}</p>
                            </div>
                        </li>
                        <li className="flex space-x-2">
                            <div className="h-[1cm] w-[1cm] bg-[#14151445] border-dashed border flex items-center rounded-full justify-center">
                                <CiMail size={20} className="" title='email'/>
                            </div>
                            <div>
                                <p className="font-bold">EMAIL:</p>
                                <p>{email}</p>
                            </div>
                        </li>
                        <li className="flex space-x-2">
                            <div className="h-[1cm] w-[1cm] bg-[#14151445] border-dashed border flex items-center rounded-full justify-center">
                                <AiOutlinePhone size={20} className="" title='phone'/>
                            </div>
                            <div>
                                <p className="font-bold">PHONE:</p>
                                <p>{phoneNo}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="text-center mt-10">
                <p>Copyright © {currentYear} Magnum Pack, All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
