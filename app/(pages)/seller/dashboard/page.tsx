import { baseUrl } from "@/app/config";
import { createAuthorizedAxios } from "@/lib/authHelper";
import ProductsPage from "./productPage";

export default async function getProducts() {
  // Your products data will be passed as a prop here
  let products;

  const api = await createAuthorizedAxios();

  const response = await api.get(`${baseUrl}/product/getMyProducts`);

  products = response.data.data;
  console.log(products);

  return (
    <>
      <ProductsPage products={products} />
    </>
  );
}
