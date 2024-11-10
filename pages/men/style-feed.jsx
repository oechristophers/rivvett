import React from "react";
import Layout from "../layout";
import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";
import BlogCard from "@/components/BlogCard";
import styled from "styled-components";

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 1000px;
  @media screen and (max-width: 1024px) {
    width: 800px;
  }
  @media screen and (max-width: 820px) {
    width: 700px;
  }
  @media screen and (max-width: 770px) {
    width: 100%;
    grid-template-columns: 1fr;
    gap:20px;
  }
`;
const Wrap = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
margin-top: 20px;
font-size: 1.5rem;
font-family: 'Futura Std Heavy';
margin: 0;
padding: 0;
letter-spacing: 1.2px;
`;
const Sub = styled.p`
font-family: 'Futura Std Book';
margin: 0;
padding: 0;
letter-spacing: 1.2px;
color: #1e1d1dcf;
margin-bottom: 40px;
`
export default function fashionFeed({ blogs }) {
  //   console.log(blogs[0]);
  return (
    <Layout>
      <Wrap>
        <Title>MEN'S STYLE FEED</Title>
        <Sub>Style. Grooming. Inspiration. Advice</Sub>

        <BlogGrid>
          {blogs && blogs.map((blog) => <BlogCard key={blog._id} {...blog} />)}
        </BlogGrid>
      </Wrap>
    </Layout>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const genderId = "669161b8bbede0f410af829e";
  const blogs = await Blog.find({ gender: genderId }).sort({ createdAt: -1 });

  return {
    props: {
      blogs: JSON.parse(JSON.stringify(blogs)),
    },
  };
}
