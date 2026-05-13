const BASE_URL = "http://127.0.0.1:8000";

export const askAI = async (message) => {
  const response = await fetch(`${BASE_URL}/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
};

export const generateProductDescription = async (productName, category, shortInfo, price) => {
  const response = await fetch(`${BASE_URL}/ai/product-description`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      product_name: productName,
      category,
      short_info: shortInfo,
      price: parseInt(price),
    }),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
};

export const generateCustomerMessage = async (orderId, messageType) => {
  const response = await fetch(`${BASE_URL}/ai/customer-message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      order_id: orderId,
      message_type: messageType,
    }),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
};

export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
};

export const getOrders = async () => {
  const response = await fetch(`${BASE_URL}/orders`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
};

export const getDashboard = async () => {
  const response = await fetch(`${BASE_URL}/dashboard`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
};
