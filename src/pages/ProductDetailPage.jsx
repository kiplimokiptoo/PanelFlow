import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm.jsx";

export default function ProductDetailPage({ products, loading, updateProduct, deleteProduct }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = useMemo(() => products.find((item) => String(item.id) === String(id)), [products, id]);

  async function handleUpdate(updates) {
    await updateProduct(id, updates);
    navigate("/products");
  }

  async function handleDelete() {
    await deleteProduct(id);
    navigate("/products");
  }

  if (loading) {
    return <p className="page">Loading product...</p>;
  }

  if (!product) {
    return (
      <section className="page">
        <h1>Product not found</h1>
        <Link to="/products">Back to products</Link>
      </section>
    );
  }

  return (
    <section className="page detail-layout">
      <div className="detail-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div>
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <ProductForm initialProduct={product} submitLabel="Update Product" onSubmit={handleUpdate} />
        <button className="danger-button" type="button" onClick={handleDelete}>
          Delete Product
        </button>
      </div>
    </section>
  );
}
