import React from 'react';

class Home extends React.Component {
  state = {
    search: '',
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
    const { search } = this.state;
    return (
      <div>
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
