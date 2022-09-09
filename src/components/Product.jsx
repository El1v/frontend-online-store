import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class Product extends React.Component {
  state = {
    name: '',
    img: '',
    price: '',
  };

  componentDidMount() {
    this.getProduct();
  }

  getProduct = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const product = await getProductById(id);
    this.setState({
      name: product.title,
      img: product.thumbnail,
      price: product.price,
    });
  };

  render() {
    const { name, img, price } = this.state;
    return (
      <div>
        <Link to="/Cart" data-testid="shopping-cart-button">Carrinho</Link>
        <h3 data-testid="product-detail-name">{ name }</h3>
        <img src={ img } alt="foto do produto" data-testid="product-detail-image" />
        <h4 data-testid="product-detail-price">{` R$${price} `}</h4>
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Product;
