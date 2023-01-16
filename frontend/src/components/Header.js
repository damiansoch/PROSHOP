import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { Link, useNavigate } from 'react-router-dom';

import { logout } from '../actions/userAction';

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand>
            <Link to='/'> ProShop</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Link to={'/cart'} className='mx-3 my-auto'>
                <i className='fas fa-shopping-cart me-1'></i>Cart
              </Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <NavDropdown.Item
                    onClick={() => {
                      navigate('/profile');
                    }}
                  >
                    Profile
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={logoutHandler}>
                    {' '}
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to={'/login'} className='ms-3'>
                  <i className='fas fa-user me-1'></i>
                  SignIn
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
