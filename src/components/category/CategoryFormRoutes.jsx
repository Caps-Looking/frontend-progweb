import React from 'react'
import { Route } from "react-router-dom";

import CategoryForm from '../category/CategoryForm';

export default route => (

    <div className="col-10">
        <Route exact path="/categories/form" component={CategoryForm} />      
        <Route exact path="/categories/form/:id" component={CategoryForm} />
        <Route path="/categories/form/:id/:edit" component={CategoryForm} />      
    </div>
    
);