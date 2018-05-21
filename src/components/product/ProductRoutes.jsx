import React from 'react'
import { Route } from "react-router-dom";

import Product from '../product/Product';
import ProductFormRoutes from './ProductFormRoutes';

export default route => (

    <div className="col-10">
        <Route exact path="/products" component={Product} />
        <Route path="/products/form" component={ProductFormRoutes} />
    </div>
    
);