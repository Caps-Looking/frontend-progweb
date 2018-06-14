import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import Store from '../Store';
import { observer } from 'mobx-react';

export default observer(
    class Cart extends Component {

        constructor(props) {
            super(props);

            this.state = {
                products: localStorage.getItem("cart") != null ?
                    JSON.parse(localStorage.getItem("cart")) :
                    {
                        items: [],
                        totalPrice: 0,
                        totalItems: 0
                    }
            }

            this.renderList = this.renderList.bind(this);
            this.removeItem = this.removeItem.bind(this);
            this.removeAll = this.removeAll.bind(this);
            this.addProductToCard = this.addProductToCard.bind(this);
        }

        removeItem(id) {
            let remove = false;
            let price = 0;
            let productsStorage = {
                items: [],
                totalPrice: 0,
                totalItems: 0
            };
            this.state.products.items.forEach(item => {
                if (item.product.id === id) {
                    price = item.product.price;
                    if (item.amount > 1) {
                        item.amount--;
                        return;
                    } else {
                        remove = true;
                        return;
                    }
                }
            });

            productsStorage.totalPrice = this.state.products.totalPrice - price;
            productsStorage.totalItems = this.state.products.totalItems - 1;

            if (remove) {
                productsStorage.items = this.state.products.items.filter(item => item.product.id !== id);
                this.setState({
                    ...this.state,
                    products: {
                        items: this.state.products.items.filter(item => item.product.id !== id),
                        totalPrice:  productsStorage.totalPrice,
                        totalItems: productsStorage.totalItems
                    }
                });
            } else {
                productsStorage.items = this.state.products.items;
                this.setState({
                    ...this.state,
                    products: {
                        items: this.state.products.items,
                        totalPrice:  productsStorage.totalPrice,
                        totalItems: productsStorage.totalItems
                    }
                });
            }

            Store.cart.totalItems = productsStorage.totalItems;
            Store.cart.totalPrice = productsStorage.totalPrice;
            localStorage.setItem("cart", JSON.stringify(productsStorage));
        }

        addProductToCard(product) {
            let productsStorage;
            let id = product.id;
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

            let findOne = this.state.products.items.filter(item => item.product.id === id);
            findOne[0].amount = findOne[0].amount + 1;

            let stateList = this.state.products.items.filter(item => item.product.id !== id);
            stateList.push(findOne[0]);

            this.setState({
                ...this.state,
                products: {
                    items: stateList,
                    totalPrice:  productsStorage.totalPrice,
                    totalItems: productsStorage.totalItems
                }
            });

            Store.cart.totalItems = productsStorage.totalItems;
            Store.cart.totalPrice = productsStorage.totalPrice;

            localStorage.setItem("cart", JSON.stringify(productsStorage));
        }

        removeAll(item) {
            let id = item.product.id;
            let totalPrice = Store.cart.totalPrice;
            let totalItems = Store.cart.totalItems;

            let productsStorage = {
                items: [],
                totalPrice: 0,
                totalItems: 0
            };

            Store.cart.totalPrice = totalPrice - (item.amount * item.product.price);
            Store.cart.totalItems = totalItems - item.amount;

            productsStorage.items = this.state.products.items.filter(item => item.product.id !== id);
            this.setState({
                ...this.state,
                products: {
                    items: this.state.products.items.filter(item => item.product.id !== id),
                    totalPrice: Store.cart.totalPrice,
                    totalItems: Store.cart.totalItems - 1
                }
            });

            localStorage.setItem("cart", JSON.stringify(productsStorage));           
        }

        renderList() {
            if (this.state.products.items) {
                return this.state.products.items.map(
                    item => {
                        return (
                            <ListGroupItem key={item.product.id} className="mb-2 d-flex justify-content-between">
                                <div>
                                    <strong>Product:</strong> {item.product.name} <br />
                                    <strong>Brand:</strong> {item.product.brand} <br />
                                    <strong>Description:</strong> {item.product.description}
                                </div>
                                <div className="row mr-2">
                                    <div className="mr-5 mt-3">
                                        <strong>Price: </strong>R$ {item.product.price} <br />
                                        <strong>Amount: </strong>
                                        <Button outline color="danger" onClick={() => this.removeItem(item.product.id)} className="btn-sm mr-2"><i className="fa fa-minus"></i></Button>
                                        {item.amount}
                                        <Button outline color="success" onClick={() => this.addProductToCard(item.product)} className="btn-sm ml-2"><i className="fa fa-plus"></i></Button>
                                    </div>
                                    <div className="ml-5 mt-3">
                                        <Button outline color="danger" onClick={() => this.removeAll(item)} className="btn-md"><i className="fa fa-trash"></i></Button>{' '}
                                    </div>
                                </div>
                            </ListGroupItem>
                        )
                    }
                );
            }
        }

        render() {
            return (
                <div>
                    <div className="d-flex justify-content-between">
                        <h1>Your Cart</h1>
                        <div className="row">
                            <h5 className="mt-3 mr-5">Total Price: R$ {Store.cart.totalPrice}</h5>
                            <h5 className="mt-3 mr-4">Total Items: {Store.cart.totalItems}</h5>
                        </div>
                    </div>
                    <ListGroup>
                        {this.renderList()}
                    </ListGroup>

                </div>
            );
        }

    });