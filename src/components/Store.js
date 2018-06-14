import { observable } from 'mobx';

class Store {

    cart = observable(JSON.parse(localStorage.getItem("cart")));

}

export default new Store();