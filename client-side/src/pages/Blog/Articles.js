import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlog } from "../../redux/reducers/BlogSlice";
import Article from "./Article";

const Articles = () => {
  const dispatch=useDispatch()
  const {blogs}=useSelector(state=>state.blogs)
  
  useEffect(()=>{
  dispatch(fetchBlog())
  },[dispatch])
  
  return (
    <section className="mt-20">
      <div className="grid lg:grid-cols-2 grid-flow-row-dense lg:w-[80%] mx-auto  ">
        <div>
          {blogs.slice(0, blogs.length / 2).map((article, i) => (
            <Article key={i} article={article} />
          ))}
        </div>
        <div className="mt-20">
          {blogs
            .slice(blogs.length / 2, blogs.length)
            .map((article, i) => (
              <Article key={i} article={article} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;
