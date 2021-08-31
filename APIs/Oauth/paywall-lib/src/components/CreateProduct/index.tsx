import React, { useState } from 'react';
import { Field, ResetButton } from '../StripeCheckoutForm';

interface Props {
  createdEndpoint: string;
}

const CreateProduct = ({ createdEndpoint }: Props) => {
  const [client, setClient] = useState('');
  const [name, setName] = useState('');
  const [productType, setProductType] = useState('once');
  const [price, setPrice] = useState('');
  const [created, setCreated] = useState(false);

  const resetFields = () => {
    setName('');
    setPrice('');
    setProductType('');
    setClient('');
  };

  const onCreated = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const request = {
      name: name,
      client: client,
      price: price,
      type: productType,
    };
    await fetch(createdEndpoint, {
      method: 'POST',
      body: JSON.stringify(request),
    }).then(() => {
      resetFields();
      setCreated(true);
    });
  };

  return created ? (
    <div className="Result">
      <div>
        <div className="ResultTitle" role="alert">
          Product created successfully
        </div>
        <div className="ResultMessage">
          Product created successfully. Press the button bellow if you want to
          add another product
          <br />
        </div>
        <ResetButton onClick={() => setCreated(false)} />
      </div>
    </div>
  ) : (
    <div className="section-main">
      <div className="header-title">
        <h1> Create a product </h1>
      </div>
      <div className="section-content">
        <form onSubmit={onCreated}>
          <fieldset>
            <Field
              isStripe={false}
              label="Name"
              id="client"
              type="text"
              placeholder="Jane Doe"
              required
              autoComplete="client"
              value={client}
              onChange={e => {
                setClient(e.target.value);
              }}
            />
            <Field
              isStripe={false}
              label="Product Name"
              id="product"
              type="text"
              placeholder="Product Name"
              required
              autoComplete="product"
              value={name}
              onChange={e => {
                setName(e.target.value);
              }}
            />

            <div>
              <label htmlFor={'type'}>{'Product Type'}</label>
              <select
                name="type"
                id="type"
                onChange={e => setProductType(e.target.value)}
              >
                <option value="once">Once</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <Field
              isStripe={false}
              label="Product Price"
              id="price"
              type="number"
              placeholder="9.99"
              required
              autoComplete="price"
              value={price}
              onChange={e => {
                setPrice(e.target.value);
              }}
            />
          </fieldset>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
