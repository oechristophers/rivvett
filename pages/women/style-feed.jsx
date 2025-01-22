import React from 'react';
import RootLayout from '../layout';
import { mongooseConnect } from '@/lib/mongoose';
import { Blog } from '@/models/Blog';
import BlogCard from '@/components/frontend/BlogCard';
import styled from 'styled-components';
import { motion } from 'framer-motion'; // Import Framer Motion

// Styled components for layout and styling
const BlogGrid = styled(motion.div)`
  // Convert BlogGrid to a motion.div for animation
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 1000px;
  row-gap: 20px;

  @media screen and (max-width: 1024px) {
    width: 800px;
  }
  @media screen and (max-width: 820px) {
    width: 700px;
  }
  @media screen and (max-width: 770px) {
    width: 100%;
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Wrap = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 770px) {
    padding: 20px 5px;
  }
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
  text-align: center;
  color: #1e1d1dcf;
  margin-bottom: 40px;
`;

// Framer Motion animations for staggered grid and individual cards
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Stagger the animations of the grid items
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 }, // Start from below and scaled down
  visible: {
    opacity: 1,
    y: 0,
    scale: 1, // Card scales up after appearing
    transition: { duration: 0.6 },
  },
};

export default function FashionFeed({ blogs }) {
  return (
    <RootLayout>
      <Wrap>
        <Title>WOMEN&rsquo;S STYLE FEED</Title>
        <Sub>
          Outfit ideas, editor picks, styling inspiration and Face + Body tips
        </Sub>

        {/* Wrap BlogGrid in motion.div with staggered animations */}
        <BlogGrid
          initial="hidden"
          animate="visible"
          variants={gridVariants} // Add grid animation variants
        >
          {blogs &&
            blogs.map((blog) => (
              <motion.div
                key={blog._id}
                variants={cardVariants}
                whileInView="visible" // Trigger animation when in view
                initial="hidden" // Start with hidden state
                viewport={{ once: false, amount: 0.2 }} // Trigger when 20% is in view
              >
                <BlogCard {...blog} />
              </motion.div>
            ))}
        </BlogGrid>
      </Wrap>
    </RootLayout>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const genderId = '669161c1bbede0f410af82a2';
  const blogs = await Blog.find({ gender: genderId }).sort({ createdAt: -1 });

  return {
    props: {
      blogs: JSON.parse(JSON.stringify(blogs)),
    },
  };
}
