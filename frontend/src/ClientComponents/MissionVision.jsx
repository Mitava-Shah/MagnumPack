import React, { useState, useEffect } from 'react'
import Mission from "../assets/light-bulb.png"
import Vision from "../assets/strategic-vision.png"
import Image from "../assets/formimg.jpg"
import LeafForm from "../assets/leafform.png"
import ReactQuill from 'react-quill';
import "../quill.css"
import axios from 'axios'

function OrganicProductForm() {

    const [heading, setHeading] = useState("");
    const [subheading, setSubheading] = useState("");
    const [missiontitle, setMissionTitle] = useState('');
    const [missiondescription, setMissionDescription] = useState('');
    const [missionphoto, setMissionPhoto] = useState([]);
    const [missionphotoAlts, setMissionPhotoAlts] = useState([]);
    const [missionImgTitle, setMissionImgTitle] = useState([]);
    const [visiontitle, setVisionTitle] = useState('');
    const [visiondescription, setVisionDescription] = useState('');
    const [visionphoto, setVisionPhoto] = useState([]);
    const [visionphotoAlts, setVisionPhotoAlts] = useState([]);
    const [visionImgTitle, setVisionImgTitle] = useState([]);

    const fetchMission = async () => {
        try {
            const response = await axios.get('/api/mission/getAllActiveMissions', { withCredentials: true });
            const mission = response.data.data || {};
            setMissionTitle(mission.title || '');
            setMissionDescription(mission.description || '');
            setMissionPhoto(mission.photo || []);
            setMissionPhotoAlts(mission.alt || []);
            setMissionImgTitle(mission.imgTitle || []);
        } catch (error) {
            console.error('Error fetching mission data:', error);
        }
    };

    useEffect(() => {
        fetchMission();
        fetchVisionData();
        fetchHeadings();
    }, []);

    const fetchVisionData = () => {
        axios.get('/api/vision/getAllActiveVisions', { withCredentials: true })
            .then(response => {
                const vision = response.data.data || {};
                setVisionTitle(vision.title || '');
                setVisionDescription(vision.description || '');
                setVisionPhoto(vision.photo || []);
                setVisionPhotoAlts(vision.alt || []);
                setVisionImgTitle(vision.imgTitle || [])
            })
            .catch(error => {
                console.error('Error fetching mission data:', error);
            });
    };

    const fetchHeadings = async () => {
        try {
            const response = await axios.get('/api/pageHeading/heading?pageType=missionvision', { withCredentials: true });
            const { heading, subheading } = response.data;
            setHeading(heading || '');
            setSubheading(subheading || '');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='w-full h-full relative '>
            <div className='mx-4 my-14 flex flex-col justify-center items-center'>
                <div className='lg:flex md:gap-6 w-full'>
                    <div className='flex justify-center items-center w-full lg:w-1/2'>
                        <img src={Image} alt="mission & Vision" title='mission & Vision' className='' />
                    </div>
                    <div className='flex flex-col md:mx-14 lg:w-1/2'>
                        <p className='text-[36px] md:text-[50px] text-5xl font-bold bg-clip-text text-transparent bg-center bg-cover bg-fixed bg-[url("https://images.pexels.com/photos/5908654/pexels-photo-5908654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")] mt-6 font-cursive '>{heading}</p>
                        <p className='mt-6'>{subheading}</p>
                        <dir className='flex justify-start pl-0 mb-8 md:mt-8 lg:mb-16'>
                            <p className='text-[60px] md:text-[80px] font-semibold text-green-700 pr-8  border-r-gray-400 border-r leading-[4rem]'>1.2M</p>
                            <div className='flex justify-center items-center '>
                                <p className=' pl-4 pr-[4rem] font-bold mr-16 text-[14px] md:pr-[15rem] lg:pr-[3rem] xl:pr-[17rem] text-blue-950'>Kg of Plastic Waste Reduced</p>
                            </div>
                        </dir>
                    </div>
                </div>
                <div className=' flex flex-col md:flex-row justify-center  gap-8 md:mt-6 md:mx-16 lg:mx-16 lg:relative lg:-top-[4rem] lg:left-[2rem] xl:absolute xl:top-[24rem] xl:left-[33rem]  '>
                    <div className=' bg-blue-950 p-14 flex flex-col gap-4 md:w-1/2 '>
                        <div>
                            <img
                                src={`/api/image/download/${missionphoto}`}
                                alt={missionphotoAlts}
                                title={missionImgTitle}
                                className='h-[80px] ' />
                        </div>
                        <p className='text-[24px] font-bold text-white'>{missiontitle}</p>
                        <p className='text-white'> <ReactQuill
                            readOnly={true}
                            value={missiondescription}
                            modules={{ toolbar: false }}
                            theme="bubble"
                            className="quill"
                        /></p>
                    </div>
                    <div className=' bg-green-700 p-14 flex flex-col gap-4 md:w-1/2 '>
                        <div>
                            <img
                                src={`/api/image/download/${visionphoto}`}
                                alt={visionphotoAlts}
                                title={visionImgTitle}
                                className='h-[80px] ' />
                        </div>
                        <p className='text-[24px] font-bold text-white'>{visiontitle}</p>
                        <p className='text-white'> <ReactQuill
                            readOnly={true}
                            value={visiondescription}
                            modules={{ toolbar: false }}
                            theme="bubble"
                            className="quill"
                        /></p>
                    </div>
                </div>
                <div className='hidden lg:block absolute top-10 -left-24 z-20'>
                    <img src={LeafForm} alt="leaf" title='leaf' />
                </div>
            </div>
        </div>
    )
}

export default OrganicProductForm
