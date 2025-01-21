import GalleryForm from "@/components/admin/GalleryForm";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function EditGallery() {
  const [galleryInfo, setGalleryInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/api/galleries/?id=` + id).then((response) => {
      setGalleryInfo(response.data);
    });
  }, [id]);

  return (
    <>
      <h1>Edit Gallery</h1>
      {galleryInfo && <GalleryForm {...galleryInfo} />}
    </>
  );
}
