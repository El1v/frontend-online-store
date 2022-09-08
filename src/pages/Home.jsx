import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class Home extends React.Component {
  state = {
    search: '',
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

  handleClick = () => {
    console.log('teste');
  };

  render() {
    const { search, listOfCategories } = this.state;
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
          type="text"
          value={ search }
          onChange={ this.handleChange }
          name="search"
          placeholder="Digite algum produto"
        />
        <button type="button" onClick={ this.handleClick }>
          Pesquisar
        </button>
        <h3
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>
      </div>
    );
  }
}

export default Home;
