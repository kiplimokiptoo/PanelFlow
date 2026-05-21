import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import NewProductPage from "./pages/NewProductPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import { useProducts } from "./hooks/useProducts.js";

export default function App() {
  const productState = useProducts();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage products={productState.products} />} />
        <Route path="/products" element={<ProductsPage {...productState} />} />
        <Route path="/products/new" element={<NewProductPage onCreate={productState.createProduct} />} />
        <Route path="/products/:id" element={<ProductDetailPage {...productState} />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </Layout>
  );
}
