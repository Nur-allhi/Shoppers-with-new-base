import React, { useEffect, useState } from "react";
import { commerce } from "./lib/Commerce";
import { Navbar, Products, Cart, Checkout } from "./Components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
    const { cart } = await commerce.cart.add(productId, quantity);
    SetCart(cart);
  };

  const handleUpdateCartQuantity = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    SetCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    SetCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    SetCart(cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products addToCart={handleAddToCart} products={products} />
          </Route>
        </Switch>
        <Route path="/cart">
          <Cart
            cart={cart}
            handleUpdateCartQuantity={handleUpdateCartQuantity}
            handleRemoveFromCart={handleRemoveFromCart}
            handleEmptyCart={handleEmptyCart}
          />
        </Route>
        <Route path="/checkout">
          <Checkout cart={cart} />
        </Route>
      </div>
    </Router>
  );
};

export default App;
