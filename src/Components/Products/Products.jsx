import React from "react";
import { Grid } from "@material-ui/core";

import useStyles from "./styles";
import Product from "./Product/Product";

const Products = ({ products, addToCart }) => {
  console.log(products);
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} lg={3}>
            <Product addToCart={addToCart} product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
