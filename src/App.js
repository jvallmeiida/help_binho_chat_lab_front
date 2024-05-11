import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/productList';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter produtos:', error);
      });
  }, []);

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}

export default App;
