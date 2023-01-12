import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import Product from '../components/Product';

import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');

      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <>
      <h1>Latest products</h1>
      <Row>
        {products.map((product, index) => (
          <Col sm={12} md={6} lg={4} xxl={3} key={index}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
