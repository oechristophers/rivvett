import BlogForm from "@/components/admin/BlogForm";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../layout";

export default function EditBlog() {
  const [blogInfo, setBlogInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/api/server/blogs/?id=` + id).then((response) => {
      setBlogInfo(response.data);
    });
  }, [id]);
  return (
    <Layout>
      <h1>Edit Blog</h1>
      {blogInfo && <BlogForm {...blogInfo} />}
    </Layout>
  );
}
