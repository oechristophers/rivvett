import ProductCarousel from "@/components/ProductCarousel";
import ProductGrid from "@/components/ProductGrid";
import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";
import { Category } from "@/models/Category";
import { Gender } from "@/models/Gender";
import { Product } from "@/models/Product";
import Layout from "@/pages/layout";
import mongoose from "mongoose";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  justify-content: center;

  .container {
    width: 800px;
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
    }
    .div-1 {
      width: 75%;
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
      padding-bottom: 40px;
      background-color: #41404072;

      .story-h2 {
        font-family: "Futura Std Heavy";
        font-size: 1.3rem;
        letter-spacing: 1.5px;
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
export default function BlogPage({ blog }) {
  const rout = useRouter();
  const path = rout.pathname.split("/")[1];
  console.log(path);
  console.log(blog.subtitles[1].subProducts);

  return (
    <Layout>
      <Wrap>
        <div className="container">
          <div className="div-1">
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
                              key={`section-${index + offset}`}
                              style={{ display: "flex" }}
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

                              {sub.subtitle && (
                                <h5 className="sub-title">{sub.subtitle}</h5>
                              )}
                              {sub.content && (
                                <p className="sub-content">{sub.content}</p>
                              )}
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
                                <h5 key={index} className="sub-prod-title">
                                  RIVVETT DESIGN {product.title.toLowerCase()},$
                                  {product.price}
                                </h5>
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
                                    <h5 className="sub-prod-title">
                                      {subtitle.subProducts.map(
                                        (product) => product.title
                                      )}
                                    </h5>
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

          <div className="div-2">jjjj</div>
        </div>
      </Wrap>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  // console.log(context)
  const { id } = context.query;
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

  return {
    props: {
      blog: JSON.parse(JSON.stringify(blog)),
    },
  };
}
