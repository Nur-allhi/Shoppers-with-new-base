import React, { useEffect, useState } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
import useStyles from "./styles";
import AddressForm from "./../AddressForm";
import PayementForm from "./../PayementForm";
import Confirmation from "./../Confirmation";
import { commerce } from "../../../lib/Commerce";

const Steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart }) => {
  const [activeStep, SetActiveStep] = useState(0);
  const [checkoutToken, setcheckoutToken] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        console.log(token);
        setcheckoutToken(token);
      } catch (error) {}
    };
    generateToken();
  }, [cart]);

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} />
    ) : (
      <PayementForm />
    );

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography varient="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {Steps.map((data) => (
              <Step key={data}>
                <StepLabel>{data}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === Steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
