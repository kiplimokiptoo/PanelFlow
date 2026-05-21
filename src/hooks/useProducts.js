import { useEffect, useState } from "react";
import * as productsApi from "../services/productsApi.js";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    productsApi
      .getProducts()
      .then((data) => {
        if (active) {
          setProducts(data);
          setError("");
        }
      })
      .catch(() => {
        if (active) {
          setError("Could not load products. Start the JSON server and try again.");
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  async function createProduct(product) {
    const created = await productsApi.createProduct(product);
    setProducts((currentProducts) => [...currentProducts, created]);
    return created;
  }

  async function updateProduct(id, updates) {
    const updated = await productsApi.updateProduct(id, updates);
    setProducts((currentProducts) =>
      currentProducts.map((product) => (String(product.id) === String(id) ? updated : product))
    );
    return updated;
  }

  async function deleteProduct(id) {
    await productsApi.deleteProduct(id);
    setProducts((currentProducts) => currentProducts.filter((product) => String(product.id) !== String(id)));
  }

  return { products, loading, error, createProduct, updateProduct, deleteProduct };
}
