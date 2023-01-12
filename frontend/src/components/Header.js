import React from 'react';

import { Container, Nav, Navbar } from 'react-bootstrap';

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand>
            <Link to='/homeScreen'> ProShop</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Link to={'/cart'} className='ms-3'>
                <i className='fas fa-shopping-cart me-1'></i>Cart
              </Link>
              <Link to={'/login'} className='ms-3'>
                <i className='fas fa-user me-1'></i>
                SignIn
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
