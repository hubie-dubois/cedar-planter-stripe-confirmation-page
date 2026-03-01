const yearEl = document.getElementById("year");
const orderIdEl = document.getElementById("order-id");
const customerNameEl = document.getElementById("customer-name");

function getFirstQueryValue(params, keys) {
  for (const key of keys) {
    const value = params.get(key);
    if (value && value.trim()) return value.trim();
  }
  return "";
}

function normalizeOrderId(rawValue) {
  if (!rawValue) return "Unavailable";
  return rawValue.length > 24 ? `${rawValue.slice(0, 24)}...` : rawValue;
}

function normalizeCustomerName(rawValue) {
  if (!rawValue) return "Unavailable";
  return rawValue
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

const params = new URLSearchParams(window.location.search);
const orderId = getFirstQueryValue(params, ["session_id", "payment_intent", "order_id"]);
const customerName = getFirstQueryValue(params, ["customer_name", "name"]);

if (orderIdEl) {
  orderIdEl.textContent = normalizeOrderId(orderId);
}

if (customerNameEl) {
  customerNameEl.textContent = normalizeCustomerName(customerName);
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
