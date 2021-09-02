export function storeCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

export function getCurrentUser() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return user;
}

export function clearCurrentUser() {
  localStorage.removeItem("currentUser");
}

export function getLocalCart() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  return cart;
}

export function storeLocalCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart))
}