import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import addProductToCart from '../services/generalFunctions';

class Product extends React.Component {
  state = {
    name: '',
    img: '',
    price: '',
    id: '',
    formEmail: '',
    formRating: '',
    formComment: '',
    error: false,
    avaliations: [],
  };

  componentDidMount() {
    this.getProduct();
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    let avaliationStorage = [];
    if (Object.prototype.hasOwnProperty.call(localStorage, `${id}`)) {
      avaliationStorage = JSON.parse(localStorage.getItem(`${id}`));
    }
    this.setState({
      avaliations: avaliationStorage,
    });
  }

  getProduct = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const product = await getProductById(id);
    const vitalInfo = {
      price: product.price,
      title: product.title,
      thumbnail: product.thumbnail,
      id: product.id,
    };
    this.setState({
      name: product.title,
      img: product.thumbnail,
      price: product.price,
      id: product.id,
      product: vitalInfo,
    });
  };

  handleClick = (product) => {
    addProductToCart(product);
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  onClickForm = () => {
    const {
      formEmail,
      formRating,
      formComment,
      id,
    } = this.state;

    const validateEmail = (email) => email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if (formRating && validateEmail(formEmail)) {
      let avaliationStorage = [];
      if (Object.prototype.hasOwnProperty.call(localStorage, `${id}`)) {
        avaliationStorage = JSON.parse(localStorage.getItem(`${id}`));
      }
      avaliationStorage.push({
        email: formEmail,
        text: formComment,
        rating: formRating,
      });
      localStorage.setItem(`${id}`, JSON.stringify(avaliationStorage));
      this.setState({
        error: false,
        avaliations: avaliationStorage,
        formEmail: '',
        formRating: '',
        formComment: '',
      });
    } else {
      this.setState({
        error: true,
      });
    }
  };

  render() {
    const {
      name,
      img,
      price,
      product,
      formEmail,
      formComment,
      error,
      avaliations,
    } = this.state;

    const ratings = [];
    const max = 6;
    for (let i = 1; i < max; i += 1) {
      ratings.push(
        (
          <label htmlFor={ i } key={ i }>
            { i }
            <input
              id={ i }
              type="radio"
              value={ i }
              name="formRating"
              onChange={ this.handleChange }
              data-testid={ `${i}-rating` }
            />
          </label>),
      );
    }
    return (
      <div>
        <Link
          to="/"
        >
          Voltar para pagina incial
        </Link>
        <Link
          to="/Cart"
          data-testid="shopping-cart-button"
        >
          Carrinho
        </Link>
        <h3 data-testid="product-detail-name">{ name }</h3>
        <img src={ img } alt="foto do produto" data-testid="product-detail-image" />
        <h4 data-testid="product-detail-price">{` R$${price} `}</h4>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.handleClick(product) }
        >
          Adicionar ao carrinho

        </button>

        <form>
          <input
            type="email"
            data-testid="product-detail-email"
            placeholder="Email"
            value={ formEmail }
            name="formEmail"
            onChange={ this.handleChange }
          />
          {
            ratings.map((elem) => elem)
          }
          <textarea
            placeholder="Mensagem (opcional)"
            data-testid="product-detail-evaluation"
            value={ formComment }
            name="formComment"
            onChange={ this.handleChange }
          />
          <button
            data-testid="submit-review-btn"
            type="button"
            onClick={ this.onClickForm }
          >
            Avaliar
          </button>
          {
            error && <p data-testid="error-msg">Campos inválidos</p>
          }
        </form>
        <section>
          {
            avaliations.map((avaliation, index) => (
              <div key={ index }>
                <p data-testid="review-card-email">{avaliation.email}</p>
                <p data-testid="review-card-rating">{`Nota: ${avaliation.rating}`}</p>
                <p data-testid="review-card-evaluation">{avaliation.text}</p>
              </div>
            ))
          }
        </section>
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
