import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';

import Paginate from '../components/Paginate';

import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { keyword } = useParams('');
  const { pageNumber } = useParams(1);

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <h1>Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product, index) => (
              <Col sm={12} md={6} lg={4} xxl={3} key={index}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            isAmin={userInfo && userInfo.isAdmin}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
