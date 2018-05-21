import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Table, Button } from 'reactstrap';
import axios from 'axios';

import ProductDeleteModal from './ProductDeleteModal';

const URL = 'http://localhost:8080/v1';

export default class Product extends Component {

    constructor(props) {
        super(props);

        this.state = {
            productList: [],
            modal: false,
            productSelected: {}
        }

        this.getProducts();

        this.toggle = this.toggle.bind(this);
        this.delete = this.delete.bind(this);
    }

    getProducts() {
        axios.get(`${URL}/product`)
            .then(response => this.setState({ ...this.state, productList: response.data.data }));
    }

    renderRows() {
        return this.state.productList.map(
            product => (
                <tr key={product.id} className="text-center">
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <td>R$ {product.price}</td>
                    <td>
                        <Button outline className="btn-sm btn-purple" href={`#/products/form/${product.id}/edit`}><i className="fa fa-pencil"></i></Button>{' '}
                        <Button outline className="btn-sm btn-purple" href={`#/products/form/${product.id}`}><i className="fa fa-eye"></i></Button>{' '}
                        <Button outline color="danger" onClick={() => this.toggle(product)} className="btn-sm"><i className="fa fa-trash"></i></Button>{' '}
                    </td>
                </tr>
            )
        );
    }

    toggle(product) {
        this.setState({
            modal: !this.state.modal,
            productSelected: product
        });
    }

    delete() {
        axios.delete(`${URL}/product/${this.state.productSelected.id}`)
            .then(() => {
                this.getProducts();
                this.toggle({});
            });
    }

    render() {
        return (
            <div>
                <header className="page-header">
                    <h1>Products <Button outline className="btn-purple" href="#/products/form">New</Button></h1>
                </header>
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem active>Products</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <Table hover size="sm">
                    <thead style={{ backgroundColor: '#6D71EF', color: 'white' }}>
                        <tr className="text-center">
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Price</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </Table>

                <ProductDeleteModal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    product={this.state.productSelected}
                    delete={this.delete}
                />

            </div>
        );
    }

}