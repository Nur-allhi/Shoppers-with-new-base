import React, { useEffect, useState } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInputFiled from "./CutomTextFiled";
import { commerce } from "../../lib/Commerce";

const AddressForm = ({ checkoutToken }) => {
  const [shippingCountries, SetShippingCountries] = useState([]);

  const [shippingCountry, SetShippingCountry] = useState("");

  const [shippingSubDivisions, SetShippingSubDivisions] = useState([]);

  const [shippingSubDivision, SetShippingSubDivision] = useState("");

  const [shippingOptions, SetShippingOptions] = useState([]);

  const [shippingOption, SetShippingOption] = useState("");

  const methods = useForm();

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    // console.log(countries);
    SetShippingCountries(countries);
    SetShippingCountry(Object.keys(countries)[0]);
  };

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  // console.log(countries);

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  return (
    <>
      <Typography varient="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit="">
          <Grid container spacing={3}>
            <FormInputFiled required name="firstName" label="First Name" />
            <FormInputFiled required name="lastName" label="Last Name" />
            <FormInputFiled required name="address" label="Address" />
            <FormInputFiled required name="email" label="Email" />
            <FormInputFiled required name="city" label="City" />
            <FormInputFiled required name="zip" label="Zip / Postal code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => SetShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
                          <InputLabel>Shipping Subdivision</InputLabel>
                          <Select value={ } fullWidth onChange={ }>
                              <MenuItem key={} value={}>
                                  Select Me
                              </MenuItem>
                          </Select>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <InputLabel>Shipping Options</InputLabel>
                          <Select value={ } fullWidth onChange={ }>
                              <MenuItem key={} value={}>
                                  Select Me
                              </MenuItem>
                          </Select>
                      </Grid>  */}
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
