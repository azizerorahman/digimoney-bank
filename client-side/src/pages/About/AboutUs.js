import React from 'react';
import aboutbanner from '../../assets/images/aboutbanner.jpg'

const AboutUs = () => {
    return (
        <div>
            <div className=' lg:w-10/12 mx-auto'>

            {/* banner */}
            <div className="carousel w-full p-4 space-x-4">
                <div id="slide1" className="carousel-item relative w-full rounded-box shadow-xl">
                    <img src={aboutbanner} className="w-full" />
                </div>
            </div>
            <div className='my-24'>
                <div className='pb-4'>
                    <h4 className='text-base-300'>
                        The Company was incorporated as a Public Limited Company in 1999, under the Companies Act 1994, with an Authorized Share Capital of BDT 1,000,000,000 divided into 10,000,000 ordinary shares of BDT 100 each. At present, the Authorized Share Capital of the company is BDT 10,000,000,000 divided into 1,000,000,000 ordinary shares of BDT 10 each.
                    </h4>
                </div>

                <br />
                <div>
                    <h4 className='text-base-300'>
                        The Company was also issued Certificate for Commencement of Business on the same day and was granted license on October 05, 1999 by Bangladesh Bank under the Banking Companies Act 1991 and started its banking operation on October 24, 1999. As envisaged in the Memorandum of Association and as licensed by Bangladesh Bank under the provisions of the Banking Companies Act 1991, the Company started its banking operation and entitled to carry out the following types of banking business:
                    </h4>
                </div>
            </div>
            </div>
            {/* progress */}
            <div className='grid justify-center mb-16'>
                <div className="stats shadow">

                    <div className="stat text-base-300">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div className="stat-title">Downloads</div>
                        <div className="stat-value">31K</div>
                        <div className="stat-desc">Jan 1st - Feb 1st</div>
                    </div>

                    <div className="stat text-base-300">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                        </div>
                        <div className="stat-title">New Users</div>
                        <div className="stat-value">4,200</div>
                        <div className="stat-desc">↗︎ 400 (22%)</div>
                    </div>

                    <div className="stat text-base-300">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                        </div>
                        <div className="stat-title">New Registers</div>
                        <div className="stat-value">1,200</div>
                        <div className="stat-desc">↘︎ 90 (14%)</div>
                    </div>

                </div>
            </div>

            {/* VISION, MISSION & VALUES  */}
            <div className='my-16'>
                <h1 className='text-5xl font-extrabold text-center text-base-300'>VISION, MISSION & GOAL</h1>
            </div>
            {/* container */}
            <div>

                <div className="container mt-32 mx-auto p-4 md:p-0">


                    <div className="shadow-lg flex flex-wrap w-full lg:w-4/5 mx-auto">


                        <div className="bg-cover bg-bottom border w-full md:w-1/3 h-64 md:h-auto relative" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/realistic-objective-background_79603-1821.jpg?w=740&t=st=1659032716~exp=1659033316~hmac=447b4c7b027a31fe1dc0981fe354e94999b57e809a088735a34e656e146f1a47')" }}>
                            <div className="absolute text-xl">
                                <i className="fa fa-heart text-white hover:text-red-light ml-4 mt-4 cursor-pointer"></i>
                            </div>
                        </div>



                        <div className="bg-white w-full md:w-2/3">

                            <div className="h-full mx-auto px-6 md:px-0 md:pt-6 md:-ml-6 relative">

                                <div className="bg-white lg:h-full p-6 -mt-6 md:mt-0 relative mb-4 md:mb-0 flex flex-wrap md:flex-wrap items-center">

                                    <div className="w-full lg:w-1/5 lg:border-right lg:border-solid text-center md:text-left">
                                        <h3 className='font-bold text-lg'>VISION</h3>
                                        <hr className="w-1/4 md:ml-0 mt-4  border lg:hidden" />
                                    </div>
                                    <div className="w-full lg:w-3/5 lg:px-3 py-11">
                                        <p className="text-md mt-4 lg:mt-0 text-justify md:text-left text-sm">
                                            To become the most valuable brand in the financial services in Bangladesh creating long-lasting value for our stakeholders and above all for the community we operate in by transforming the way we do business and by delivering sustainable growth.
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* container 2 */}
            <div>

                <div className="container mt-24 mx-auto p-4 md:p-0">


                    <div className="shadow-lg flex flex-wrap w-full lg:w-4/5 mx-auto">


                        <div className="bg-cover bg-bottom border w-full md:w-1/3 h-64 md:h-auto relative" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/business-vision-concept-illustration_114360-7130.jpg?w=740&t=st=1659032939~exp=1659033539~hmac=09879107deb7a3240cde396e74605ba4b61fd7d55e0c1c319663cd42f09d16c4')" }}>
                            <div className="absolute text-xl">
                                <i className="fa fa-heart text-white hover:text-red-light ml-4 mt-4 cursor-pointer"></i>
                            </div>
                        </div>

                        <div className="bg-white w-full md:w-2/3">

                            <div className="h-full mx-auto px-6 md:px-0 md:pt-6 md:-ml-6 relative">

                                <div className="bg-white lg:h-full p-6 -mt-6 md:mt-0 relative mb-4 md:mb-0 flex flex-wrap md:flex-wrap items-center">

                                    <div className="w-full lg:w-1/5 lg:border-right lg:border-solid text-center md:text-left">
                                        <h3 className='font-bold text-lg'>MISSION</h3>
                                        <hr className="w-1/4 md:ml-0 mt-4  border lg:hidden" />
                                    </div>
                                    <div className="w-full lg:w-3/5 lg:px-3 py-11">
                                        <p className="text-md mt-4 lg:mt-0 text-justify md:text-left text-sm">
                                            We will deliver service excellence to all our customers, both internal and external.
                                            We will ensure to maximize shareholders' value.
                                            We will constantly challenge our systems, procedures and training to maintain a cohesive and professional team in order to achieve service excellence.
                                            We will create an enabling environment and embrace a team based culture where people will excel.
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* container 3 */}
            <div>

                <div className="container my-24 mx-auto p-4 md:p-0">


                    <div className="shadow-lg flex flex-wrap w-full lg:w-4/5 mx-auto">


                        <div className="bg-cover bg-bottom border w-full md:w-1/3 h-64 md:h-auto relative" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/successful-business-man-holding-trophy_1150-35042.jpg?w=740&t=st=1659033009~exp=1659033609~hmac=28659413e26152a29d5d703c963a15577368898285f1c649479f9ed90266463b')" }}>
                            <div className="absolute text-xl">
                                <i className="fa fa-heart text-white hover:text-red-light ml-4 mt-4 cursor-pointer"></i>
                            </div>
                        </div>

                        <div className="bg-white w-full md:w-2/3">

                            <div className="h-full mx-auto px-6 md:px-0 md:pt-6 md:-ml-6 relative">

                                <div className="bg-white lg:h-full p-6 -mt-6 md:mt-0 relative mb-4 md:mb-0 flex flex-wrap md:flex-wrap items-center">

                                    <div className="w-full lg:w-1/5 lg:border-right lg:border-solid text-center md:text-left">
                                        <h3 className='font-bold text-lg'>GOAL</h3>
                                        <hr className="w-1/4 md:ml-0 mt-4  border lg:hidden" />
                                    </div>
                                    <div className="w-full lg:w-3/5 lg:px-3 py-11">
                                        <p className="text-md mt-4 lg:mt-0 text-justify md:text-left text-sm">
                                            Our main goal is to attract customers and make the banking system easier. Using our e-banking system helps to provide liquidity to the bank because consumers do online transactions, which means there is no withdrawal of physical money. Lastly, our website will provide 24/7 service.
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AboutUs;