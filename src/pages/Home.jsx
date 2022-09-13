import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import addProductToCart from '../services/generalFunctions';

class Home extends React.Component {
  state = {
    search: '',
    listSearchResults: [],
    buttonIsClicked: false,
    listOfCategories: [],
    categorieValue: '',
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
    const { search, categorieValue } = this.state;
    const response = await getProductsFromCategoryAndQuery(categorieValue, search);
    this.setState({
      listSearchResults: response.results,
      buttonIsClicked: true,
      search: '',
    });
  };

  handleChangeCategorie = async ({ target }) => {
    const { value } = target;
    const { search } = this.state;
    const response = await getProductsFromCategoryAndQuery(value, search);
    this.setState({
      listSearchResults: response.results,
      search: '',
      categorieValue: value,
    });
  };

  render() {
    const { search,
      listSearchResults,
      buttonIsClicked,
      listOfCategories,
    } = this.state;

    let searchProducts;

    if (listSearchResults.length > 0) {
      searchProducts = (
        <div>
          {
            listSearchResults.map((product) => (
              <div key={ product.id }>
                <Link
                  to={ `/product/${product.id}` }
                  data-testid="product-detail-link"
                >
                  <div data-testid="product">
                    <h4>
                      { product.title }
                    </h4>
                    <img src={ product.thumbnail } alt={ product.title } />
                    <p>
                      { product.price }
                    </p>
                  </div>
                </Link>
                <div>
                  <button
                    data-testid="product-add-to-cart"
                    type="button"
                    onClick={ () => addProductToCart(product) }
                  >
                    adicionar ao carrinho
                  </button>
                </div>
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
                  <label
                    htmlFor={ categorie.name }
                    data-testid="category"
                  >
                    <input
                      id={ categorie.name }
                      type="radio"
                      value={ categorie.id }
                      name="categorieValue"
                      onChange={ this.handleChangeCategorie }
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
