import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  state = {
    search: '',
    listSearchResults: [],
    buttonIsClicked: false,
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { search } = this.state;
    const response = await getProductsFromCategoryAndQuery('', search);
    this.setState({
      listSearchResults: response.results,
      buttonIsClicked: true,
    });
  };

  render() {
    const { search, listSearchResults, buttonIsClicked } = this.state;
    let searchProducts;
    if (listSearchResults.length > 0) {
      searchProducts = (
        <div>
          {
            listSearchResults.map((product) => (
              <div key={ product.id } data-testid="product">
                <h4>
                  { product.title }
                </h4>
                <img src={ product.thumbnail } alt={ product.title } />
                <p>
                  { product.price }
                </p>
              </div>
            ))
          }
        </div>);
    } else if (listSearchResults.length === 0 && buttonIsClicked === true) {
      searchProducts = (
        <div>
          <h2>Nenhum produto foi encontrado</h2>
        </div>
      );
    } else {
      searchProducts = (
        <div>
          <h2 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h2>
        </div>
      );
    }
    return (
      <div>
        <header>
          <Link
            to="/Cart"
            data-testid="shopping-cart-button"
          >
            Carrinho
          </Link>
        </header>
        <input
          data-testid="query-input"
          type="text"
          value={ search }
          onChange={ this.handleChange }
          name="search"
          placeholder="Digite algum produto"
        />
        <button data-testid="query-button" type="button" onClick={ this.handleClick }>
          Pesquisar
        </button>
        { searchProducts }
      </div>
    );
  }
}

export default Home;
