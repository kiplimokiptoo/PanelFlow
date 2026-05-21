import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm.jsx";

export default function NewProductPage({ onCreate }) {
  const navigate = useNavigate();

  async function handleCreate(product) {
    await onCreate(product);
    navigate("/products");
  }

  return (
    <section className="page narrow-page">
      <p className="eyebrow">New inventory</p>
      <h1>Add Product</h1>
      <ProductForm submitLabel="Create Product" onSubmit={handleCreate} />
    </section>
  );
}
