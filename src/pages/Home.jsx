import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';

class Home extends React.Component {
  state = {
    search: '',
    listSearchResults: [],
    buttonIsClicked: false,
    listOfCategories: [],
  };

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    const categories = await getCategories();
    this.setState({
      listOfCategories: categories,
    });
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
    const { search, listSearchResults, buttonIsClicked, listOfCategories } = this.state;
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
        <aside>
          <h4>Categorias:</h4>
          <ul>
            {
              listOfCategories.map((categorie) => (
                <li key={ categorie.id }>
                  <label htmlFor={ categorie.name } data-testid="category">
                    <input
                      type="radio"
                      value={ categorie.name }
                      name="categoria"
                    />
                    {' '}
                    {categorie.name}
                  </label>

                </li>))
            }
          </ul>
        </aside>
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
