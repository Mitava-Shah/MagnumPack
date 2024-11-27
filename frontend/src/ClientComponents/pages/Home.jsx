import React, { useState } from 'react';
import SplashScreen from './Splashscreen';
import Homecarousel from '../Homecarousel';
import WhyChoosePaper from '../WhyChoosePaper';
import AboutUs from '../Aboutus';
import WhyChooseUs2 from '../WhyChooseUs2';
import Counter from "../Counter"
import ProductCategory from '../ProductCategory';
import LatestBlogs from '../LatestBlogs';
import Steps from "../Steps";
import Testimonial from '../Testimonial';
import WhatsAppButton from '../Whatsapp';


function Home() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const handleSplashEnd = () => {
    setIsSplashVisible(false);
  };

  return (
    <div>
    
      <SplashScreen
        onTransitionEnd={handleSplashEnd}
        isVisible={isSplashVisible}
      />


      <div>
        <WhatsAppButton />
        <Homecarousel />
        <AboutUs />
        <ProductCategory />
        {/* <MissionVision/> */}
        {/* <WhyChooseUs /> */}
        <WhyChooseUs2 />
        <WhyChoosePaper />
        <Steps />
        <Testimonial />
        <LatestBlogs />
        {/* <Brands/> */}
      </div>
    </div>
  );
}

export default Home;
