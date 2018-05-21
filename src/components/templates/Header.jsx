import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavLink } from 'reactstrap';
import Store from '../Store';
import { observer } from 'mobx-react';

var HeaderComponent = observer(
    class Header extends Component {

        countCartProducts() {
            return localStorage.getItem("cart") != null ? JSON.parse(localStorage.getItem("cart")).totalItems : 0;
        }
    
        isPathActive(path) {
            return this.props.location.pathname.startsWith(path);
        }
    
        render() {
            return (
                <div>
                    <Navbar color="dark" dark expand="md" style={{ width: '100%' }} fixed="top">
                        <NavbarBrand href="/">MyBrand</NavbarBrand>
                        <Nav className="ml-auto" navbar>
                            <NavLink className={this.isPathActive('/cart') ? 'active' : ''}
                                href="#/cart">
                                <div>
                                    <i className="fa fa-shopping-cart fa-2x"></i>
                                    <strong className="fa-stack ml-2">{Store.cart.totalItems}</strong>
                                </div>
                            </NavLink>
                        </Nav>
                    </Navbar>
                </div >
            );
        }
    }    
);

export default withRouter(HeaderComponent);