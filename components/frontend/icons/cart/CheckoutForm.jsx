import React, { useState } from 'react';
import PButton from './PButton';
import Box from '../../Box';
import styled from 'styled-components';
import Input from '../../Input';

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CheckoutForm({ cartItems }) {
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [streetAddress, setStreetAddress] = useState('');

  async function goToPayment() {
    const itemIds = cartItems.map((item) => item.split('-')[0]);
    const response = await axios.post('/api/frontend/checkout', {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      itemIds,
      itemProps,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }
  return (
    <Box dgrid>
      <h2>Order Information</h2>

      <Input
        type="text"
        placeholder="Name"
        value={name}
        name="name"
        onChange={(ev) => setName(ev.target.value)}
      />
      <Input
        type="text"
        placeholder="Email"
        value={email}
        name="email"
        onChange={(ev) => setEmail(ev.target.value)}
      />
      <CityHolder>
        <Input
          type="text"
          placeholder="City"
          value={city}
          name="city"
          onChange={(ev) => setCity(ev.target.value)}
        />
        <Input
          type="text"
          placeholder="Postal Code"
          value={postalCode}
          name="postalCode"
          onChange={(ev) => setPostalCode(ev.target.value)}
        />
      </CityHolder>
      <Input
        type="text"
        placeholder="Street Address"
        value={streetAddress}
        name="streetAddress"
        onChange={(ev) => setStreetAddress(ev.target.value)}
      />
      <Input
        type="text"
        placeholder="Country"
        value={country}
        name="country"
        onChange={(ev) => setCountry(ev.target.value)}
      />
      <PButton style={{ color: 'white' }} white outline onClick={goToPayment}>
        Continue to Payment
      </PButton>
    </Box>
  );
}
