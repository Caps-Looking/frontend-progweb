import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Table, Button } from 'reactstrap';
import axios from 'axios';

import CategoryDeleteModal from './CategoryDeleteModal';

const URL = 'http://localhost:8080/v1';

export default class Category extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categoryList: [],
            modal: false,
            categorySelected: {}
        }

        this.getCategories();

        this.toggle = this.toggle.bind(this);
        this.delete = this.delete.bind(this);
    }

    getCategories() {
        axios.get(`${URL}/category`)
            .then(response => this.setState({ ...this.state, categoryList: response.data.data }));
    }

    renderRows() {
        return this.state.categoryList.map(
            category => (
                <tr key={category.id} className="text-center">
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                        <Button outline className="btn-sm btn-purple" href={`#/categories/form/${category.id}/edit`}><i className="fa fa-pencil"></i></Button>{' '}
                        <Button outline className="btn-sm btn-purple" href={`#/categories/form/${category.id}`}><i className="fa fa-eye"></i></Button>{' '}
                        <Button outline color="danger" onClick={() => this.toggle(category)} className="btn-sm"><i className="fa fa-trash"></i></Button>{' '}
                    </td>
                </tr>
            )
        );
    }

    toggle(category) {
        this.setState({
            modal: !this.state.modal,
            categorySelected: category
        });
    }

    delete() {        
        axios.delete(`${URL}/category/${this.state.categorySelected.id}`)
            .then(response => {
                this.getCategories();
                this.toggle({});
            });
    }

    render() {
        return (
            <div>
                <header className="page-header">
                    <h1>Categories <Button outline className="btn-purple" href="#/categories/form">New</Button></h1>
                </header>
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem active>Categories</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <Table hover size="sm">
                    <thead style={{ backgroundColor: '#6D71EF', color: 'white' }}>
                        <tr className="text-center">
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </Table>

                <CategoryDeleteModal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    category={this.state.categorySelected}
                    delete={this.delete}
                />

            </div>
        );
    }

}