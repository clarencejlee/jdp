import React, { useEffect, useState } from 'react';
import { Product } from '../../types';

interface Props {
  isAdmin: boolean;
  adminEndpoint?: string;
  clientEndpoint?: string;
}

const AdminDashboard = ({ isAdmin, adminEndpoint, clientEndpoint }: Props) => {
  const [products, setProducts] = useState<Product[]>();

  const getProducts = () => {
    let url = adminEndpoint;
    if (!isAdmin) {
      url = clientEndpoint;
    }
    url &&
      fetch(url)
        .then(res => res.json())
        .then(data => {
          setProducts(data);
        });
  };

  useEffect(getProducts, []);
  return (
    <div className="section-main">
      <h1>Admin Dashboard</h1>
      <div className="section-content">
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Product Type</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map(product => (
                <tr>
                  <td>{product.client}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.type}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
