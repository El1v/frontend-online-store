import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import addProductToCart from '../services/generalFunctions';
// import PropTypes from 'prop-types';

export default class Cart extends React.Component {
  state = {
    cartProducts: [],
    redirect: false,
  };

  componentDidMount() {
    this.updateState();
  }

  updateState = () => {
    const cartProductStorage = JSON.parse(localStorage.getItem('cartProduct'));
    if (cartProductStorage) {
      this.setState({
        cartProducts: cartProductStorage,
      });
    } else {
      this.setState({
        cartProducts: [],
      });
    }
  };

  decreaseQuantity = (product) => {
    const { cartProducts } = this.state;
    const quantity = cartProducts.filter((prod) => prod.id === product.id).length;

    if (quantity > 1) {
      const cartProductStorage = JSON.parse(localStorage.getItem('cartProduct'));
      const indexToRemove = cartProductStorage.slice().reverse().findIndex((element) => (
        element.id === product.id));

      cartProductStorage.splice(indexToRemove, 1);
      const cardProductStorageUpdated = cartProductStorage.reverse();
      localStorage.setItem('cartProduct', JSON.stringify(cardProductStorageUpdated));
      this.updateState();
    }
  };

  removeProductToCart = (product) => {
    const { cartProducts } = this.state;
    const filteredCart = cartProducts.filter((element) => element.id !== product.id);
    localStorage.setItem('cartProduct', JSON.stringify(filteredCart));
    this.updateState();
  };

  increaseQuantity = (product) => {
    addProductToCart(product);
    this.updateState();
  };

  clearCart = () => {
    localStorage.removeItem('cartProduct');
    this.updateState();
  };

  redirectClick = () => {
    this.setState({
      redirect: true,
    });
  };

  render() {
    const { cartProducts, redirect } = this.state;

    const filteredCart = cartProducts.reduce((acc, current) => {
      const verify = acc.find((product) => product.id === current.id);
      if (!verify) {
        return acc.concat([current]);
      }
      return acc;
    }, []);

    let resultCart;

    if (redirect) {
      return <Redirect to="/Payment" />;
    }

    if (cartProducts.length > 0) {
      resultCart = (
        <div>
          {
            filteredCart.map((product) => (
              <div key={ product.id } data-testid="product">
                <h4 data-testid="shopping-cart-product-name">
                  {product.title}
                </h4>
                <img src={ product.thumbnail } alt={ product.title } />
                <p>
                  {product.price}
                </p>
                <button
                  data-testid="product-increase-quantity"
                  type="button"
                  onClick={ () => this.increaseQuantity(product) }
                >
                  +

                </button>

                <p data-testid="shopping-cart-product-quantity">
                  {cartProducts.filter((prod) => prod.id === product.id).length}
                </p>

                <button
                  type="button"
                  data-testid="product-decrease-quantity"
                  onClick={ () => this.decreaseQuantity(product) }
                >
                  -

                </button>
                <button
                  type="button"
                  data-testid="remove-product"
                  onClick={ () => this.removeProductToCart(product) }
                >
                  Remover Produto

                </button>
              </div>
            ))
          }
          <button
            type="button"
            onClick={ this.clearCart }
          >
            Limpar Carrinho

          </button>
          <button
            type="button"
            data-testid="checkout-products"
            onClick={ this.redirectClick }
          >
            Finalizar Compra
          </button>
        </div>
      );
    } else {
      resultCart = (
        <div data-testid="shopping-cart-empty-message"> Seu carrinho está vazio!!!! </div>
      );
    }

    return (
      <div>
        <Link
          to="/"
        >
          Voltar para pagina inicial
        </Link>
        {resultCart}
      </div>
    );
  }
}

// Cart.propTypes = {
//   // cart: PropTypes.arrayOf(PropTypes.shape()).isRequired,
// };
