import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Table } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';

import { listOrders } from '../actions/orderActions';

const OrderListScreen = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderList = useSelector((state) => state.orderList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderList;

  //
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <Col>
      <h2>All orders</h2>
      {loadingOrders ? (
        <Loader />
      ) : errorOrders ? (
        <Message variant='danger'>{errorOrders}</Message>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className='table-sm text-center'
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>USER ID</th>
              <th>USER NAME</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <small>{order._id}</small>
                </td>
                <td>
                  <small>{order.user && order.user._id}</small>
                </td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.isPaid ? (
                    <strong className='text-success'>
                      {order.paidAt.substring(0, 10)}
                    </strong>
                  ) : (
                    <strong className='text-danger'>
                      <i className='fas fa-times'></i>
                    </strong>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <strong className='text-success'>
                      {order.deliveredAt.substring(0, 10)}
                    </strong>
                  ) : (
                    <strong className='text-danger'>
                      {' '}
                      <i className='fas fa-times'></i>
                    </strong>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className='btn-sm' variant='light'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Col>
  );
};

export default OrderListScreen;
