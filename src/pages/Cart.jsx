import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

export default class Cart extends React.Component {
  state = {
    cartProducts: [],
  };

  componentDidMount() {
    const cartProductStorage = JSON.parse(localStorage.getItem('cartProduct'));
    if (cartProductStorage) {
      this.setState({
        cartProducts: cartProductStorage,
      });
    }
  }

  // teste
  render() {
    const { cartProducts } = this.state;

    const filteredCart = cartProducts.reduce((acc, current) => {
      const verify = acc.find((product) => product.id === current.id);
      if (!verify) {
        return acc.concat([current]);
      }
      return acc;
    }, []);

    let resultCart;

    if (cartProducts.length > 0) {
      resultCart = (
        <div>
          {
            filteredCart.map((product) => (
              <div key={ product.id } data-testid="product">
                <h4 data-testid="shopping-cart-product-name">
                  { product.title }
                </h4>
                <img src={ product.thumbnail } alt={ product.title } />
                <p>
                  { product.price }
                </p>
                <p data-testid="shopping-cart-product-quantity">
                  {cartProducts.filter((prod) => prod.id === product.id).length}
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
