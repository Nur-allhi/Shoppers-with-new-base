import React from "react";
import Review from "./Review";


const PayementForm = ({checkoutToken}) => {
  return <>
  <Review checkoutToken={checkoutToken}/>
  </>
};

export default PayementForm;
