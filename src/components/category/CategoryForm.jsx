import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, FormGroup, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';

const URL = 'http://localhost:8080/v1';

export default class CategoryForm extends Component {

    constructor(props) {
        super(props);

        let params = this.props.match.params;

        this.state = {
            category: {
                id: null,
                name: ''
            },
            edit: (params.edit === undefined && params.id !== undefined) || false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getById = this.getById.bind(this);

        this.redirectToEdit = this.redirectToEdit.bind(this);

        if (this.props.match.params.id !== undefined) {
            this.getById(this.props.match.params.id);
        }
    }

    handleChange(e) {
        this.setState( {...this.state, category: { id: this.state.category.id, name: e.target.value }, edit: this.state.edit });
    }

    handleSubmit() {
        axios.post(`${URL}/category`, this.state.category)
            .then(resp => this.props.history.push('/categories'));
    }

    getById(id) {
        axios.get(`${URL}/category/${id}`)
            .then(response => this.setState({ ...this.state.category, category: response.data.data, edit: this.state.edit }));
    }

    redirectToEdit() {
        this.props.history.push(`/categories/form/${this.state.category.id}/edit`);
    }

    render() {
        return (
            <div>
                <header className="page-header">
                    <h1>Categories</h1>
                </header>
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem><a href="#/categories">Categories</a></BreadcrumbItem>
                        <BreadcrumbItem active>Form</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <AvForm>
                    <AvField name="name"
                        label="Name"
                        className="col-6"
                        placeholder="Enter the Category Name"
                        maxLength="15"
                        value={this.state.category.name}
                        onChange={this.handleChange}
                        required
                        disabled={this.state.edit}
                    />

                    <FormGroup>
                        <Button href="#/categories" color="secondary">Cancel</Button>{' '}
                        <Button hidden={this.state.edit} outline color="success" onClick={this.handleSubmit}>Submit</Button>{' '}
                        <Button hidden={!this.state.edit} outline className="btn-purple" onClick={this.redirectToEdit}>Edit</Button>{' '}
                    </FormGroup>
                </AvForm>
            </div>
        );
    }

}
