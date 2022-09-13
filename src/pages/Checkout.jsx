import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class Checkout extends React.Component {
  state = {
    cartProducts: [],
    name: '',
    email: '',
    cep: '',
    phoneNumber: '',
    cpf: '',
    adress: '',
    paymentOptions: '',
    error: false,
    redirect: false,
  };

  componentDidMount() {
    this.updateState();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const {
      name, adress, email, phoneNumber, cpf, cep, paymentOptions } = this.state;

    if (name && adress && email && phoneNumber && cpf && cep && paymentOptions) {
      localStorage.removeItem('cartProduct');
      this.setState({
        redirect: true,
      });
    } else {
      this.setState({
        error: true,
      });
    }
  };

  updateState = () => {
    const cartProductStorage = JSON.parse(localStorage.getItem('cartProduct'));
    this.setState({
      cartProducts: cartProductStorage,
    });
  };

  render() {
    const { cartProducts,
      name, adress, email, phoneNumber, cpf, cep, redirect, error } = this.state;

    const filteredCart = cartProducts.reduce((acc, current) => {
      const verify = acc.find((product) => product.id === current.id);
      if (!verify) {
        return acc.concat([current]);
      }
      return acc;
    }, []);

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Link
          to="/"
        >
          Voltar para pagina inicial
        </Link>
        <Link
          to="/Cart"
          data-testid="shopping-cart-button"
        >
          Carrinho
        </Link>
        {
          filteredCart.map((product) => (
            <div key={ product.id }>
              <img src={ product.thumbnail } alt="" />
              <p>{product.title}</p>
              <p>{product.price}</p>
              <p>
                {cartProducts.filter((prod) => prod.id === product.id).length}
              </p>
            </div>
          ))
        }
        <form action="">
          <label htmlFor="fullName">
            <input
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
              data-testid="checkout-fullname"
              id="fullName"
              placeholder="Nome Completo"
              required
            />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              data-testid="checkout-email"
              id="email"
              name="email"
              value={ email }
              placeholder="email"
              onChange={ this.handleChange }
              required
            />
          </label>
          <label htmlFor="cpf">
            <input
              type="text"
              name="cpf"
              data-testid="checkout-cpf"
              id="cpf"
              value={ cpf }
              placeholder="cpf"
              onChange={ this.handleChange }
              required
            />
          </label>
          <label htmlFor="cellPhoneNumber">
            <input
              type="text"
              name="phoneNumber"
              data-testid="checkout-phone"
              id="cellPhoneNumber"
              value={ phoneNumber }
              placeholder="Número de celular"
              onChange={ this.handleChange }
              required
            />
          </label>
          <label htmlFor="cep">
            <input
              type="text"
              name="cep"
              data-testid="checkout-cep"
              id="cep"
              value={ cep }
              placeholder="CEP"
              onChange={ this.handleChange }
              required
            />
          </label>
          <label htmlFor="adress">
            <input
              type="text"
              name="adress"
              value={ adress }
              data-testid="checkout-address"
              id="adress"
              placeholder="Endereço"
              onChange={ this.handleChange }
              required
            />
          </label>
          <br />
          <br />
          <label htmlFor="boleto">
            Boleto
            <input
              id="boleto"
              type="radio"
              value="boleto"
              onChange={ this.handleChange }
              name="paymentOptions"
              data-testid="ticket-payment"
            />
          </label>
          <label htmlFor="visa">
            Visa
            <input
              id="visa"
              type="radio"
              value="visa"
              name="paymentOptions"
              data-testid="visa-payment"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="masterCard">
            MasterCard
            <input
              id="masterCard"
              type="radio"
              value="masterCard"
              name="paymentOptions"
              data-testid="master-payment"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="Elo">
            Elo
            <input
              id="Elo"
              type="radio"
              name="paymentOptions"
              data-testid="elo-payment"
              value="elo"
              onChange={ this.handleChange }
              required
            />
          </label>
          <button
            type="submit"
            data-testid="checkout-btn"
            onClick={ this.handleClick }
          >
            Finalizar

          </button>
          {
            error && <p data-testid="error-msg">Campos inválidos</p>
          }
        </form>

      </div>
    );
  }
}
