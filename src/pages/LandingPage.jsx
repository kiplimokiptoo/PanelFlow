import { Link } from "react-router-dom";
import { Package, Search, Settings } from "lucide-react";

export default function LandingPage({ products }) {
  const featuredCount = products.filter((product) => product.featured).length;

  return (
    <section className="page">
      <div className="hero">
        <div>
          <p className="eyebrow">E-commerce admin portal</p>
          <h1>Manage products faster with PanelFlow.</h1>
          <p>
            Add inventory, update prices, search products, and keep a simple product catalog in sync with a simulated
            backend.
          </p>
          <Link className="primary-link" to="/products">
            View Products
          </Link>
        </div>
        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80"
          alt="Online store admin workspace"
        />
      </div>

      <div className="stats-grid">
        <div>
          <Package aria-hidden="true" />
          <strong>{products.length}</strong>
          <span>Total products</span>
        </div>
        <div>
          <Search aria-hidden="true" />
          <strong>{featuredCount}</strong>
          <span>Featured items</span>
        </div>
        <div>
          <Settings aria-hidden="true" />
          <strong>CRUD</strong>
          <span>Create, read, update, delete</span>
        </div>
      </div>
    </section>
  );
}
