import { Button, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";
import useStyles from "./styles";

const Cart = ({
  cart,
  handleUpdateCartQuantity,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const classes = useStyles();

  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">
        You have no item in your cart,.
        <Link to="/" className="classes.link">
          Start adding some
        </Link>
        !
      </Typography>
    );
  };

  const FilledCart = () => {
    return (
      <>
        <Grid container spacing={3}>
          {cart.line_items.map((item) => (
            <Grid item xs={12} sm={4} key={item.id}>
              <CartItem
                item={item}
                onUpdateItemQuantity={handleUpdateCartQuantity}
                onEmptyTheCart={handleRemoveFromCart}
              />
            </Grid>
          ))}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography variant="h4">
            Subtotal: {cart.subtotal.formatted} BDT
          </Typography>
          <div>
            <Button
              className={classes.emptyButton}
              size="large"
              type="button"
              variant="contained"
              color="secondary"
              onClick={handleEmptyCart}
            >
              Empty Cart
            </Button>
            <Button
              component={Link}
              to="/checkout"
              className={classes.checkoutButton}
              size="large"
              type="button"
              variant="contained"
              color="primary"
            >
              Check out
            </Button>
          </div>
        </div>
      </>
    );
  };

  if (!cart.line_items) return "Loading...";
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
