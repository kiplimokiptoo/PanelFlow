const API_URL = "http://localhost:3001/products";

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error("Product request failed");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function getProducts() {
  return fetch(API_URL).then(handleResponse);
}

export function createProduct(product) {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  }).then(handleResponse);
}

export function updateProduct(id, updates) {
  return fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  }).then(handleResponse);
}

export function deleteProduct(id) {
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  }).then(handleResponse);
}
