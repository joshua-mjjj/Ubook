import React from 'react';
import Article from '../../components/article/Article';
import { blog01, blog02, blog03, blog04, blog05 } from './imports';
import './blog.css';

const Blog = () => (
  <div className="gpt3__blog section__padding" id="blog">
    {/*<div className="gpt3__blog-heading">
      <h1 className="gradient__text">A lot is happening, <br /> We are blogging about it.</h1>
    </div>*/}
    <div className="gpt3__blog-container">
      <div className="gpt3__blog-container_groupB">
        <Article date="Dorah, Parent / host of her twins 13th birthday party" text="Thank you very much for everything. The children had a wonderful time time and that was our goal. Thank you to the entire team for the contributed success." />
        <Article date="Dorah, Parent / host of her twins 13th birthday party" text="Thank you very much for everything. The children had a wonderful time time and that was our goal. Thank you to the entire team for the contributed success." />
        <Article date="Dorah, Parent / host of her twins 13th birthday party" text="Thank you very much for everything. The children had a wonderful time time and that was our goal. Thank you to the entire team for the contributed success." />
        <Article date="Dorah, Parent / host of her twins 13th birthday party" text="Thank you very much for everything. The children had a wonderful time time and that was our goal. Thank you to the entire team for the contributed success." />
      </div>
    </div>
  </div>
);

export default Blog;
