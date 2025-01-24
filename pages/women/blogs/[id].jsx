import BlogCard from "@/components/frontend/BlogCard";
import { UseIsDevice } from "@/components/frontend/DeviceView";
import { CartB } from "@/components/frontend/ProductCard";
import ProductCarousel from "@/components/frontend/ProductCarousel";
import ProductGrid from "@/components/frontend/ProductGrid";
import StyleFeed, { Button } from "@/components/frontend/StyleFeed";
import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";
import { Category } from "@/models/Category";
import { Gender } from "@/models/Gender";
import { Product } from "@/models/Product";
import RootLayout from "@/pages/layout";
import { ArrowRight } from "@mui/icons-material";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  justify-content: center;

  .container {
    width: 900px;
    display: flex;
    padding-top: 40px;
    figure {
      margin: 0;
    }
    img {
      width: 100%;
      height: auto;
    }
    .div-2 {
      padding-top: 60px;
      display: flex;
      flex-direction: column;
      h2 {
        margin: 0;
        font-family: "Futura Std Heavy";
        font-size: 0.9rem;
        letter-spacing: 1.2px;
        padding: 10px 8px;
      }
    }

    .div-1 {
      width: 65%;
      display: flex;
      flex-direction: column;
      padding: 20px;

      .blog-category {
        margin: 0;
        font-family: "Futura Std Heavy";
        font-size: 0.9rem;
        letter-spacing: 1.2px;
        padding: 10px 0;
      }
      .blog-title {
        margin: 0;
        font-family: "Futura Std Bold";
        font-size: 2rem;
        letter-spacing: 1.5px;
        margin-bottom: 5px;
      }
      .date,
      .author {
        margin: 0;
        font-size: 0.8rem;
        font-family: "Futura Std Book";
        color: #00000093;
      }
      .blog-body,
      .sub-content {
        margin: 0;
        font-size: 0.9rem;
        font-family: "Futura Std Book";
        letter-spacing: 1.3px;
        color: #000000cb;
        line-height: 1.5rem;
        margin-bottom: 20px;
      }
      .blog-body {
        margin: 0;
        margin-top: 10px;
        margin-bottom: 20px;
      }

      .sub-title {
        margin: 0;
        font-family: "Futura Std Heavy";
        font-size: 1.1rem;
        letter-spacing: 1.7px;
        margin: 15px 0;
        margin-bottom: 10px;
      }
    }
    .tri-image,
    .bi-image,
    .solo-image {
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .get-look {
      margin: 0;
      font-family: "Futura Std Heavy";
      font-size: 1.1rem;
      letter-spacing: 1.7px;
      margin: 15px 0;
      margin-bottom: 5px;
      text-transform: uppercase;
    }
    .sub-prod-title {
      margin: 0;
      font-family: "Futura Std Book";
      font-size: 0.8rem;
      letter-spacing: 1.7px;
      padding: 2px 0;
      border-bottom: 1px solid;
      width: fit-content;
      color: #000000be;
    }
    .get-the-look {
      margin: 0;
      margin-bottom: 10px;
    }
    .carousel {
      padding-left: 20px;
      padding-top: 20px;
      padding-bottom: 40px;
      background-color: #41404030;

      .story-h2 {
        font-family: "Futura Std Heavy";
        font-size: 1.3rem;
        letter-spacing: 1.5px;
      }
    }
    .grided-div {
      margin-bottom: 20px;
      .collage {
        display: flex;
        p {
          width: 35ch;
        }
      }
    }
    .grided-div > :nth-child(2) {
      flex-direction: row-reverse;
    }

    @media screen and (max-width: 950px) {
      flex-direction: column;
      width: fit-content;
      align-items: center;
      .div-2 {
        max-width: 98vw;
      }
      .div-1 {
        padding: 0;

        width: 600px;
      }
    }
    @media screen and (max-width: 600px) {
      .div-1 {
        width: 100%;
      }
      .grided-div {
        margin-bottom: 20px;
        .collage {
          flex-direction: column;
          p {
            width: 100%;
          }
        }
      }
      width: 100%;
      .intro {
        text-align: center;
      }
    }
    @media screen and (min-width: 800px) {
      .tri-image {
        display: grid;
        gap: 20px;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
          "a a"
          "b c";
      }
      .tri-image > :nth-child(1) {
        grid-area: a;
      }
      .tri-image > :nth-child(2) {
        grid-area: b;
      }
      .tri-image > :nth-child(3) {
        grid-area: c;
      }

      .bi-image {
        display: grid;
        gap: 20px;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr 1fr;
        grid-template-areas: "a b";
      }
      .bi-image > :nth-child(1) {
        grid-area: a;
      }
      .bi-image > :nth-child(2) {
        grid-area: b;
      }

      .solo-image {
        display: grid;
        gap: 20px;
        grid-template-columns: 1fr;
      }
    }
  }
`;
const StyledBtn = styled(Link)`
  font-family: "Futura Std bold";
  margin: 0 10px;
  font-size: 0.9rem;
  letter-spacing: 1px;
  padding: 14px 20px;
  text-transform: uppercase;
  color: black;
  background: linear-gradient(to bottom left, white 50%, black 50%);
  background-size: 200% 200%;
  background-position: top right;
  transition: background-position 0.3s ease;

  &:hover {
    background-position: bottom left;
    color: white;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const BlogGrid = styled.div`
  margin: 0;
  gap: 20px;
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;

  @media screen and (max-width: 820px) {
    grid-template-columns: 1fr 1fr;
  }
  /* width: 1000px;
  @media screen and (max-width: 1024px) {
    width: 800px;
  }
 
  @media screen and (max-width: 770px) {
    width: 100%;
    grid-template-columns: 1fr;
    gap:20px;
  } */
`;
export default function BlogPage({ blog, blogs }) {
  const rout = useRouter();
  const path = rout.pathname.split("/")[1];
  const { isNavView } = UseIsDevice();
  // useEffect(() => {
  //   window.addEventListener("resize", () => {
  //     console.log(window?.innerWidth);
  //   });
  // });
  const tabBlogs = blogs;

  //   console.log(path);
  //   console.log(blog.subtitles[1].subProducts);

  return (
    <RootLayout>
      <Wrap>
        <div className="container">
          <div className="div-1">
            <section style={{ padding: "0 10px" }}>
              <div className="intro">
                {blog.category && (
                  <h3 className="blog-category">{blog.category.name}</h3>
                )}
                {blog.title && <h4 className="blog-title">{blog.title}</h4>}
                <p>
                  {blog.createdAt && (
                    <>
                      {blog.author && (
                        <span className="author">By {blog.author}, </span>
                      )}
                      <span className="date">
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </>
                  )}
                </p>
              </div>
              {blog.body && <p className="blog-body">{blog.body}</p>}
              {blog.subtitles &&
                blog.subtitles.map((subtitle, index) => {
                  if (subtitle.skipCount) {
                    subtitle.skipCount -= 1;
                    return null;
                  }
                  if (subtitle.content === ";;") {
                    // Wrap the next three items in a flex container and mark them to skip rendering
                    blog.subtitles[index + 1] &&
                      (blog.subtitles[index + 1].skipCount = 1);
                    blog.subtitles[index + 2] &&
                      (blog.subtitles[index + 2].skipCount = 1);
                    blog.subtitles[index + 3] &&
                      (blog.subtitles[index + 3].skipCount = 1);

                    return (
                      <div key={`group-${index}`} className="grided-div">
                        {[
                          blog.subtitles[index + 1],
                          blog.subtitles[index + 2],
                          blog.subtitles[index + 3],
                        ].map(
                          (sub, offset) =>
                            sub && (
                              <div
                                className="collage"
                                key={`section-${index + offset}`}
                                style={{ gap: "20px" }}
                              >
                                {sub.subtitleImages &&
                                  sub.subtitleImages.map((image, imgIndex) => (
                                    <figure key={imgIndex}>
                                      <Image
                                        width={700}
                                        height={700}
                                        layout="responsive"
                                        src={image}
                                        alt={sub.subtitle}
                                      />
                                      {sub.subMediaCaptions &&
                                        sub.subMediaCaptions[imgIndex] && (
                                          <figcaption className="fig-caption">
                                            {sub.subMediaCaptions[imgIndex]}
                                          </figcaption>
                                        )}
                                    </figure>
                                  ))}
                                <section>
                                  {sub.subtitle && (
                                    <h5 className="sub-title">
                                      {sub.subtitle}
                                    </h5>
                                  )}
                                  {sub.content && (
                                    <p className="sub-content">{sub.content}</p>
                                  )}
                                </section>
                              </div>
                            )
                        )}
                      </div>
                    );
                  } else {
                    // Render normally if subtitle content is not ";;"
                    return (
                      <React.Fragment key={index}>
                        {subtitle.subtitleImages && (
                          <div
                            className={
                              subtitle.subtitleImages.length > 2
                                ? "tri-image"
                                : subtitle.subtitleImages.length > 1
                                  ? "bi-image"
                                  : "solo-image"
                            }
                          >
                            {subtitle.subtitleImages.map((image, imgIndex) => (
                              <figure key={imgIndex}>
                                <Image
                                  width={700}
                                  height={700}
                                  layout="responsive"
                                  src={image}
                                  alt={subtitle.subtitle}
                                />
                                {subtitle.subMediaCaptions &&
                                  subtitle.subMediaCaptions[imgIndex] && (
                                    <figcaption className="fig-caption">
                                      {subtitle.subMediaCaptions[imgIndex]}
                                    </figcaption>
                                  )}
                              </figure>
                            ))}
                          </div>
                        )}

                        {subtitle.subtitle && (
                          <h5 className="sub-title">{subtitle.subtitle}</h5>
                        )}
                        {subtitle.content && (
                          <p className="sub-content">{subtitle.content}</p>
                        )}
                        {subtitle.subProducts &&
                          subtitle.subProducts.length > 0 && (
                            <section className="get-the-look">
                              {subtitle.subProducts.length > 1 && (
                                <h4 className="get-look">Get the look:</h4>
                              )}{" "}
                              {subtitle.subProducts.map((product, index) =>
                                subtitle.subProducts.length > 1 ? (
                                  <a
                                    href={`/women/product/${product._id}`}
                                    key={index}
                                    className="sub-prod-title"
                                  >
                                    RIVVETT DESIGN {product.title.toLowerCase()}
                                    ,$
                                    {product.price}
                                  </a>
                                ) : (
                                  <>
                                    <Image
                                      width={700}
                                      height={700}
                                      layout="responsive"
                                      src={product?.images[0]}
                                      alt={product.title}
                                    />
                                    {subtitle.subProducts && (
                                      <a
                                        href={`/women/product/${product._id}`}
                                        className="sub-prod-title"
                                      >
                                        {subtitle.subProducts.map(
                                          (product) => product.title
                                        )}
                                      </a>
                                    )}
                                  </>
                                )
                              )}
                            </section>
                          )}
                      </React.Fragment>
                    );
                  }
                })}
            </section>
            {blog.featuredProducts && (
              <div className="carousel">
                <ProductCarousel
                  hideButton
                  genderName={path}
                  inBlog
                  products={blog.featuredProducts}
                />
              </div>
            )}
          </div>

          <div className="div-2">
            {isNavView ? (
              <div className="max-w-80">
                <h2>STYLE FEED</h2>
                <BlogGrid>
                  {blogs &&
                    tabBlogs
                      .slice(0, 3)
                      .map((blog) => <BlogCard key={blog._id} {...blog} />)}
                  <StyledBtn href={`/${path}/style-feed`}>
                    VIEW ALL STYLE FEEDS
                  </StyledBtn>
                </BlogGrid>
              </div>
            ) : (
              <StyleFeed blogs={blogs} inId isId={blog._id} />
            )}
          </div>
        </div>
      </Wrap>
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  // console.log(context)
  const { id } = context.query;
  const genderId = "669161c1bbede0f410af82a2";
  const blog = await Blog.findById(id)
    .populate({
      path: "category",
      select: "name", // Only retrieve the name field from category
    })
    .populate("gender")
    .populate({
      path: "subtitles.subProducts", // Populate subProducts inside subtitles
      select: "title images price", // Only retrieve the title field from subProducts
    })
    .populate({
      path: "featuredProducts", // Populate subProducts inside subtitles
      select: "title images price", // Only retrieve the title field from subProducts
    })
    .exec();
  const allblogs = await Blog.find({ gender: genderId });
  const blogs = allblogs.filter((b) => b._id.toString() !== id);

  return {
    props: {
      blog: JSON.parse(JSON.stringify(blog)),
      blogs: JSON.parse(JSON.stringify(blogs)),
    },
  };
}
