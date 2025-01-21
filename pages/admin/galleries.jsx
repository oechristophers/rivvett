import GalleryForm from "@/components/admin/GalleryForm";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";
import Layout from "./layout";
import { Add } from "@mui/icons-material";
function Galleries({ swal }) {
  const [galleries, setGalleries] = useState([]);
  useEffect(() => {
    fetchGallery();
  }, []);

  function fetchGallery() {
    axios.get("/api/server/galleries").then((response) => {
      setGalleries(response.data);
    });
  }

  function deleteGallery(gallery) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${gallery.title}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, delete !",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result) => {
        // when confirmed show promise
        console.log({ result });
        if (result.isConfirmed) {
          const _id = gallery._id;
          await axios.delete("/api/server/galleries?_id=" + _id);
          fetchGallery();
        }
      })
      .catch((error) => {
        //when promise rejected
      });
  }
  return (
    <Layout>
      <div className="flex justify-end">
        <Link
          href={"/galleries/new"}
          className="bg-gray-500 text-white py-2 px-2 rounded-sm mt-2  "
        >
          <Add/>
          New
        </Link>
      </div>
      <table className="basic mt-6">
        <thead>
          <tr className="">
            <td>Gallery name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {galleries.map((gallery) => (
            <tr key={gallery._id}>
              <td>{gallery.title}</td>
              <td>
                <Link
                  href={"/galleries/edit/" + gallery._id}
                  className="btn-primary text-sm p-1 rounded-md px-2 inline-flex gap-1 mr-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 pt-[0.10rem]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                  Edit
                </Link>
                <button
                  onClick={() => {
                    deleteGallery(gallery);
                  }}
                  className="btn-red text-sm p-1 rounded-md px-2 inline-flex gap-1 mr-1 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 pt-[0.10rem]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Galleries swal={swal} />);
