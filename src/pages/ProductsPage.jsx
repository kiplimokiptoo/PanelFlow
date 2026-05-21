import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";

export default function ProductsPage({ products, loading, error }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      `${product.name} ${product.category}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1>Products</h1>
        </div>
        <Link className="primary-link" to="/products/new">
          Add Product
        </Link>
      </div>

      <input
        className="search-input"
        aria-label="Search products"
        placeholder="Search by name or category"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {!loading && filteredProducts.length === 0 && <p>No products found.</p>}
    </section>
  );
}
