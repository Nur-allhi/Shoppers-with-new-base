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
      <Typography varient="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit="">
          <Grid container spacing={3}>
            <FormInputFiled name="firstName" label="First Name" />
            <FormInputFiled name="lastName" label="Last Name" />
            <FormInputFiled name="address" label="Address" />
            <FormInputFiled name="email" label="Email" />
            <FormInputFiled name="city" label="City" />
            <FormInputFiled name="zip" label="Zip / Postal code" />
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
                value={shippingSubDivision}
                fullWidth
                onChange={(e) => SetShippingSubDivision(e.target.value)}
              >
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
                value={shippingOption}
                fullWidth
                onChange={(e) => SetShippingOption(e.target.value)}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
