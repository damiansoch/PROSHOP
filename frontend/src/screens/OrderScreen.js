import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { PayPalButton } from 'react-paypal-button-v2';

import { useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';

import { getOrderDetails, payOrder } from '../actions/orderActions';

import { ORDER_PAY_RESET } from '../constants/orderConstants';

import { Link } from 'react-router-dom';

const OrderScreen = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  useEffect(() => {
    //paypal config
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?currency=EUR&client-id=${clientId}`;

      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, id, successPay, order]);

  //check order
  useEffect(() => {
    if (!order || order._id !== id) {
      dispatch(getOrderDetails(id));
    }
  }, [order, id, dispatch]);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  if (!loading) {
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(id, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger' />
  ) : (
    <>
      <h1>Order {order._id}</h1>

      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <ListGroup.Item>
                <strong>Name: </strong>
                <br />
                {order.user.name}
              </ListGroup.Item>

              <ListGroup.Item>
                <strong>Email: </strong>
                <br />
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </ListGroup.Item>

              <ListGroup.Item>
                {' '}
                <strong>Address: </strong>
                <br />
                {order.shippingAddress.address},<br />
                {order.shippingAddress.city},<br />
                {order.shippingAddress.postalCode},<br />
                {order.shippingAddress.country}
              </ListGroup.Item>
              <ListGroup.Item>
                {order.isDelivered ? (
                  <Message variant='success'>
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant='danger'>Not delivered</Message>
                )}
              </ListGroup.Item>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <ListGroup.Item>
                <strong>Method: </strong>
                <br />
                {order.paymentMethod}
              </ListGroup.Item>

              <ListGroup.Item>
                {order.isPaid ? (
                  <Message variant='success'>Paid on {order.paidAt}</Message>
                ) : (
                  <Message variant='danger'>Not paid</Message>
                )}
              </ListGroup.Item>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.lenght === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={3}>
                          <Image fluid rounded src={item.image} />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                          <Col md={4}>
                            {item.qty} x Є{item.price} ={' '}
                            {addDecimals(item.qty * item.price)}
                          </Col>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4} className='mt-4'>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Item</Col>
                  <Col>Є{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>Є{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>Є{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total</strong>
                  </Col>
                  <Col>
                    <strong>Є{addDecimals(order.totalPrice)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    //paypal
                    <PayPalButton
                      amount={order.totalPrice.toFixed(2)}
                      onSuccess={successPaymentHandler}
                      options={{
                        currency: 'EUR',
                      }}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
