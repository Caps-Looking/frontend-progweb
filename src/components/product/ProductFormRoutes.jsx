import React from 'react'
import { Route } from "react-router-dom";

import ProductForm from '../product/ProductForm';

export default route => (

    <div className="col-10">
        <Route exact path="/products/form" component={ProductForm} />      
        <Route exact path="/products/form/:id" component={ProductForm} />
        <Route path="/products/form/:id/:edit" component={ProductForm} />      
    </div>
    
);