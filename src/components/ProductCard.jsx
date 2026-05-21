import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />
      <div>
        <p className="eyebrow">{product.category}</p>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>
      <div className="card-footer">
        <strong>${Number(product.price).toFixed(2)}</strong>
        <Link to={`/products/${product.id}`}>Manage</Link>
      </div>
    </article>
  );
}
