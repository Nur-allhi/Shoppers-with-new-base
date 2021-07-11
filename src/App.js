import React, { useEffect, useState } from "react";
import { commerce } from "./lib/Commerce";
import { Navbar, Products, Cart } from "./Components";

const App = () => {
  const [products, SetProducts] = useState([]);
  const [cart, SetCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    SetProducts(data);
  };

  const fetchCart = async () => {
    SetCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    SetCart(item.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <div>
      <Navbar totalItems={cart.total_items} />
      {/* <Products addToCart={handleAddToCart} products={products} /> */}
      <Cart cart={cart} />
    </div>
  );
};

export default App;
