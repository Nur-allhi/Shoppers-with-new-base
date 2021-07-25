import { Button, Grid, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { commerce } from "../../lib/Commerce";
import FormInputFiled from "./CutomTextFiled";

const AddressForm = ({ checkoutToken, next }) => {
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
    SetShippingCountries(countries);
    SetShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubDivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    SetShippingSubDivisions(subdivisions);
    SetShippingSubDivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );
    SetShippingOptions(options);
    SetShippingOption(options[0].id);
  };

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const Subdivisons = Object.entries(shippingSubDivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  const options = shippingOptions.map((sO) => ({
    id: sO.id,
    label: `${sO.description} - ${sO.price.formatted_with_symbol}`,
  }));

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubDivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubDivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubDivision
      );
  }, [shippingSubDivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubDivision, shippingOption }))}>
          <Grid container spacing={3}>
            <FormInputFiled required  name="firstName" label="First Name" />
            <FormInputFiled required  name="lastName" label="Last Name" />
            <FormInputFiled required  name="address1" label="Address" />
            <FormInputFiled required  name="email" label="Email" />
            <FormInputFiled required  name="city" label="City" />
            <FormInputFiled required  name="zip" label="Zip / Postal code" />
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
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubDivision} fullWidth onChange={(e) => SetShippingSubDivision(e.target.value)}>
                {Subdivisons.map((subdivison) => (
                  <MenuItem key={subdivison.id} value={subdivison.id}>
                    {subdivison.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption} fullWidth onChange={(e) => SetShippingOption(e.target.value)} >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }} >
            <Button component={Link} to='/cart' variant="outlined" >Back to cart</Button>
            <Button type="submit" variant="contained" color="primary">Next</Button>
          </div>
        </form>
      </FormProvider>
      
    </>
  );
};

export default AddressForm;
