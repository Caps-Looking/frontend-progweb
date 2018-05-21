import React from 'react'
import { Route } from "react-router-dom";

import Category from '../category/Category';
import CategoryFormRoutes from './CategoryFormRoutes';

export default route => (

    <div className="col-10">
        <Route exact path="/categories" component={Category} />
        <Route path="/categories/form" component={CategoryFormRoutes} />
    </div>
    
);