import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import Spinner from "./Spinner";
import UploadButton from "./UploadButton";
import axios from "axios";

export default function ImageDisplay({
  setImages,
  images = [],
  resizeAndEdit,
  index,
}) {
  const [isUploading, setIsUploading] = useState(false);
  async function removeImage(downloadUrl) {
    const newImages = [...images]; // Create a shallow copy of the array
    const imageIndex = newImages.indexOf(downloadUrl); // Find the index of the image to be removed

    if (imageIndex > -1) {
      newImages.splice(imageIndex, 1); // Remove the image if found
    }

    setImages(newImages); // Update the state with the updated array
  }

  useEffect(() => {
    // console.log(`Subtitle Images at index ${index}:`, images);
  }, [images, index]);

  function updateImagesOrder(images) {
    setImages(images);
  }

  return (
    <div className="mb-2 flex flex-wrap gap-1">
      <ReactSortable
        list={images}
        setList={updateImagesOrder}
        className="flex flex-wrap gap-1 "
      >
        <>
          {Array.isArray(images) &&
            images.length > 0 &&
            images.map((downloadUrl) => (
              <div
                key={downloadUrl}
                className="  h-24 p-2 shadow-sm rounded-lg relative picDiv"
              >
                {
                  <img
                    src={downloadUrl}
                    alt=""
                    className="rounded-lg min-h-full"
                  />
                }

                <section
                  className="z-30 "
                  onClick={() => removeImage(downloadUrl)}
                >
                  <label
                    className="px-5 bg-[#ffffff23] 
                rounded-full hover:bg-[#ffffff4c]
                 hover:text-[#ffffffa9]"
                  >
                    X
                  </label>
                </section>
              </div>
            ))}
          {isUploading && (
            <div className="h-24 flex items-center">
              <Spinner />
            </div>
          )}
          <section className="b">
            <UploadButton
              setIsUploading={setIsUploading}
              setImages={setImages}
              images={images}
              resizeAndEdit={resizeAndEdit}
            />
          </section>
        </>
      </ReactSortable>
    </div>
  );
}
