import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import "../quill.css"
import axios from 'axios';

function Steps() {
    const location = useLocation();
    const showH2 = !location.pathname.includes('custom');
    const [heading, setHeading] = useState("");
    const [subheading, setSubheading] = useState("");
    const [steps, setSteps] = useState([]);

    const fetchHeadings = async () => {
        try {
            const response = await axios.get('/api/pageHeading/heading?pageType=customizationsteps', { withCredentials: true });
            const { heading, subheading } = response.data;
            setHeading(heading || '');
            setSubheading(subheading || '');
        } catch (error) {
            console.error(error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/customizationsteps/getActiveCustomizationSteps`, { withCredentials: true });
            const StepsWithIds = response.data.data.map((stepItem, index) => ({
                ...stepItem,
                id: index + 1,
            }));
            setSteps(StepsWithIds);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchHeadings();
        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center bg-white mb-16">
            {showH2 && (
                <h2 className="text-2xl md:text-3xl lg:text-4xl lg:leading-[5rem] font-bold text-center mb-4 text-transparent bg-clip-text bg-[url('https://images.pexels.com/photos/5908654/pexels-photo-5908654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-left font-cursive bg-fixed">
                    {heading}
                </h2>
            )}
            <p className="text-center text-gray-700 max-w-2xl mb-16">
                {subheading}
            </p>
            <div className="w-full flex flex-col md:flex-row justify-center items-center ">
                <div className="flex flex-col md:flex-row justify-center items-center md:items-start md:justify-start relative w-11/12 lg:w-10/12 xl:w-[80%] gap-[3rem]">
                    <div className="absolute hidden md:block border-t-2 border-green-900 w-full top-0 transform -translate-y-1/2"></div>
                    {steps.map((item, index) => (
                        <div key={index} className="relative flex flex-col items-center px-4">
                            <div className="absolute -top-3 w-8 h-8 border-2 border-green-900 rounded-full flex justify-center items-center font-bold bg-green-700 text-white">
                                {index + 1}
                            </div>
                            <div className="mt-8 text-center">
                                <p className="text-lg text-black font-bold uppercase">{item.title}</p>
                                <p className=' text-gray-700 text-center'>
                                    <ReactQuill
                                        readOnly={true}
                                        value={item.description}
                                        modules={{ toolbar: false }}
                                        theme="bubble"
                                        className="quill "
                                    />
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Steps;
