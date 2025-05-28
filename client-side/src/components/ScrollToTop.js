import React, { useState } from 'react';
import {BsFillArrowUpCircleFill} from 'react-icons/bs'

const ScrollToTop = () => {
    const [visiable,setVisible]=useState(false)
    // Show or visible button 
    const toggleVisible = () => {
        // const scrolled = document.documentElement.scrollTop;
       
        if ( window.scrollY> 300){
        setVisible(true)
        }
        else{
        setVisible(false)
        }
    }

    //scroll behavior 
    const scrollToTop=()=>{
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
    }
 
    //called the srolle function here 
    window.addEventListener('scroll',toggleVisible)
    

    return (
        <div className={` bottom-[12%] right-[56px] z-[1000] ${visiable?"fixed":"hidden"}`}>
           <BsFillArrowUpCircleFill onClick={scrollToTop} className='h-14 cursor-pointer w-14 text-green-500' />
        </div>
    );
};

export default ScrollToTop;