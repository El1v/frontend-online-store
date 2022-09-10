import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

export default class Cart extends React.Component {
  state = {
    cartProducts: [],
  };

  componentDidMount() {
    const cartProductStorage = JSON.parse(localStorage.getItem('cartProduct'));
    // const cartProductStorage = JSON.parse(localStorage.getItem('cartProduct'));
    if (cartProductStorage) {
      this.setState({
        cartProducts: cartProductStorage,
      });
    }
  }

  render() {
    const { cartProducts } = this.state;

    let resultCart;

    if (cartProducts.length > 0) {
      resultCart = (
        <div>
          {
            cartProducts.map((product) => (
              <div key={ product.id } data-testid="product">
                <h4 data-testid="shopping-cart-product-name">
                  { product.title }
                </h4>
                <img src={ product.thumbnail } alt={ product.title } />
                <p>
                  { product.price }
                </p>
                {/* <button
                type="button"
                onClick={ () => this.addProductToCart(product) }
              >
                adicionar ao carrinho
              </button> */}
              </div>
            ))
          }
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
          Voltar para pagina incial
        </Link>
        { resultCart }
      </div>
    );
  }
}

// Cart.propTypes = {
//   // cart: PropTypes.arrayOf(PropTypes.shape()).isRequired,
// };
