import React from 'react';
import Articles from './Articles';
import './Blog.css'
import BlogFeature from './BlogFeature';

const Blog = () => {
    return (
        <>
        
        <div className='blog-container   h-auto mt-2'>
           <header className='z-50 w-full lg:h-[50vh] h-[60vh] flex justify-center items-center text-accent'>
           <div>
            <h1 className=' text-5xl text-center text-base-300 '>Thoughts, stories and ideas</h1>
            <p className='text-center lg:w-5/12 mx-auto mt-5 text-base-300 leading-[1.8] text-lg'>Arate is Ghost theme with a sleek and modern design for a personal fashion or lifestyle blog, an online journal or a magazine.</p>
           </div>
           </header>
           <main className='mt-20'>
            <BlogFeature />
            <Articles />
           </main>
        </div>
        </>
    );
};

export default Blog;