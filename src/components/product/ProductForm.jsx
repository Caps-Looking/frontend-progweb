import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, FormGroup, Button, Row, Col } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';

const URL = 'http://localhost:8080/v1';

export default class ProductForm extends Component {

    constructor(props) {
        super(props);

        let params = this.props.match.params;

        this.state = {
            product: {
                id: null,
                name: '',
                brand: '',
                description: '',
                price: '',
                category: {},
                image: ''
            },
            categories: [],
            file: '',
            imagePreviewUrl: '',
            edit: params.edit === undefined && params.id !== undefined
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getById = this.getById.bind(this);

        this._handleImageChange = this._handleImageChange.bind(this);

        this.redirectToEdit = this.redirectToEdit.bind(this);
        this.genericChange = this.genericChange.bind(this);

        if (this.props.match.params.id !== undefined) {
            this.getById(this.props.match.params.id);
        }

        this.getCategories();
    }

    getCategories() {
        axios.get(`${URL}/category`)
            .then(response => this.setState({ ...this.state, categories: response.data.data }));
    }

    handleSubmit(event, errors, values) {
        if (errors.length === 0) {
            axios.post(`${URL}/product`, this.state.product)
                .then(resp => this.props.history.push('/products'));
        }
    }

    getById(id) {
        axios.get(`${URL}/product/${id}`)
            .then(response => {
                this.setState({ ...this.state, product: response.data.data, imagePreviewUrl: 'data:image/jpeg;base64,' + response.data.data.image });
            });
    }

    redirectToEdit() {
        this.props.history.push(`/products/form/${this.state.product.id}/edit`);
    }

    renderSelectCategories() {
        return this.state.categories.map(
            (category, index) => (
                <option key={index} value={category.id}>
                    {category.name}
                </option>
            )
        );
    }

    genericChange(index, value) {
        let { product } = this.state;
        product[index] = value;
        this.setState({ product });
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
                product: {
                    id: this.state.product.id,
                    name: this.state.product.name,
                    brand: this.state.product.brand,
                    description: this.state.product.description,
                    price: this.state.product.price,
                    category: this.state.product.category,
                    image: reader.result.replace(/^data:image\/[a-z]+;base64,/, "")
                }
            });
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} style={{ textAlign: 'center', margin: '5px 15px', height: '200px', width: '400px' }} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        return (
            <div>
                <header className="page-header">
                    <h1>Products </h1>
                </header>
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem><a href="#/products">Products</a></BreadcrumbItem>
                        <BreadcrumbItem active>Form</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <AvForm onSubmit={this.handleSubmit}>
                    <Row>
                        <Col md="6">
                            <AvField name="name"
                                label="Name"
                                placeholder="Enter the Product Name"
                                maxLength="15"
                                value={this.state.product.name}
                                onChange={(event, value) => this.genericChange("name", value)}
                                required
                                disabled={this.state.edit}
                            />
                        </Col>
                        <Col md="6">
                            <AvField name="brand"
                                label="Brand"
                                placeholder="Enter the Product Brand"
                                maxLength="15"
                                value={this.state.product.brand}
                                onChange={(event, value) => this.genericChange("brand", value)}
                                required
                                disabled={this.state.edit}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <AvField name="price"
                                label="Price"
                                placeholder="Enter the Product Price"
                                maxLength="15"
                                value={this.state.product.price}
                                onChange={(event, value) => this.genericChange("price", value)}
                                required
                                disabled={this.state.edit}
                            />
                        </Col>
                        <Col md="6">
                            <AvField name="category"
                                type="select"
                                label="Category"
                                maxLength="15"
                                value={this.state.product.category ? this.state.product.category.id : ''}
                                onChange={(event, value) => this.genericChange("category", this.state.categories.filter(category => category.id == value)[0])}
                                disabled={this.state.edit}
                                required
                            >
                                <option value="">Select</option>
                                {this.renderSelectCategories()}
                            </AvField>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <AvField name="description"
                                label="Description"
                                placeholder="Enter the Product Description"
                                maxLength="50"
                                value={this.state.product.description}
                                onChange={(event, value) => this.genericChange("description", value)}
                                required
                                disabled={this.state.edit}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <AvField name="image"
                                label="Image"
                                type="file"
                                onChange={(e) => this._handleImageChange(e)}
                                required
                            />
                        </Col>
                    </Row>
                    <Row className="ml-5 mt-3 mb-5">
                        <Col>
                            {$imagePreview}
                        </Col>
                    </Row>

                    <FormGroup>
                        <Button href="#/products" color="secondary">Cancel</Button>{' '}
                        <Button hidden={this.state.edit} outline color="success" type="submit">Submit</Button>{' '}
                        <Button hidden={!this.state.edit} outline className="btn-purple" onClick={this.redirectToEdit}>Edit</Button>{' '}
                    </FormGroup>
                </AvForm>
            </div>
        );
    }

}
