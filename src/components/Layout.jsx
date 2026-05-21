import { NavLink } from "react-router-dom";
import { BarChart3, PackagePlus, Store } from "lucide-react";

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/">
          <Store aria-hidden="true" />
          <span>PanelFlow</span>
        </NavLink>

        <nav aria-label="Main navigation">
          <NavLink to="/">
            <BarChart3 aria-hidden="true" />
            Dashboard
          </NavLink>
          <NavLink to="/products">
            <Store aria-hidden="true" />
            Products
          </NavLink>
          <NavLink to="/products/new">
            <PackagePlus aria-hidden="true" />
            Add Product
          </NavLink>
        </nav>
      </aside>

      <main className="content">{children}</main>
    </div>
  );
}
