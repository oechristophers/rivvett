import ProductForm from '@/components/admin/ProductForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/api/server/products/?id=` + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);
  return <>{productInfo && <ProductForm {...productInfo} />}</>;
}
