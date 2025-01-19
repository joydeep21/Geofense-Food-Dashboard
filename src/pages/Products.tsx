import React, { useState } from 'react';
import { Plus } from 'lucide-react';
// import ProductCard from '../components/products/ProductCard';
// import ProductFilters from '../components/products/ProductFilters';
import { Product, ProductFilters as FilterType } from '../types/product';

const Products = () => {
  const [filters, setFilters] = useState<FilterType>({
    search: '',
    category: 'all',
    status: 'all',
    sortBy: 'name-asc',
  });

  // Mock products data
  const products: Product[] = [
    {
      id: '1',
      name: 'Margherita Pizza',
      description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
      price: 12.99,
      category: 'pizza',
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      status: 'active',
      stock: 100,
      createdAt: '2024-02-20',
    },
    {
      id: '2',
      name: 'Classic Burger',
      description: 'Juicy beef patty with lettuce, tomato, and special sauce',
      price: 9.99,
      category: 'burger',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      status: 'active',
      stock: 50,
      createdAt: '2024-02-19',
    },
    {
      id: '3',
      name: 'California Roll',
      description: 'Fresh sushi roll with crab, avocado, and cucumber',
      price: 14.99,
      category: 'sushi',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      status: 'inactive',
      stock: 30,
      createdAt: '2024-02-18',
    },
  ];

  const handleEdit = (product: Product) => {
    console.log('Edit product:', product);
  };

  const handleDelete = (id: string) => {
    console.log('Delete product:', id);
  };

  const filteredProducts = products.filter(product => {
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }
    if (filters.status !== 'all' && product.status !== filters.status) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* <ProductFilters
        filters={filters}
        onFilterChange={setFilters}
      /> */}

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div> */}

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found matching your filters.</p>
        </div>
      )}
    </div>
  );
};

export default Products;