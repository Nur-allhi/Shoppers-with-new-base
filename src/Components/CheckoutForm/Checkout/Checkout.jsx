import { Paper, Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { commerce } from "../../../lib/Commerce";
import AddressForm from "./../AddressForm";
import Confirmation from "./../Confirmation";
import PayementForm from "./../PayementForm";
import useStyles from "./styles";

const Steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart, order, handleCaptureCheckout, error, }) => {
  const [activeStep, SetActiveStep] = useState(0);
  const [checkoutToken, setcheckoutToken] = useState(null);
  const [shippingData, SetShippingData] = useState({})

  const classes = useStyles();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: "cart", });
        console.log(token);
        setcheckoutToken(token);
      } catch (error) { }
    };
    generateToken();
  }, [cart]);

  const nextStep = () => SetActiveStep((prevActiveStep) => prevActiveStep + 1)
  const backStep = () => SetActiveStep((prevActiveStep) => prevActiveStep - 1)

  const next = (data) => {
    SetShippingData(data)
    nextStep()
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />) :
      (<PayementForm shippingData={shippingData} nextStep={nextStep} checkoutToken={checkoutToken} backStep={backStep} handleCaptureCheckout={handleCaptureCheckout} />)

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {Steps.map((data) => (
              <Step key={data}>
                <StepLabel>{data}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === Steps.length ? (<Confirmation />) : (checkoutToken && <Form />)}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
