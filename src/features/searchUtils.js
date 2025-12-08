import productList from '../assets/data/products.json';

export const searchProducts = (query) => {
  if (!query.trim()) {
    return [];
  }

  const lowerQuery = query.toLowerCase().trim();

  return productList.products.filter(product => {
    const name = product.name.toLowerCase();
    const description = product.description.toLowerCase();
    const category = product.category.toLowerCase();

    return (
      name.includes(lowerQuery) ||
      description.includes(lowerQuery) ||
      category.includes(lowerQuery)
    );
  });
};

export const filterByCategory = (products, category) => {
  if (!category || category === 'all') {
    return products;
  }
  return products.filter(product => product.category === category);
};
