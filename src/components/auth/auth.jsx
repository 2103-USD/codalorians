export function storeCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
  localStorage.setItem("token", user.token);
}

export function getCurrentUser() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return user;
}

export function getToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function clearCurrentUser() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}

export function getLocalCart() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  return cart;
}

export function storeLocalCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
