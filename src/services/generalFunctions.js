export default function addProductToCart(product) {
  let productsStorage = [];

  const { price, title, thumbnail, id } = product;

  if (Object.prototype.hasOwnProperty.call(localStorage, 'cartProduct')) {
    productsStorage = JSON.parse(localStorage.getItem('cartProduct'));
  }

  productsStorage.push({ price, title, thumbnail, id });
  // Seta no localStorage o valor do array atualizado
  localStorage.setItem('cartProduct', JSON.stringify(productsStorage));
}
