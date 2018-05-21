import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardImg, CardBody, CardText, Button } from 'reactstrap';
import Store from '../Store';
import { observer } from 'mobx-react';

const URL = 'http://localhost:8080/v1';

export default observer(
    class Dashboard extends Component {

        constructor(props) {
            super(props);

            this.state = {
                productList: []
            }

            this.getProducts();
        }

        getProducts() {
            axios.get(`${URL}/product`)
                .then(response => this.setState({ ...this.state, productList: response.data.data }));
        }

        addProductToCard(product) {
            let productsStorage;
            if (localStorage.getItem("cart") != null) {
                productsStorage = JSON.parse(localStorage.getItem("cart"));
            } else {
                productsStorage = {
                    items: [],
                    totalPrice: 0,
                    totalItems: 0
                }
            }

            let found = false;
            productsStorage.items.forEach(itemCart => {
                if (itemCart.product.id === product.id) {
                    itemCart.amount += 1;
                    found = true;
                    return;
                }
            });

            if (!found) {
                productsStorage.items.push({
                    product: product,
                    amount: 1
                });
            }

            productsStorage.totalItems += 1;
            productsStorage.totalPrice += product.price;

            Store.cart.totalItems = productsStorage.totalItems;

            localStorage.setItem("cart", JSON.stringify(productsStorage));
        }

        renderProductCards() {
            return this.state.productList.map(
                product => (
                    <Card key={product.id} className="mr-5 mb-5 ml-5">
                        <CardImg top style={{ maxWidth: '350px' }} src={require('../../assets/img/gandalf.gif')} alt="Card image cap" />
                        <CardBody>
                            <h3>{product.name} - <small>{product.brand}</small></h3>
                            <h4> <strong>R$ {product.price}</strong></h4>
                            <CardText>{product.description}</CardText>
                            <Button onClick={() => this.addProductToCard(product)} outline className="btn-lg btn-purple">
                                <i className="fa fa-shopping-cart"></i> Add to Cart
                            </Button>
                        </CardBody>
                    </Card>
                )
            );
        }

        render() {
            return (
                <div>
                    <h1>Dashboard</h1>

                    <div className="row mb-3">
                        {this.renderProductCards()}
                    </div>
                </div>
            );
        }

    }
);