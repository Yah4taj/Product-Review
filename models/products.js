const { v4: uuidv4 } = require('uuid');

let products = [
  {
    id: '1',
    name: 'Smartphone X',
    description: 'The latest smartphone with advanced features and high-resolution camera.',
    price: 799.99,
    category: 'electronics',
    featured: true,
    inStock: true,
    createdAt: '2023-03-10T14:22:00Z'
  },
  {
    id: '2',
    name: 'Wireless Earbuds',
    description: 'Premium wireless earbuds with noise cancellation and long battery life.',
    price: 149.99,
    category: 'electronics',
    featured: false,
    inStock: true,
    createdAt: '2023-03-15T09:45:00Z'
  },
  {
    id: '3',
    name: 'Coffee Maker Pro',
    description: 'Programmable coffee maker with thermal carafe and auto-brew function.',
    price: 89.99,
    category: 'home',
    featured: true,
    inStock: true,
    createdAt: '2023-03-20T11:30:00Z'
  }
];

const getAllProducts = (filters = {}) => {
  let filteredProducts = [...products];
  
  // Apply filters
  if (filters.category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category === filters.category
    );
  }
  
  if (filters.name) {
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(filters.name.toLowerCase())
    );
  }
  
  if (filters.minPrice) {
    filteredProducts = filteredProducts.filter(product => 
      product.price >= parseFloat(filters.minPrice)
    );
  }
  
  if (filters.maxPrice) {
    filteredProducts = filteredProducts.filter(product => 
      product.price <= parseFloat(filters.maxPrice)
    );
  }
  
  if (filters.featured !== undefined) {
    const featured = filters.featured === 'true';
    filteredProducts = filteredProducts.filter(product => 
      product.featured === featured
    );
  }
  
  if (filters.inStock !== undefined) {
    const inStock = filters.inStock === 'true';
    filteredProducts = filteredProducts.filter(product => 
      product.inStock === inStock
    );
  }
  
  return filteredProducts;
};

const getProductById = (id) => {
  return products.find(product => product.id === id);
};

const createProduct = (productData) => {
  const newProduct = {
    id: uuidv4(),
    ...productData,
    price: parseFloat(productData.price),
    featured: productData.featured === 'true',
    inStock: productData.inStock === 'true' || productData.inStock === undefined,
    createdAt: new Date().toISOString()
  };
  
  products.push(newProduct);
  return newProduct;
};

const updateProduct = (id, productData) => {
  const index = products.findIndex(product => product.id === id);
  
  if (index === -1) return null;
  
  const updatedProduct = {
    ...products[index],
    ...productData,
    id: products[index].id, // Ensure ID doesn't change
    updatedAt: new Date().toISOString()
  };
  
  // Convert numeric and boolean fields
  if (productData.price !== undefined) {
    updatedProduct.price = parseFloat(productData.price);
  }
  
  if (productData.featured !== undefined) {
    updatedProduct.featured = productData.featured === 'true';
  }
  
  if (productData.inStock !== undefined) {
    updatedProduct.inStock = productData.inStock === 'true';
  }
  
  products[index] = updatedProduct;
  return updatedProduct;
};


  const deleteProduct = (id) => {
    const index = products.findIndex(product => product.id === id);
    
    if (index === -1) return false;
    
    products.splice(index, 1);
    return true;
  };
  
  module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
  };
