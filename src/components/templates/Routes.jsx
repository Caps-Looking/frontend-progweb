import React from 'react'
import { Route } from "react-router-dom";

import Dashboard from '../dashboard/Dashboard';
import CategoryRoutes from '../category/CategoryRoutes'
import ProductRoutes from '../product/ProductRoutes';
import Cart from '../cart/Cart';

export default route => (

    <div className="col-10" style={{marginLeft: '16%'}}>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="/categories" component={CategoryRoutes} />
        <Route path="/products" component={ProductRoutes} />
        <Route path="/cart" component={Cart} />
    </div>
    
);