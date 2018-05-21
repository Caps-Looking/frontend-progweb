import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';

class SideBar extends Component {
    isPathActive(path) {
        return this.props.location.pathname.startsWith(path);
    }

    render() {
        return (
            <div className="col-2" style={{ backgroundColor: '#6D71EF', position: 'fixed', width: '25%', height: '100%' }}>
                <Nav vertical>
                    <NavItem>
                        <NavLink className={this.isPathActive('/dashboard') ? 'navbar-active' : 'navbar-inactive'} 
                            href="#/dashboard">
                            <i className="fa fa-tachometer"></i><span>Dashboard</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={this.isPathActive('/categories') ? 'navbar-active' : 'navbar-inactive'} 
                            href="#/categories">
                            <i className="fa fa-tags"></i><span>Categories</span>
                        </NavLink>
                        <NavLink className={this.isPathActive('/products') ? 'navbar-active' : 'navbar-inactive'} 
                            href="#/products">
                            <i className="fa fa-money"></i><span>Products</span>
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}

export default withRouter(SideBar);