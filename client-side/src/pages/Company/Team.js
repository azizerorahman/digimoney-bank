import React from 'react';
import './team.css'
import TeamMember from './TeamMember';



const Team = () => {
    const teamData=[
        {id:1,name:"Istiak Hasan",designation:"Web Developer",desc:"Hello, I am Grace. I am a full-time Website designer and Graphics designer with many years of experience working for people( business organizations). I have used my skills and knowledge to help organizations and individuals build their website to fit their business brand and expectations. On a personal ground, I have also done project that has helped me gain experience in areas like WordPress, Squarespace, Shopify, Wix, Godaddy, Big-commerce, Woo-commerce, and lots more.",facebook:"https://www.facebook.com/istieak",linkedin:"https://www.linkedin.com/",twitter:"https://www.twiter.com/",image:"https://i.ibb.co/wMD5qkJ/istiak.png"},
        {id:2,name:"Masud Rana Shohagh",designation:"Web Developer",desc:"Hello, I am Shohagh. I am a full-time Website developer and Front-end Developer. I have used my skills and knowledge to help organizations and individuals build their website to fit their business brand and expectations. On a personal ground.",facebook:"https://www.facebook.com/sb.shohagh.0/",linkedin:"https://www.linkedin.com/in/masud-rana-shohagh-7a0890227/",twitter:"https://twitter.com/sb_shohagh",image:"https://i.ibb.co/4VGnmHD/20200904-181025.jpg"},
        {id:3,name:"Md Arifur Rahman",designation:"Web Developer",desc:"Hello, I am Arifur Rahman. I am a full-time Website designer and Graphics designer with many years of experience working for people( business organizations). I have used my skills and knowledge to help organizations and individuals build their website to fit their business brand and expectations. On a personal ground, I have also done project that has helped me gain experience in areas like WordPress, Squarespace, Shopify, Wix, Godaddy, Big-commerce, Woo-commerce, and lots more.",facebook:"https://www.facebook.com/hridoyr69",linkedin:"https://www.linkedin.com/in/arifur-rahman01/",twitter:"https://www.twiter.com/",image:"https://i.ibb.co/68n1L36/profile.jpg"},
        {id:4,name:"Azizur Rahman",designation:"Web Developer",desc:"Hello, I am Azizur Rahman. I am a full-time Website designer and Graphics designer with many years of experience working for people( business organizations). I have used my skills and knowledge to help organizations and individuals build their website to fit their business brand and expectations. On a personal ground, I have also done project that has helped me gain experience in areas like WordPress, Squarespace, Shopify, Wix, Godaddy, Big-commerce, Woo-commerce, and lots more.",facebook:"https://www.facebook.com/istieak",linkedin:"https://www.linkedin.com/",twitter:"https://www.twiter.com/",image:"https://i.ibb.co/gJxjkxZ/azizur-rahman.jpg"},
        {id:5,name:"Partha Debnath",designation:"Web Developer",desc:"Hello, I am Partha Debnath. I am a full-time Website designer and Graphics designer with many years of experience working for people( business organizations). I have used my skills and knowledge to help organizations and individuals build their website to fit their business brand and expectations. On a personal ground, I have also done project that has helped me gain experience in areas like WordPress, Squarespace, Shopify, Wix, Godaddy, Big-commerce, Woo-commerce, and lots more.",facebook:"https://www.facebook.com/istieak",linkedin:"https://www.linkedin.com/",twitter:"https://www.twiter.com/",image:"https://i.ibb.co/9qPkdRs/parthodevnath.jpg"},
        // {id:6,name:"Istiak Hasan",designation:"Web Developer",desc:"Hello, I am Grace. I am a full-time Website designer and Graphics designer with many years of experience working for people( business organizations). I have used my skills and knowledge to help organizations and individuals build their website to fit their business brand and expectations. On a personal ground, I have also done project that has helped me gain experience in areas like WordPress, Squarespace, Shopify, Wix, Godaddy, Big-commerce, Woo-commerce, and lots more.",facebook:"https://www.facebook.com/istieak",linkedin:"https://www.linkedin.com/",twitter:"https://www.twiter.com/",image:"https://i.ibb.co/wMD5qkJ/istiak.png"},
    ]
    return (
        <>
        
        <main className='team-container min-h-screen w-full lg:p-10 py-5 px-2  mt-2'>
             <h1 className='text-3xl mb-10 text-white uppercase lg:ml-12'>Our team</h1>


             <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {
                        teamData.map(team=><TeamMember key={team.id} team={team} />)
                    }
             </div>
        </main>
        </>
    );
};

export default Team;