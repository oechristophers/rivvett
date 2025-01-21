import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function DeleteProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/api/products/?id=` + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);
  function goBack() {
    router.push("/products");
  }
  async function deleteProduct() {
    await axios
      .delete(`/api/products?id=` + id)
      .then((window.location.pathname = "/products"));
    goBack();
  }
  return (
    <>
      <h1 className="text-center">
        Do you want to delete product &nbsp;"{productInfo?.title}"?
      </h1>
      <div className="flex gap-2 justify-center">
        <button onClick={deleteProduct} className="btn-red">
          Yes
        </button>
        <button onClick={goBack} className="btn-default">
          No
        </button>
      </div>
    </>
  );
}
