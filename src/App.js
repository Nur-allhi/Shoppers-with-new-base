import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Cart, Checkout, Navbar, Products } from "./Components";
import { commerce } from "./lib/Commerce";

const App = () => {
  const [products, SetProducts] = useState([]);
  const [cart, SetCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, SetErrorMessage] = useState({});

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

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh()
    SetCart(newCart)
  }

  const handleCaptureCheckout = async (CheckoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(CheckoutTokenId, newOrder)
      setOrder(incomingOrder)
      refreshCart()
    }
    catch (error) {
      SetErrorMessage(error.data.error.message)
      console.log("🚀 ~ file: App.js ~ line 43 ~ handleCaptureCheckout ~ error", error)
    }
  }

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
          <Checkout
            cart={cart}
            order={order}
            handleCaptureCheckout={handleCaptureCheckout}
            error={errorMessage}
          />
        </Route>
      </div>
    </Router>
  );
};

export default App;
