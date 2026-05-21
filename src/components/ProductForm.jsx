import { useState } from "react";

const emptyProduct = {
  name: "",
  category: "",
  price: "",
  stock: "",
  image: "",
  description: "",
  featured: false,
};

export default function ProductForm({ initialProduct = emptyProduct, submitLabel = "Save Product", onSubmit }) {
  const [form, setForm] = useState({
    ...emptyProduct,
    ...initialProduct,
  });
  const [saving, setSaving] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);

    await onSubmit({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });

    setSaving(false);
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label>
        Product name
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>

      <label>
        Category
        <input name="category" value={form.category} onChange={handleChange} required />
      </label>

      <div className="form-grid">
        <label>
          Price
          <input name="price" type="number" min="0" value={form.price} onChange={handleChange} required />
        </label>

        <label>
          Stock
          <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required />
        </label>
      </div>

      <label>
        Image URL
        <input name="image" value={form.image} onChange={handleChange} required />
      </label>

      <label>
        Description
        <textarea name="description" rows="4" value={form.description} onChange={handleChange} required />
      </label>

      <label className="checkbox">
        <input name="featured" type="checkbox" checked={form.featured} onChange={handleChange} />
        Featured product
      </label>

      <button type="submit" disabled={saving}>
        {saving ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
