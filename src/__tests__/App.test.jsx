import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../App.jsx";

const products = [
  {
    id: 1,
    name: "Nova Headphones",
    category: "Audio",
    price: 129,
    stock: 18,
    description: "Wireless headphones",
    image: "https://example.com/headphones.jpg",
    featured: true,
  },
  {
    id: 2,
    name: "Metro Backpack",
    category: "Travel",
    price: 84,
    stock: 31,
    description: "Durable backpack",
    image: "https://example.com/backpack.jpg",
    featured: false,
  },
];

function mockFetch() {
  global.fetch = jest.fn((url, options = {}) => {
    if (!options.method) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve(products) });
    }

    if (options.method === "POST") {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 3, ...JSON.parse(options.body) }),
      });
    }

    if (options.method === "PATCH") {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ ...products[0], ...JSON.parse(options.body) }),
      });
    }

    if (options.method === "DELETE") {
      return Promise.resolve({ ok: true, status: 204 });
    }

    throw new Error(`Unhandled request: ${url}`);
  });
}

function renderApp(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </MemoryRouter>
  );
}

beforeEach(() => {
  mockFetch();
});

test("shows landing page product stats", async () => {
  renderApp("/");

  expect(await screen.findByRole("heading", { name: /manage products faster/i })).toBeInTheDocument();
  expect(await screen.findByText("2")).toBeInTheDocument();
});

test("filters products with search", async () => {
  const user = userEvent.setup();
  renderApp("/products");

  expect(await screen.findByText("Nova Headphones")).toBeInTheDocument();
  await user.type(screen.getByLabelText(/search products/i), "backpack");

  expect(screen.queryByText("Nova Headphones")).not.toBeInTheDocument();
  expect(screen.getByText("Metro Backpack")).toBeInTheDocument();
});

test("creates a product", async () => {
  const user = userEvent.setup();
  renderApp("/products/new");

  await user.type(await screen.findByLabelText(/product name/i), "Studio Chair");
  await user.type(screen.getByLabelText(/category/i), "Office");
  await user.type(screen.getByLabelText(/price/i), "149");
  await user.type(screen.getByLabelText(/stock/i), "9");
  await user.type(screen.getByLabelText(/image url/i), "https://example.com/chair.jpg");
  await user.type(screen.getByLabelText(/description/i), "Comfortable office chair");
  await user.click(screen.getByRole("button", { name: /create product/i }));

  await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ method: "POST" })));
});

test("updates and deletes a product", async () => {
  const user = userEvent.setup();
  renderApp("/products/1");

  const price = await screen.findByLabelText(/price/i);
  await user.clear(price);
  await user.type(price, "139");
  await user.click(screen.getByRole("button", { name: /update product/i }));

  await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/1"), expect.objectContaining({ method: "PATCH" })));

  renderApp("/products/1");
  await screen.findByRole("button", { name: /delete product/i });
  await user.click(screen.getByRole("button", { name: /delete product/i }));

  await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/1"), expect.objectContaining({ method: "DELETE" })));
});
