import React from "react";

const Article = ({ article }) => {
  return (
    <div className="w-[65%] mx-auto">
      <img className="w-[100%]  h-[60vh] object-cover" src={article.img} alt="" />
      <div>
        <h1 className="text-[30px] text-base-300 leading-[1.5] mt-[10px]">{article.title}</h1>
        <p className="my-[25px] text-gray-400">{article.desc}</p>
      </div>
      <div className="my-10">
        <p className="text-sm font-semibold text-secondary">
          {article.publisher}
        </p>
        <p className="text-sm text-base-300 ">Published{article.date} years ago</p>
      </div>
    </div>
  );
};

export default Article;
