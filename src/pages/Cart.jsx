import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

export default class Cart extends React.Component {
  render() {
    return (
      <div>
        <Link
          to="/"
        >
          Voltar para pagina incial
        </Link>
        <div data-testid="shopping-cart-empty-message"> Seu carrinho está vazio!!!! </div>
      </div>
    );
  }
}

// Cart.propTypes = {
//   // cart: PropTypes.arrayOf(PropTypes.shape()).isRequired,
// };
