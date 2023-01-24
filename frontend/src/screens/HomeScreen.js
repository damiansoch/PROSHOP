import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';

import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const { keyword } = useParams('');

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <h1>Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product, index) => (
            <Col sm={12} md={6} lg={4} xxl={3} key={index}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
